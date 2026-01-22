import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
DB_NAME = "video_fingerprint_db"
COLLECTION_NAME = "fingerprints"

SIMILARITY_METRIC = "cosine"
