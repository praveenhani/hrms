def employee_helper(employee):
    return {
        "employee_id": employee.get("employee_id") or str(employee.get("_id")),
        "full_name": employee["full_name"],
        "email": employee["email"],
        "department": employee["department"]
    }


