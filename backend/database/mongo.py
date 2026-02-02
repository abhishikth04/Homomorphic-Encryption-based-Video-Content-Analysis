from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

# -----------------------------------
# MongoDB Connection
# -----------------------------------

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "video_fingerprint_db"
COLLECTION_NAME = "fingerprints"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]

# -----------------------------------
# Insert FULL Analysis Result
# -----------------------------------

def insert_full_analysis_result(
    video_name: str,

    classical_fp: list,
    classical_status: str,
    classical_score: float | None,
    classical_matched: str | None,

    quantum_fp: list,
    quantum_status: str,
    quantum_score: float | None,
    quantum_matched: str | None
):
    document = {
        "video_name": video_name,

        "classical": {
            "fingerprint": classical_fp,
            "status": classical_status,
            "similarity_score": classical_score,
            "matched_video": classical_matched
        },

        "quantum": {
            "fingerprint": quantum_fp,
            "status": quantum_status,
            "similarity_score": quantum_score,
            "matched_video": quantum_matched
        },

        "created_at": datetime.utcnow()
    }

    collection.insert_one(document)

# -----------------------------------
# Fetch Records (MODE-SPECIFIC)
# -----------------------------------

def fetch_all_records(mode: str):
    """
    mode: 'classical' or 'quantum'
    """
    records = list(collection.find({}, {"_id": 0}))
    extracted = []

    for r in records:
        if mode in r:
            extracted.append({
                "video_name": r["video_name"],
                **r[mode]
            })

    return extracted

# -----------------------------------
# DASHBOARD SUMMARY
# -----------------------------------

def get_dashboard_summary(mode: str):
    records = list(collection.find({}))

    total = len(records)
    unique = 0
    duplicate = 0

    for r in records:
        if mode in r:
            status = r[mode]["status"]
            if status == "Unique":
                unique += 1
            elif status == "Similar":
                duplicate += 1

    return {
        "totalVideos": total,
        "uniqueVideos": unique,
        "duplicateVideos": duplicate
    }

# -----------------------------------
# DASHBOARD RECENT ANALYSIS
# -----------------------------------

def get_recent_analysis(mode: str, limit=10):
    records = collection.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)

    formatted = []
    for idx, r in enumerate(records, start=1):
        if mode in r:
            formatted.append({
                "id": idx,
                "name": r["video_name"],
                "status": r[mode]["status"],
                "score": r[mode]["similarity_score"],
                "date": r["created_at"].strftime("%Y-%m-%d")
            })

    return formatted
