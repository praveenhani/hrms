from app.database import employee_collection


def attendance_helper(attendance):
    # attempt to include employee full name for convenience
    emp = employee_collection.find_one({"employee_id": attendance.get("employee_id")})
    employee_name = emp.get("full_name") if emp else None

    return {
        "id": str(attendance.get("_id")),
        "employee_id": attendance["employee_id"],
        "employee_name": employee_name,
        "date": attendance["date"].isoformat() if hasattr(attendance["date"], 'isoformat') else str(attendance["date"]),
        "status": attendance["status"]
    }

