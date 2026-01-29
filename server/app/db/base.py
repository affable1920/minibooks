import os
import sqlalchemy as sa
from dotenv import load_dotenv
from sqlalchemy.orm import DeclarativeBase, sessionmaker


load_dotenv()

"""
posgresql database url format -

postgresql - the type of db, :// self-explanatory,  postgres - the supervisor name
: - part of the format after which the pwd should be typed
after the pwd, use @ sign followed by the hostname (eg localhost) and port_name (eg 5432)

"Note"
If a password contains a special char like @, you must encode it 
or otherwise the url would break

@ - after encoding is mapped to %40
"""


class Base(DeclarativeBase):
    """
    Base class for all ORM models.
    sets up all the underhood orm configurations and mechanisms.
    """

    pass


# keep the db url in a env file later
url = os.getenv("DATABASE_URL", "")

if not url:
    raise Exception("please set you db url env variable...")

engine = sa.create_engine(url=url)


def get_session():
    """
    Session maker is a db session maker factory which returns a session creating factory when called,
    which in turn when called returns a new session instance.
    """

    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    session = session_local()

    try:
        yield session

    finally:
        session.close()
