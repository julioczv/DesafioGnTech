from fastapi import FastAPI, Depends, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from .db import get_db, Base, engine
from .models import Pokemon
from .security import require_api_key
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi import HTTPException

app = FastAPI(title="PokeAPI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

class PokemonIn(BaseModel):
    pokemon_id: int
    name: str
    types: List[str]
    abilities: List[str]

@app.post("/pokemons")
def upsert_pokemons(
    payload: List[PokemonIn],
    db: Session = Depends(get_db),
    _=Depends(require_api_key),
):
    saved = 0
    for p in payload:
        existing = db.query(Pokemon).filter(Pokemon.pokemon_id == p.pokemon_id).first()
        if existing:
            existing.name = p.name
            existing.types = p.types
            existing.abilities = p.abilities
        else:
            db.add(Pokemon(
                pokemon_id=p.pokemon_id,
                name=p.name,
                types=p.types,
                abilities=p.abilities,
            ))
        saved += 1

    db.commit()
    return {"saved": saved}


@app.get("/pokemons")
def list_pokemons(
    limit: int = Query(20, ge=1, le=200),
    offset: int = Query(0, ge=0),
    type: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
    _=Depends(require_api_key),
):
    q = db.query(Pokemon)

    if type:
        q = q.filter(Pokemon.types.any(type))  # ARRAY contains
    if search:
        q = q.filter(Pokemon.name.ilike(f"%{search}%"))

    return (
        q.order_by(Pokemon.pokemon_id)
        .offset(offset)
        .limit(limit)
        .all()
    )

@app.delete("/pokemons")
def delete_all_pokemons(
    db: Session = Depends(get_db),
    _=Depends(require_api_key),
):
    try:
        deleted = db.query(Pokemon).delete(synchronize_session=False)
        db.commit()
        return {"deleted": deleted}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
