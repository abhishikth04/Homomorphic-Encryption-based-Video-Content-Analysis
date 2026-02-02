# backend/fingerprint/quantum_mapper.py

import numpy as np

def quantum_feature_map(vector: np.ndarray, alpha: float = 0.7) -> np.ndarray:
    """
    Quantum-inspired hybrid amplitude–phase feature mapping.

    - Retains original feature amplitudes
    - Adds nonlinear phase information via sinusoidal encoding
    - Prevents feature collapse under cosine similarity
    """

    vector = np.asarray(vector, dtype=np.float32)

    # IMPORTANT: Do NOT normalize inside this function
    # Normalization happens outside (once)

    # Phase encoding (quantum-inspired)
    phase_part = np.sin(alpha * vector)

    # Amplitude preservation (classical information)
    amplitude_part = vector

    # Hybrid embedding
    quantum_vector = np.concatenate([amplitude_part, phase_part])

    return quantum_vector
