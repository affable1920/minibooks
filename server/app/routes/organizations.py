from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import ValidationError

from app.db.base import get_session
from app.services.orgs_service import OrganizationService
from app.schemas.crud import (
    OrganizationAuth,
    OrganizationModel,
    OrganizationCreateModel,
)

from sqlalchemy.orm import Session
from app.db.models import Organization
from app.schemas.responses import ApiResponse


router = APIRouter(
    prefix="/organizations", tags=["organizations"], dependencies=[Depends(get_session)]
)


@router.get("", response_model=ApiResponse[list[OrganizationModel]])
async def get_organizations(
    service: OrganizationService = Depends(OrganizationService),
):
    """
    This route is simply for developer easiness in seeing all register orgs
    at once.
    """
    return ApiResponse(data=service.get_all())


@router.post("", response_model=ApiResponse[OrganizationModel], status_code=201)
async def register_organization(
    organization: OrganizationCreateModel,
    service: OrganizationService = Depends(OrganizationService),
):
    response = service.create_org(**organization.model_dump())
    return ApiResponse(
        data=response,
        message="Organization created successfully",
    )


@router.delete("/{org_id}")
async def delete_organization(
    org_id: UUID, service: OrganizationService = Depends(OrganizationService)
):
    try:
        service.remove_org(org_id=org_id)

    except ValueError as e:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail={"msg": str(e)})

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "msg": "an internal server error occurred",
                "type": "databse error",
                "detail": str(e),
            },
        )


@router.post("/auth")
async def login(user: OrganizationAuth, session: Session = Depends(get_session)):
    org = session.query(Organization).filter(Organization.email == user.email).first()

    try:
        print(org)

    except ValidationError as e:
        print(e)
