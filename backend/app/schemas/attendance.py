from pydantic import BaseModel, field_validator
from datetime import date
from enum import Enum

class StatusEnum(str, Enum):
    PRESENT = "Present"
    ABSENT = "Absent"

class AttendanceCreate(BaseModel):
    employee_id: str
    date: date
    status: StatusEnum

    @field_validator('status')
    @classmethod
    def validate_status(cls, v):
        if v not in [StatusEnum.PRESENT, StatusEnum.ABSENT]:
            raise ValueError("Status must be 'Present' or 'Absent'")
        return v

