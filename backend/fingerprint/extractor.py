import cv2
import torch
import numpy as np
from torchvision import models, transforms

_model = models.resnet18(pretrained=True)
_model = torch.nn.Sequential(*list(_model.children())[:-1])
_model.eval()

_preprocess = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

def extract_video_fingerprint(video_path: str, frame_interval: int = 30) -> np.ndarray:
    cap = cv2.VideoCapture(video_path)
    features = []
    frame_count = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if frame_count % frame_interval == 0:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = _preprocess(frame).unsqueeze(0)

            with torch.no_grad():
                embedding = _model(frame)
                features.append(embedding.squeeze().numpy())

        frame_count += 1

    cap.release()

    if not features:
        raise ValueError("No frames extracted")

    fingerprint = np.mean(features, axis=0)
    fingerprint = fingerprint / np.linalg.norm(fingerprint)
    return fingerprint
