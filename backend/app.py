from flask import Flask, request, jsonify
import os
from fingerprint import process_video
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -------------------------------
# API ENDPOINT FOR REACT
# -------------------------------
@app.route("/analyze", methods=["POST"])
def analyze_video():
    if "video" not in request.files:
        return jsonify({"error": "No video uploaded"}), 400

    file = request.files["video"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    video_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(video_path)

    # 🔹 process_video returns a DICTIONARY
    result = process_video(video_path)

    status = result.get("status")
    score = result.get("score")
    matched = result.get("matched")

    return jsonify({
        "status": status,
        "score": float(score) if score is not None else None,
        "matched": matched
    })

# -------------------------------
# OPTIONAL: Simple health check
# -------------------------------
@app.route("/", methods=["GET"])
def health():
    return "Backend is running"

if __name__ == "__main__":
    app.run(debug=True)
