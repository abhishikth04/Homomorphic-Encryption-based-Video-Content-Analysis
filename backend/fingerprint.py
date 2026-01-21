import cv2
import torch
import numpy as np
import tenseal as ts
import pickle
import os
from torchvision import models, transforms

# ---------------------------
# Load pretrained CNN model
# ---------------------------
model = models.resnet18(pretrained=True)
model = torch.nn.Sequential(*list(model.children())[:-1])
model.eval()

# ---------------------------
# Image preprocessing
# ---------------------------
preprocess = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ---------------------------
# Video fingerprint function
# ---------------------------
def extract_video_fingerprint(video_path, frame_interval=30):
    cap = cv2.VideoCapture(video_path)
    features = []
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % frame_interval == 0:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = preprocess(frame).unsqueeze(0)

            with torch.no_grad():
                feature = model(frame)
                feature = feature.squeeze().numpy()
                features.append(feature)

        frame_count += 1

    cap.release()

    # Aggregate features (mean pooling)
    fingerprint = np.mean(features, axis=0)
    return fingerprint


def cosine_similarity(vec1, vec2):
    vec1 = vec1 / np.linalg.norm(vec1)
    vec2 = vec2 / np.linalg.norm(vec2)
    return np.dot(vec1, vec2)

def create_context():
    context = ts.context(
        ts.SCHEME_TYPE.CKKS,
        poly_modulus_degree=8192,
        coeff_mod_bit_sizes=[60, 40, 40, 60]
    )
    context.global_scale = 2**40
    context.generate_galois_keys()
    return context

def encrypt_vector(context, vector):
    return ts.ckks_vector(context, vector.tolist())

def encrypted_dot(enc_vec1, enc_vec2):
    return enc_vec1.dot(enc_vec2)

def normalize(vec):
    return vec / np.linalg.norm(vec)

DB_FILE = "encrypted_db.pkl"

def load_database():
    if os.path.exists(DB_FILE):
        with open(DB_FILE, "rb") as f:
            return pickle.load(f)
    return []

def save_database(db):
    with open(DB_FILE, "wb") as f:
        pickle.dump(db, f)

def check_similarity(context, enc_fp, db, threshold=0.9):
    for entry in db:
        stored_fp = np.array(entry["fingerprint"])
        enc_stored_fp = encrypt_vector(context, stored_fp)

        enc_sim = enc_fp.dot(enc_stored_fp)
        sim_score = enc_sim.decrypt()[0]

        if sim_score >= threshold:
            return True, sim_score, entry["video_name"]

    return False, None, None

def process_video(video_path):
    context = create_context()
    db = load_database()

    video_name = os.path.basename(video_path)

    fp = normalize(extract_video_fingerprint(video_path))
    enc_fp = encrypt_vector(context, fp)

    is_duplicate, score, matched = check_similarity(context, enc_fp, db)

    if is_duplicate:
        return {
            "status": "Similar",
            "matched": matched,
            "score": score
        }
    else:
        db.append({
            "video_name": video_name,
            "fingerprint": fp.tolist()
        })
        save_database(db)

        return {
            "status": "Unique",
            "score": None
        }




# ---------------------------
# Run test
# ---------------------------
if __name__ == "__main__":
    context = create_context()
    db = load_database()

    video_path = "test_video.mp4"   # change this to test uploads
    video_name = os.path.basename(video_path)

    # Step 1: Fingerprint
    fp = normalize(extract_video_fingerprint(video_path))

    # Step 2: Encrypt fingerprint
    enc_fp = encrypt_vector(context, fp)

    # Step 3: Check against DB
    is_duplicate, score, matched_video = check_similarity(context, enc_fp, db)

    if is_duplicate:
        print("⚠️ Similar / Duplicate video detected!")
        print("Matched with:", matched_video)
        print("Similarity score:", score)
    else:
        print("✅ Unique video. Storing encrypted fingerprint.")
        db.append({
            "video_name": video_name,
            "fingerprint": fp.tolist()
        })
        save_database(db)
