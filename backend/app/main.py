from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import employee, attendance

app = FastAPI(title="HRMS Lite Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",                
        "https://hrms-jade-ten.vercel.app",       
    ],
    allow_credentials=False,   
    allow_methods=["*"],       
    allow_headers=["*"],       
)

app.include_router(employee.router, prefix="/employees", tags=["Employees"])
app.include_router(attendance.router, prefix="/attendance", tags=["Attendance"])

@app.get("/")
def root():
    return {"message": "HRMS Lite API is running"}
