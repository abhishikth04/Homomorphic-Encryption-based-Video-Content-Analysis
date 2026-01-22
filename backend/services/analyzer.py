import os

from fingerprint.extractor import extract_video_fingerprint
from fingerprint.similarity import check_similarity
from database.mongo import insert_analysis_result, fetch_all_records

# -----------------------------------
# Main Analysis Pipeline
# -----------------------------------

def analyze_video(video_path: str) -> dict:
    video_name = os.path.basename(video_path)

    # Step 1: Extract fingerprint
    fingerprint = extract_video_fingerprint(video_path)

    # Step 2: Load existing cloud fingerprints
    database = fetch_all_records()

    # Step 3: Similarity check
    is_duplicate, score, matched = check_similarity(
        fingerprint,
        database
    )

    if is_duplicate:
        insert_analysis_result(
            video_name=video_name,
            fingerprint=fingerprint.tolist(),
            status="Similar",
            similarity_score=float(score),
            matched_video=matched
        )

        return {
            "status": "Duplicate",
            "matched": matched,
            "score": float(score)
        }


    # Step 4: Unique video
    insert_analysis_result(
        video_name=video_name,
        fingerprint=fingerprint.tolist(),
        status="Unique",
        similarity_score=None,
        matched_video=None
    )

    return {
        "status": "Unique",
        "score": None
    }
