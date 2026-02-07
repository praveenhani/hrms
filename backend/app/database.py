from pymongo import MongoClient
import certifi
from app.config import MONGO_URI, DATABASE_NAME

client = MongoClient(
    MONGO_URI,
    tls=True,
    tlsCAFile=certifi.where()
)

db = client[DATABASE_NAME]

employee_collection = db["employees"]
attendance_collection = db["attendance"]

try:
    employee_collection.create_index("employee_id", unique=True)
    employee_collection.create_index("email", unique=True)
except Exception:
    pass
