from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import employee, attendance

app = FastAPI(title="HRMS Lite Backend")

# CORS settings - allow frontend (Next.js) running on localhost:3000
origins = [
    "http://localhost:3000",
    "https://your-frontend.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee.router)
app.include_router(attendance.router)


@app.get("/")
def root():
    return {"message": "HRMS Lite API is running"}   
