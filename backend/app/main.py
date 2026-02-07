from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.employee import router as employee_router
from app.routes.attendance import router as attendance_router

app = FastAPI(title="HRMS Lite Backend")

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "http://localhost:3000",
#         "https://hrms-jade-ten.vercel.app",
#     ],
#     allow_credentials=False,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://hrms-jade-ten.vercel.app",
    ],
    allow_methods=["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allow_headers=["*"],
    allow_credentials=False,
)


app.include_router(employee_router, prefix="/employees")
app.include_router(attendance_router, prefix="/attendance")

@app.get("/")
def root():
    return {"message": "HRMS Lite API is running"}
