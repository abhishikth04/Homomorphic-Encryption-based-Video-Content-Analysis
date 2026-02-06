from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os

from services.analyzer import analyze_video
from database.mongo import (
    get_dashboard_summary,
    get_recent_analysis
)

app = Flask(__name__)
CORS(app)

# -----------------------------------
# Configuration
# -----------------------------------

UPLOAD_FOLDER = "temp_uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# -----------------------------------
# Health Check
# -----------------------------------

@app.route("/", methods=["GET"])
def health_check():
    return {
        "status": "Backend running",
        "service": "Homomorphic Video Fingerprint Analysis API"
    }

# -----------------------------------
# Video Analysis Endpoint
# -----------------------------------

@app.route("/analyze", methods=["POST"])
def analyze():
    if "video" not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    file = request.files["video"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    # 🔹 Mode sent from frontend (classical / quantum)
    mode = request.form.get("mode", "quantum")

    filename = secure_filename(file.filename)
    video_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(video_path)

    try:
        result = analyze_video(video_path, mode)
    except Exception as e:
        print("❌ Backend Error:", e)
        return jsonify({"error": str(e)}), 500
    finally:
        if os.path.exists(video_path):
            os.remove(video_path)

    return jsonify(result), 200

# -----------------------------------
# DASHBOARD: Summary Cards
# -----------------------------------

@app.route("/dashboard/summary")
def dashboard_summary():
    mode = request.args.get("mode", "quantum")
    return jsonify(get_dashboard_summary(mode))

@app.route("/dashboard/recent")
def dashboard_recent():
    mode = request.args.get("mode", "quantum")
    return jsonify(get_recent_analysis(mode))
    
# -----------------------------------
# Entry Point
# -----------------------------------

if __name__ == "__main__":
    app.run(debug=True)
