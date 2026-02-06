from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routes import employee, attendance
from fastapi.responses import JSONResponse
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

@app.options("/{path:path}")
async def preflight_handler(request: Request, path: str):
    return JSONResponse(status_code=200, content={"ok": True})


app.include_router(employee.router)
app.include_router(attendance.router)


@app.get("/")
def root():
    return {"message": "HRMS Lite API is running"}
