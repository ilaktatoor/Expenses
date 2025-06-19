# 🧾 Expense Tracker Backend

A Spring Boot REST API to manage shared weekly expenses between two users. Supports expense tracking, weekly summaries, and automatic balance calculation (who owes whom).

## 🚀 Features

- Add, list, and delete expenses
- Associate expenses with users
- Calculate total weekly expenses
- Determine balance between two users for 50/50 split
- Weekly summary endpoint
- Swagger UI documentation

---

## ⚙️ Technologies

- Java 17+
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL
- Lombok
- Springdoc OpenAPI (Swagger)
- Docker

---

## 📦 API Endpoints

| Method | Endpoint               | Description                       |
|--------|------------------------|-----------------------------------|
| GET    | `/api/expenses`        | List all expenses                 |
| POST   | `/api/expenses`        | Add a new expense                 |
| DELETE | `/api/expenses/{id}`   | Delete an expense by ID          |
| GET    | `/api/expenses/week`   | Get expenses for current week     |
| GET    | `/api/expenses/week/summary` | Get weekly summary + balance  |
| GET    | `/api/users`           | List all users                    |
| POST   | `/api/users`           | Create a new user                 |

---

## 📘 Weekly Summary Endpoint

**GET** `/api/expenses/week/summary`

```json
{
  "totalWeekAmount": 550.0,
  "user1Total": 400.0,
  "user2Total": 150.0,
  "balance": 125.0,
  "even": false
}


docker build -t expense-tracker-backend .

docker run --name expense-api \
  --network expense-net \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://expense-db:5432/expenses \
  -e SPRING_DATASOURCE_USERNAME=postgres \
  -e SPRING_DATASOURCE_PASSWORD=postgres \
  -p 8080:8080 \
  expense-tracker-backend

