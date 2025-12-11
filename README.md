# Training / Lab Booking System - Backend

## Overview

This is the backend for a **Training / Lab Booking System** full-stack assignment.  
It allows users to:

- View available trainings
- Book trainings
- View their bookings
- (Optional) Cancel bookings  

The backend uses **Node.js + Express** with **in-memory storage** (arrays) instead of a database.  

> Note: Users are dynamically created via `POST /users` to enable functional frontend integration, even though the assignment only explicitly mentions `/users/{userId}/bookings`.

---

## Tech Stack

- Node.js  
- Express.js  
- In-memory storage for `users`, `trainings`, and `bookings`  
- CORS enabled for frontend integration  

---

## Project Structure

training-booking-backend/
│
├── src/
│ ├── app.js
│ ├── routes/
│ │ ├── trainingRoutes.js
│ │ ├── bookingRoutes.js
│ │ └── userRoutes.js
│ ├── controllers/
│ │ ├── trainingController.js
│ │ ├── bookingController.js
│ │ └── userController.js
│ └── data/
│ ├── trainings.js
│ ├── bookings.js
│ └── users.js
└── package.json

---

## API Endpoints

### 1. Trainings

| Method | Endpoint        | Description                  | Request Body | Response |
|--------|----------------|------------------------------|--------------|---------|
| GET    | `/trainings`    | Get all trainings with available seats | N/A | Array of trainings |

---

### 2. Users *(Optional Enhancement)*

| Method | Endpoint  | Description | Request Body | Response |
|--------|-----------|-------------|--------------|---------|
| POST   | `/users`  | Create a new user dynamically | `{ "name": "Alice" }` | `{ message, user }` |

> Added to enable dynamic testing and frontend integration.  

---

### 3. Bookings

| Method | Endpoint                        | Description | Request Body | Response |
|--------|--------------------------------|-------------|--------------|---------|
| POST   | `/bookings/:trainingId/book`    | Book a training for a user | `{ "userId": 1 }` | `{ message, booking, remainingSeats }` |
| GET    | `/bookings/user/:userId`        | Get all bookings for a user | N/A | `{ user, bookings: [...] }` |
| POST   | `/bookings/:trainingId/cancel`  | Cancel a booking | `{ "userId": 1 }` | `{ message, training, user, remainingSeats }` |

**Business Rules:**

- Cannot book if training is full  
- Cannot book same training twice  
- Canceling frees up the seat  

---

## Setup Instructions

1. Clone the repository:

git clone https://github.com/isandip/training-booking-backend.git

cd training-booking-backend

2. Install dependencies:

npm install
Run the server:

npm start

Server runs at:
http://localhost:5000

Test endpoints using Postman or frontend integration.

---
