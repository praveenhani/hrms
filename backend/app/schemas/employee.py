from pydantic import BaseModel, EmailStr, Field

class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., pattern=r'^EMP\d{3}$')
    full_name: str
    email: EmailStr
    department: str
