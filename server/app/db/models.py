import enum
import sqlalchemy as sa
from uuid import UUID, uuid4

from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base


class Mode(enum.Enum):
    sms = "sms"
    email = "email"
    whatsapp = "whatsapp"


class Organization(Base):
    __tablename__ = "organizations"

    id: Mapped[UUID] = mapped_column(
        sa.Uuid(as_uuid=True), primary_key=True, default=lambda: uuid4()
    )
    email: Mapped[str] = mapped_column(
        sa.String, unique=True, index=True, nullable=False
    )
    password: Mapped[str] = mapped_column(sa.String, nullable=False)
    contact: Mapped[str | None] = mapped_column(sa.String(10), nullable=True)

    business_name: Mapped[str] = mapped_column(sa.String, nullable=False)
    industry: Mapped[str | None] = mapped_column(sa.String, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        sa.DateTime(timezone=True), default=datetime.now, nullable=False
    )
    customers: Mapped[list["Customer"]] = relationship(
        back_populates="organization", cascade="all, delete-orphan", lazy="joined"
    )


class Customer(Base):
    __tablename__ = "customers"
    id: Mapped[UUID] = mapped_column(
        sa.Uuid(as_uuid=True), primary_key=True, default=lambda: uuid4()
    )
    organization_id: Mapped[UUID] = mapped_column(
        sa.ForeignKey("organizations.id"), nullable=False
    )

    name: Mapped[str] = mapped_column(sa.String, nullable=False, index=True)
    email: Mapped[str] = mapped_column(sa.String, nullable=False, index=True)
    contact: Mapped[str | None] = mapped_column(sa.String(10), nullable=True)
    address: Mapped[str | None] = mapped_column(sa.String, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        sa.DateTime(timezone=True), default=datetime.now, nullable=False
    )

    organization: Mapped["Organization"] = relationship(back_populates="customers")
    balance: Mapped[float] = mapped_column(sa.Float(2), nullable=False, default=0.0)
    mode_preference: Mapped[Mode] = mapped_column(default="sms", nullable=True)

    invoices: Mapped[list["Invoice"]] = relationship(
        back_populates="customer", cascade="all, delete-orphan", lazy="joined"
    )


class Invoice(Base):
    __tablename__ = "invoices"
    id: Mapped[UUID] = mapped_column(
        sa.Uuid(as_uuid=True), primary_key=True, default=lambda: uuid4()
    )
    created_at: Mapped[datetime]
    amount: Mapped[float] = mapped_column(sa.Float(2), nullable=False, index=True)

    organization_id: Mapped[UUID] = mapped_column(
        sa.ForeignKey("organizations.id"), nullable=False
    )
    customer_id: Mapped[UUID] = mapped_column(
        sa.ForeignKey("customers.id"), nullable=False
    )

    customer: Mapped["Customer"] = relationship(back_populates="invoices")
