from sqlalchemy import Column, Integer, String, DateTime, ARRAY
from sqlalchemy.sql import func
from .db import Base

class Pokemon(Base):
    __tablename__ = "pokemons"

    id = Column(Integer, primary_key=True, index=True)
    pokemon_id = Column(Integer, index=True)
    name = Column(String, index=True)
    types = Column(ARRAY(String))
    abilities = Column(ARRAY(String))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
