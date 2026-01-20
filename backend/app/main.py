from fastapi import FastAPI, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import select
from .db import Base, engine, get_db
from .models import Pokemon
from .schemas import PokemonOut
from .services import fetch_pokemon
from .auth import require_api_key

app = FastAPI(title="PokeAPI Cache", version="1.0.0")

Base.metadata.create_all(bind=engine)

@app.post("/sync/{name_or_id}", response_model=PokemonOut, dependencies=[Depends(require_api_key)])
def sync_pokemon(name_or_id: str, db: Session = Depends(get_db)):
    data = fetch_pokemon(name_or_id)

    obj = db.get(Pokemon, data["id"])
    if obj:
        obj.name = data["name"]
        obj.types = data["types"]
        obj.abilities = data["abilities"]
        obj.image = data["image"]
    else:
        obj = Pokemon(**data)
        db.add(obj)

    db.commit()
    db.refresh(obj)
    return obj

@app.get("/pokemon", response_model=list[PokemonOut], dependencies=[Depends(require_api_key)])
def list_pokemon(
    db: Session = Depends(get_db),
    type: str | None = Query(default=None),
    search: str | None = Query(default=None),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
):
    stmt = select(Pokemon)

    if search:
        stmt = stmt.where(Pokemon.name.ilike(f"%{search.lower()}%"))

    if type:
        stmt = stmt.where(Pokemon.types.contains([type.lower()]))

    stmt = stmt.order_by(Pokemon.id.asc()).limit(limit).offset(offset)
    return list(db.scalars(stmt).all())

@app.get("/pokemon/{id}", response_model=PokemonOut, dependencies=[Depends(require_api_key)])
def get_pokemon(id: int, db: Session = Depends(get_db)):
    obj = db.get(Pokemon, id)
    return obj
