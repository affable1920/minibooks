from uuid import UUID
from sqlalchemy.orm import Session
from psycopg2 import Error

from sqlalchemy.exc import SQLAlchemyError
from pydantic import EmailStr, ValidationError
from fastapi import Depends, HTTPException, status

from app.db.base import get_session
from app.schemas.crud import OrganizationModel
from app.db.models import Organization as DBOrganization


class OrganizationService:
    def __init__(self, session: Session = Depends(get_session)) -> None:
        self.session = session

    @staticmethod
    def get_modelled(org: DBOrganization) -> OrganizationModel:
        """
        using by_name is necessary in the model_validate function to match the DB model
        fields with the Pydantic model fields, the alias is just for the
        client js CamelCase compatibility
        """

        return OrganizationModel.model_validate(org, by_name=True)

    def get_all(self, limit: int = 10, offset: int = 0) -> list[OrganizationModel]:
        all_orgs = (
            self.session.query(DBOrganization)
            .limit(limit=limit)
            .offset(offset=offset)
            .all()
        )
        return [self.get_modelled(org) for org in all_orgs]

    def remove_org(self, org_id: UUID):
        org = self.session.query(DBOrganization).filter(DBOrganization.id == org_id)

        if not org.first():
            raise ValueError("no such organization exists.")

        try:
            org.delete()
            self.session.commit()

        except SQLAlchemyError as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={
                    "msg": "an internal server error occurred",
                    "type": "databse error",
                    "detail": str(e),
                },
            )

    def create_org(self, email: EmailStr, password: str, business_name: str, **kwargs):
        try:
            created_org = DBOrganization(
                email=email, password=password, business_name=business_name, **kwargs
            )

            self.session.add(created_org)
            self.session.flush()

            response = self.get_modelled(created_org)

            self.session.commit()
            self.session.refresh(created_org)

            return response

        except ValidationError as e:
            self.session.rollback()
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                detail={
                    "detail": str(e),
                    "type": "validation error",
                    "msg": "invalid data recieved",
                },
            )

        except Error as e:
            print(e)
            self.session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "detail": str(e),
                    "type": "database error",
                    "msg": "a database error occurred",
                },
            )

        except SQLAlchemyError as e:
            self.session.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "detail": str(e),
                    "type": "database error",
                    "msg": "a database error occurred",
                },
            )

        except Exception as e:
            self.session.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail={
                    "detail": str(e),
                    "type": "unexpected error",
                    "msg": "an internal server error occurred",
                },
            )
