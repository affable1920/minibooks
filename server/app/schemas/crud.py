from datetime import datetime
from typing import Annotated
from uuid import UUID
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class OrganizationCreateModel(BaseModel):
    business_name: str = Field(alias="businessName")

    email: EmailStr
    password: str

    industry: str | None = None
    contact: str | None = Field(default=None, max_length=10)


class OrganizationModel(OrganizationCreateModel):
    """
    this is the response model for an organization
    since, this will always be created using the database model,

    we use populate_by_name=True,
    as both the db and pydantic schemad model (for response) use the same naming convention
    """

    id: UUID
    created_at: Annotated[datetime, Field(default_factory=datetime.now)]
    model_config = ConfigDict(
        from_attributes=True, extra="allow", str_to_lower=True, populate_by_name=True
    )


class OrganizationAuth(BaseModel):
    email: EmailStr
    password: str
