from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

# Allow the frontend (Next.js default port) to make requests to the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello from FastAPI Backend!"}

@app.get("/api/status")
def get_status():
    statuses = [
        "Backend is running smoothly! 🚀",
        "Systems are nominal! 🌟",
        "All services operational! ⚡"
    ]
    return {"status": random.choice(statuses)}
