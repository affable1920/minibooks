from fastapi import FastAPI, Request, status
from contextlib import asynccontextmanager
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


from app.routes import organizations
from app.db.base import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan context manager for FastAPI application.
    Used to setup and teardown resources like database connections.
    """

    print("Starting up ...")
    Base.metadata.create_all(bind=engine)

    yield

    print("Shutting down ...")


app = FastAPI(lifespan=lifespan, title="MiniBooks", openapi_url="/openapi.json")


app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=["*"],
    allow_credentials=True,
    expose_headers=["x-auth-token", "x-session-expire"],
)


@app.get("/")
async def root():
    return {"msg": "Welcome to MiniBooks API"}


@app.get("/health")
def health():
    return {"status": "OK"}


@app.exception_handler(RequestValidationError)
async def validation_err_handler(req: Request, e: RequestValidationError):
    body = await req.body()

    print(f"Request Body: {body.decode()}")
    print(f"Errors: {e.errors()}")

    print(f"route: {req.url}")

    return JSONResponse(
        content={
            "detail": e.errors(),
            "msg": "invalid data",
            "type": "request validation error",
        },
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
    )


app.include_router(organizations.router)


if __name__ == "__main__":
    import uvicorn

    """
    The below uvicorn cmd runs our server instance
    Change host, port in production and set reload to False
    """

    uvicorn.run(app="server.app.main:app", host="localhost", port=8000, reload=True)
