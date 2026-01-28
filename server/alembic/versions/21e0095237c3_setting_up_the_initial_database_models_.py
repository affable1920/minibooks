"""setting up the initial database models. keeping em minimal at first.

Revision ID: 21e0095237c3
Revises:
Create Date: 2026-01-25 22:47:45.126267

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision: str = "21e0095237c3"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        "organizations",
        sa.Column(
            "id",
            UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column("email", sa.String, index=True, unique=True, nullable=False),
        sa.Column("password", sa.String, nullable=False),
        sa.Column("buiseness_name", sa.String, nullable=False, index=True),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.func.now(), nullable=False
        ),
        sa.Column("industry", sa.String, nullable=True),
        sa.Column("contact", sa.String(10), nullable=True),
    )

    op.create_table(
        "customers",
        sa.Column(
            "id",
            UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column(
            "organization_id",
            UUID(as_uuid=True),
            sa.ForeignKey("organizations.id"),
            nullable=False,
        ),
        sa.Column("name", sa.String, nullable=False, index=True),
        sa.Column("email", sa.String, nullable=False, index=True),
        sa.Column("contact", sa.String(10), nullable=True),
        sa.Column("address", sa.String, nullable=True),
        sa.Column(
            "created_at", sa.DateTime, server_default=sa.func.now(), nullable=False
        ),
        sa.Column(
            "mode_preference",
            sa.Enum("email", "sms", "whatsapp", name="communication_mode"),
            nullable=True,
        ),
        sa.Column("balance", sa.Float(2), nullable=False, server_default="0.0"),
    )

    op.create_table(
        "invoices",
        sa.Column(
            "id",
            UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("gen_random_uuid()"),
        ),
        sa.Column(
            "organization_id",
            UUID(as_uuid=True),
            sa.ForeignKey("organizations.id"),
            nullable=False,
        ),
        sa.Column(
            "customer_id",
            UUID(as_uuid=True),
            sa.ForeignKey("customers.id"),
            nullable=False,
        ),
        sa.Column("amount", sa.Float(2), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
            server_default=sa.func.now(),
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table("organizations")
    op.drop_table("customers")
    op.drop_table("invoices")
