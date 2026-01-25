from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlalchemy as sa


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for FastAPI application.
    Used to setup and teardown resources like database connections.
    """

    print("Starting up ...")
    yield

    print("Shutting down ...")


app = FastAPI(lifespan=lifespan, title="MiniBooks", openapi_url="/openapi.json")


@app.get("/")
async def root():
    return {"msg": "Welcome to MiniBooks API"}


app.add_middleware(
    CORSMiddleware,
    allow_headers=["*"],
    allow_origins=["*"],
    allow_credentials=True,
    expose_headers=["x-session-expire"],
)


if __name__ == "__main__":
    import uvicorn

    """
    The below uvicorn cmd runs our server instance
    Change host, port in production and set reload to False
    """

    uvicorn.run(app="server.app.main:app", host="localhost", port=8000, reload=True)
