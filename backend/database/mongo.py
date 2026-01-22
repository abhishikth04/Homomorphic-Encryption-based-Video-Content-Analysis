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
# Insert Analysis Result
# -----------------------------------

def insert_analysis_result(
    video_name: str,
    fingerprint: list,
    status: str,
    similarity_score: float | None,
    matched_video: str | None
):
    document = {
        "video_name": video_name,
        "fingerprint": fingerprint,
        "status": status,
        "similarity_score": similarity_score,
        "matched_video": matched_video,
        "created_at": datetime.utcnow()
    }
    collection.insert_one(document)

# -----------------------------------
# Fetch All Records
# -----------------------------------

def fetch_all_records():
    return list(collection.find({}, {"_id": 0}))

# -----------------------------------
# Dashboard Statistics
# -----------------------------------

def get_statistics():
    total = collection.count_documents({})
    unique_count = collection.count_documents({"status": "Unique"})
    duplicate_count = collection.count_documents({"status": "Similar"})

    avg_similarity_pipeline = [
        {"$match": {"similarity_score": {"$ne": None}}},
        {"$group": {"_id": None, "avg": {"$avg": "$similarity_score"}}}
    ]

    avg_result = list(collection.aggregate(avg_similarity_pipeline))
    avg_similarity = avg_result[0]["avg"] if avg_result else None

    return {
        "totalVideos": total,
        "uniqueVideos": unique_count,
        "duplicateVideos": duplicate_count,
        "avgSimilarity": avg_similarity
    }

# -----------------------------------
# Recent Analysis Records
# -----------------------------------

def get_recent_records(limit=10):
    records = collection.find(
        {},
        {
            "_id": 0,
            "video_name": 1,
            "status": 1,
            "similarity_score": 1,
            "created_at": 1
        }
    ).sort("created_at", -1).limit(limit)

    return list(records)

# -----------------------------------
# DASHBOARD SUMMARY (AGGREGATION)
# -----------------------------------

def get_dashboard_summary():
    records = list(collection.find({}))

    total = len(records)
    unique = 0
    duplicate = 0

    for r in records:
        if r.get("status") == "Unique":
            unique += 1
        elif r.get("status") == "Similar":
            duplicate += 1

    return {
        "totalVideos": total,
        "uniqueVideos": unique,
        "duplicateVideos": duplicate
    }



# -----------------------------------
# DASHBOARD RECENT ANALYSIS
# -----------------------------------

def get_recent_analysis(limit=10):
    records = collection.find(
        {},
        {"_id": 0}
    ).sort("created_at", -1).limit(limit)

    formatted = []
    for idx, r in enumerate(records, start=1):
        formatted.append({
            "id": idx,
            "name": r.get("video_name"),
            "status": r.get("status"),
            "score": r.get("similarity_score"),
            "date": r["created_at"].strftime("%Y-%m-%d")
        })

    return formatted
