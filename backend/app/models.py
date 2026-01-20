from sqlalchemy import Integer, String, DateTime
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func
from .db import Base

class Pokemon(Base):
    __tablename__ = "pokemon"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False, index=True)

    types: Mapped[list[str]] = mapped_column(ARRAY(String), nullable=False)
    abilities: Mapped[list[str]] = mapped_column(ARRAY(String), nullable=False)

    image: Mapped[str | None] = mapped_column(String, nullable=True)

    updated_at: Mapped["DateTime"] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
