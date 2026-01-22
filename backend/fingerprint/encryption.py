import tenseal as ts
import numpy as np

def create_context():
    context = ts.context(
        ts.SCHEME_TYPE.CKKS,
        poly_modulus_degree=8192,
        coeff_mod_bit_sizes=[60, 40, 40, 60]
    )
    context.global_scale = 2 ** 40
    context.generate_galois_keys()
    return context

def encrypt_vector(context, vector: np.ndarray):
    return ts.ckks_vector(context, vector.tolist())

def encrypted_cosine_similarity(enc_vec1, enc_vec2):
    return enc_vec1.dot(enc_vec2)
