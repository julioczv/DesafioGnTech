from pydantic import BaseModel

class PokemonOut(BaseModel):
    id: int
    name: str
    types: list[str]
    abilities: list[str]
    image: str | None = None

    class Config:
        from_attributes = True
