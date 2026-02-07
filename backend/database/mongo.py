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
        "is_reference": not (classical_status == "Similar" or quantum_status == "Similar"),

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
# 🔹 FETCH REFERENCE RECORDS (FIX)
# -----------------------------------

def fetch_reference_records(mode: str):
    """
    Returns ONLY canonical reference videos.
    Prevents duplicate-of-duplicate and identity errors.
    """
    records = list(collection.find(
        {"is_reference": True},
        {"_id": 0}
    ))

    references = []
    for r in records:
        if mode in r:
            references.append({
                "video_name": r["video_name"],
                "fingerprint": r[mode]["fingerprint"]
            })

    return references


# -----------------------------------
# Fetch ALL Records (for dashboard / logs)
# -----------------------------------

def fetch_all_records(mode: str):
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
    """
    Summary computed ONLY from valid similarity events.
    """
    records = list(collection.find({}, {"_id": 0}))

    total = len(records)
    unique = 0
    duplicate = 0
    similarity_scores = []

    for r in records:
        if mode not in r:
            continue

        status = r[mode]["status"]

        if status == "Unique":
            unique += 1
        elif status == "Similar":
            duplicate += 1
            score = r[mode].get("similarity_score")
            if score is not None:
                similarity_scores.append(score)

    avg_similarity = (
        sum(similarity_scores) / len(similarity_scores)
        if similarity_scores else None
    )

    return {
        "totalVideos": total,
        "uniqueVideos": unique,
        "duplicateVideos": duplicate,
        "avgSimilarity": avg_similarity
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
                "mode": mode,
                "date": r["created_at"].strftime("%Y-%m-%d"),
            })

    return formatted
