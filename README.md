# Flashcard Battle

A flashcard study app with competitive or head-to-head play in mind. The codebase is split into a **Django** API and a **Next.js** client.

## Stack (high level)

- **Backend:** Django 5, Django REST Framework, JWT auth (`djangorestframework-simplejwt`), PostgreSQL
- **Apps:** `users`, `flashcards`
- **Frontend (on hold):** Next.js in `frontend/` — **paused**; not the current development focus
- **Current UI:** **Django templates** as a **temporary** front end while the API and domain logic are built out

## Where we’re focused

Active work is on the **backend** and **server-rendered pages via Django templates**. The Next.js app remains in the repo for later; `docker-compose.yml` keeps the frontend service commented out for the same reason.

## Local development

- **Docker:** `docker-compose up` from the repo root (starts Postgres and the backend; see `docker-compose.yml` for ports).
- **Backend:** see `backend/` for environment variables (e.g. `.env`) and run instructions.

For Next.js-specific notes, see `frontend/README.md` when you resume that track.
