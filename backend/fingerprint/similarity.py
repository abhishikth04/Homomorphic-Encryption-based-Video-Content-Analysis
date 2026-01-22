import numpy as np

def cosine_similarity(v1, v2):
    return float(np.dot(v1, v2))

def adaptive_threshold(db_size: int) -> float:
    if db_size < 10:
        return 0.95
    elif db_size < 50:
        return 0.92
    elif db_size < 200:
        return 0.90
    else:
        return 0.88

def check_similarity(fingerprint, database):
    if not database:
        return False, None, None

    threshold = adaptive_threshold(len(database))
    best_score = 0
    best_match = None

    for entry in database:
        stored_fp = np.array(entry["fingerprint"])
        score = cosine_similarity(fingerprint, stored_fp)

        if score > best_score:
            best_score = score
            best_match = entry["video_name"]

    if best_score >= threshold:
        return True, best_score, best_match

    return False, best_score, None
