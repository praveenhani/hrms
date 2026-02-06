from fastapi import APIRouter, HTTPException
from pymongo.errors import DuplicateKeyError
from app.database import employee_collection
from app.schemas.employee import EmployeeCreate
from app.models.employee import employee_helper

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/")
def add_employee(employee: EmployeeCreate):
    # enforce uniqueness for employee_id and email
    if employee_collection.find_one({"employee_id": employee.employee_id}):
        raise HTTPException(status_code=400, detail="Employee ID already exists")
    if employee_collection.find_one({"email": employee.email}):
        raise HTTPException(status_code=400, detail="Email already exists")
    try:
        result = employee_collection.insert_one(employee.dict())
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Duplicate key error")
    return {"message": "Employee added successfully", "employee_id": employee.employee_id}


@router.get("/")
def get_employees(page: int = 1, page_size: int = 5):
    skip = (page - 1) * page_size
    employees = list(employee_collection.find().skip(skip).limit(page_size))
    total = employee_collection.count_documents({})
    total_page = (total + page_size - 1) // page_size  # Calculate total pages
    return {
        "data": [employee_helper(emp) for emp in employees],
        "total": total,
        "currentPage": page,
        "totalPage": total_page,
        "page_size": page_size,
    }


@router.get("/{employee_id}")
def get_employee(employee_id: str):
    employee = employee_collection.find_one({"employee_id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee_helper(employee)


@router.delete("/{employee_id}")
def delete_employee(employee_id: str):
    result = employee_collection.delete_one({"employee_id": employee_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    return {"message": "Employee deleted successfully"}
