from pymongo import MongoClient
from app.config import MONGO_URI, DATABASE_NAME

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

employee_collection = db["employees"]
attendance_collection = db["attendance"]
 
# Ensure unique indexes for employee_id and email
try:
	employee_collection.create_index([("employee_id", 1)], unique=True)
	employee_collection.create_index([("email", 1)], unique=True)
except Exception:
	# Index creation may fail if duplicates already exist; ignore at startup
	pass
