# 🏥 Medical Appointment Management System

This project is a full-stack web application developed using **Quarkus** for the backend and  
**React** for the frontend.

## ✨ Features

### 🩺 Doctor Dashboard

- 📅 View personal appointments
- 🔍 Filter appointments by status (upcoming, completed, etc.)
- 🔐 Securely fetch data based on logged-in doctor

### 🧑‍⚕️ Admin Dashboard

- 📊 View overall statistics: users, doctors, appointments
- 📋 See latest appointments in tabular form
- 🔁 API calls integrated using `useFetch`

## 🧰 Technologies

- **Backend**: ⚙️ Quarkus (Java)
- **Frontend**: 💻 React (TypeScript, MUI)
- **Authentication**: 🔑 Role-based access
- **Deployment**: 🚀 Production-ready

## 🗂 Project Structure

- `/backend`: Quarkus services and APIs
- `/frontend`: React app with dashboards for Admin and Doctor

## ⚠️ Routing Notice

> The homepage route is `/`, **not** `/home`.  
> Make sure your routing logic or links reflect this.

## ⚙️ Environment Setup

To run the backend, ensure you:

1. 📄 Copy `.env.example` in `/backend` to `.env`
2. 🛠️ Fill all required variables correctly (DB, ports, etc.)

## 🛠 Development

Start Quarkus backend:

```bash
./mvnw clean install quarkus:dev
```

## 📄 License

MIT