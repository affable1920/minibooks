import os

ENV = os.getenv("ENV", "dev")
DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://postgres:Ss%%402332253@localhost:5432/minibooks_db"
)
JWT_SECRET = "ZhWxLFPAHcwEQrawAXAIfzhOA7HZ3q9E4x2jTic8YVj"
