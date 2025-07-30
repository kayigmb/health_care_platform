# Medical Appointment Management System

This project is a full-stack web application developed using **Quarkus** for the backend and
**React** for the frontend.

## Features

### Doctor Dashboard

- View personal appointments
- Filter appointments by status (upcoming, completed, etc.)
- Securely fetch data based on logged-in doctor

### Admin Dashboard

- View overall statistics: users, doctors, appointments
- See latest appointments in tabular form
- API calls integrated using `useFetch`

## Technologies

- Backend: Quarkus (Java)
- Frontend: React (TypeScript, MUI)
- Authentication: Role-based access
- Deployment-ready

## Project Structure

- `/backend`: Quarkus services and APIs
- `/frontend`: React app with dashboards for Admin and Doctor

## Development

Start Quarkus backend:

```
./mvnw clean install quarkus:dev
```

## License

MIT