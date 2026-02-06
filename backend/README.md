# HRMS Lite Backend

A lightweight HRMS backend built with **FastAPI** and **MongoDB**.

## Features
- Employee Management
- Attendance Tracking
- RESTful APIs
- Clean Architecture
- Environment-based config
- Data validation with Pydantic

## Tech Stack
- FastAPI
- MongoDB
- Pydantic
- Python

## Setup Instructions

1. **Clone the repository**
```bash
git clone <repo-url>
cd Hrms/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
Create a `.env` file in the backend directory with:
```
MONGO_URI=mongodb://localhost:27017
DATABASE_NAME=hrms_db
```

5. **Ensure MongoDB is running**
```bash
# Make sure MongoDB service is running on localhost:27017
```

6. **Run the application**
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Employees
- `POST /employees/` - Add a new employee
- `GET /employees/` - Get all employees
- `GET /employees/{employee_id}` - Get specific employee
- `DELETE /employees/{employee_id}` - Delete employee

### Attendance
- `POST /attendance/` - Mark attendance
- `GET /attendance/` - Get all attendance records
- `GET /attendance/{employee_id}` - Get attendance for specific employee

## API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
