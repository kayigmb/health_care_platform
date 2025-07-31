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

## Environment Setup

To run the backend and frontend locally, follow these steps:

1. Copy `.env.example` in `/backend` to `.env`
2. Fill in all required environment variables with your own values (database credentials, JWT issuer,
   admin username/password, etc.)
3. In the `/backend` folder, run:

    ``` bash
   docker compose up --build
   ```

This will build and start your backend and database services.

4. Copy `.env.example` in `/frontend` (if applicable) to `.env`
5. Fill in frontend environment variables if any
6. In the `/frontend` folder, run:
    ``` bash
   pnpm dev
    ```
   This will start the frontend development server.
7. Open your browser and navigate to the frontend URL (usually `http://localhost:5173` or as
   configured).

##  Admin Credentials

username: `admin`
password: `admin`

## 📄 License

MIT
