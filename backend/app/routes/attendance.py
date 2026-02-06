from fastapi import APIRouter, HTTPException
from app.database import attendance_collection, employee_collection
from app.schemas.attendance import AttendanceCreate
from app.models.attendance import attendance_helper

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/")
def mark_attendance(attendance: AttendanceCreate):
    # Validate employee exists by employee_id
    if not employee_collection.find_one({"employee_id": attendance.employee_id}):
        raise HTTPException(status_code=404, detail="Employee not found")

    # Normalize date to a timezone-naive datetime for PyMongo queries and storage
    from datetime import datetime, time
    try:
        if isinstance(attendance.date, str):
            doc_date = datetime.fromisoformat(attendance.date)
        elif isinstance(attendance.date, datetime):
            doc_date = attendance.date
        else:
            doc_date = datetime.combine(attendance.date, time())
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid date format: {e}")

    # Check if attendance already marked for the same date
    existing = attendance_collection.find_one({
        "employee_id": attendance.employee_id,
        "date": doc_date
    })
    if existing:
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")

    # Insert with normalized datetime
    try:
        doc = attendance.dict()
        doc["date"] = doc_date
        result = attendance_collection.insert_one(doc)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save attendance: {e}")

    return {"message": "Attendance marked successfully", "id": str(result.inserted_id)}


@router.get("/{employee_id}")
def get_attendance(employee_id: str, page: int = 1, page_size: int = 5):
    if not employee_collection.find_one({"employee_id": employee_id}):
        raise HTTPException(status_code=404, detail="Employee not found")
    
    skip = (page - 1) * page_size
    records = list(attendance_collection.find({"employee_id": employee_id}).skip(skip).limit(page_size))
    total = attendance_collection.count_documents({"employee_id": employee_id})
    total_page = (total + page_size - 1) // page_size  # Calculate total pages
    return {
        "data": [attendance_helper(record) for record in records],
        "total": total,
        "currentPage": page,
        "totalPage": total_page,
        "page_size": page_size,
    }


@router.get("/")
def get_all_attendance(page: int = 1, page_size: int = 5):
    skip = (page - 1) * page_size
    records = list(attendance_collection.find().skip(skip).limit(page_size))
    total = attendance_collection.count_documents({})
    total_page = (total + page_size - 1) // page_size  # Calculate total pages
    return {
        "data": [attendance_helper(record) for record in records],
        "total": total,
        "currentPage": page,
        "totalPage": total_page,
        "page_size": page_size,
    }
