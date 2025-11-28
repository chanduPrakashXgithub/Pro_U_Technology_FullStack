# Pro_U Fullstack_task

This repository contains a simple fullstack Employee & Task tracker.

- Backend: Node.js + Express + Mongoose (MongoDB)
- Frontend: React (Vite)

---

## Quick Overview

- `backend/` — Express API, Mongoose models, authentication (JWT), SSE updates.
- `frontend/` — React app with AuthContext, Dashboard, Employees management, admin-only task editing.

---

## Admin test credentials (for staging/testing only)

- Username: `admin`
- Password: `admin124`

> Important: These credentials are for my assignment valuation use only. I will Change them after few days.

---

## Prerequisites

- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB instance (local or cloud)

---

## Environment

Create a `.env` file in `backend/` with at least:

```
MONGODB_URI=mongodb://localhost:27017/your-db-name
JWT_SECRET=replace_with_a_strong_secret
PORT=5000
```

If the frontend needs environment variables, create `frontend/.env` as needed.

---

## Install & Run (development)

Backend:

```powershell
cd backend
npm install
npm run dev     # or `node server.js` for production
```

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open the frontend URL printed by Vite (typically `http://localhost:5173`) and the backend on port specified in `.env` (default `5000`).

---

## Creating the admin user

If you don't have an admin user yet you can register via the API (or use the app's Register page if available). Example with PowerShell (replace URL and creds):

```powershell
Invoke-RestMethod -Uri 'http://localhost:5000/api/auth/register' -Method Post -ContentType 'application/json' -Body (ConvertTo-Json @{ username='admin'; password='admin124'; role='admin' })
```

Or use Postman / Insomnia to POST to `/api/auth/register` with a JSON body.

---

## SSE (Live updates)

The backend exposes a server-sent events endpoint at:

```
GET /api/updates
```

This endpoint is authenticated. The frontend's AuthProvider opens an EventSource to `/api/updates?token=<JWT>` so logged-in clients receive update events (tasks/employees changes) in real time.

---

## Notes & Troubleshooting

- If dashboards are empty, ensure MongoDB is running and `MONGODB_URI` is correct.
- The system assumes `User` and `Employee` are separate models. If you'd like regular users to automatically map to an employee record (so they only see tasks assigned to them), add an `employeeId` field on `User` and update the backend filters accordingly.
- For deployment: replace the test admin credentials and set strong `JWT_SECRET` and secure `MONGODB_URI`.

---

## Live Links (add after deployment)
https://pro-u-technology-full-stack-fronten-three.vercel.app/dashboard
---

If you want, I can also:

- Add a `seed` script that creates the admin user automatically (optional).
- Add CI/CD notes or a Docker setup for easier deployment.

