# backend/services/analyzer.py

import os
import numpy as np

from fingerprint.extractor import extract_video_fingerprint
from fingerprint.quantum_mapper import quantum_feature_map
from fingerprint.similarity import check_similarity
from database.mongo import insert_full_analysis_result, fetch_all_records


def analyze_video(video_path: str, mode: str) -> dict:
    video_name = os.path.basename(video_path)

    # -------------------------------
    # Step 1: Classical fingerprint
    # -------------------------------
    classical_fp = extract_video_fingerprint(video_path)
    classical_fp = classical_fp / np.linalg.norm(classical_fp)

    # -------------------------------
    # Step 2: Quantum-inspired mapping
    # -------------------------------
    quantum_fp = quantum_feature_map(classical_fp, alpha=0.7)
    quantum_fp = quantum_fp / np.linalg.norm(quantum_fp)

    # -------------------------------
    # Step 3: Load mode-specific DBs
    # -------------------------------
    classical_db = fetch_all_records("classical")
    quantum_db = fetch_all_records("quantum")

    # -------------------------------
    # Step 4: Similarity checks
    # -------------------------------
    c_dup, c_score, c_match = check_similarity(classical_fp, classical_db)
    q_dup, q_score, q_match = check_similarity(quantum_fp, quantum_db)

    # -------------------------------
    # Step 5: Store BOTH results
    # -------------------------------
    insert_full_analysis_result(
        video_name=video_name,

        classical_fp=classical_fp.tolist(),
        classical_status="Similar" if c_dup else "Unique",
        classical_score=float(c_score) if c_score is not None else None,
        classical_matched=c_match,

        quantum_fp=quantum_fp.tolist(),
        quantum_status="Similar" if q_dup else "Unique",
        quantum_score=float(q_score) if q_score is not None else None,
        quantum_matched=q_match
    )

    # -------------------------------
    # Step 6: Return requested mode
    # -------------------------------
    if mode == "classical":
        return {
            "status": "Duplicate" if c_dup else "Unique",
            "score": float(c_score) if c_score is not None else None,
            "matched": c_match,
            "mode": "classical"
        }

    return {
        "status": "Duplicate" if q_dup else "Unique",
        "score": float(q_score) if q_score is not None else None,
        "matched": q_match,
        "mode": "quantum"
    }
