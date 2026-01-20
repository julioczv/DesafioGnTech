import requests
from sqlalchemy.orm import Session
from .models import Pokemon

POKE_API = "https://pokeapi.co/api/v2/pokemon"

def upsert_pokemon(db: Session, data: dict):
    pid = data["id"]

    types = [t["type"]["name"] for t in data["types"]]
    abilities = [a["ability"]["name"] for a in data["abilities"]]

    existing = db.query(Pokemon).filter(Pokemon.pokemon_id == pid).first()

    if existing:
        existing.name = data["name"]
        existing.types = types
        existing.abilities = abilities
        return existing

    pokemon = Pokemon(
        pokemon_id=pid,
        name=data["name"],
        types=types,
        abilities=abilities,
    )

    db.add(pokemon)
    return pokemon


def sync_pokemons(db: Session, limit: int, offset: int):
    page = requests.get(
        f"{POKE_API}?limit={limit}&offset={offset}"
    ).json()

    results = page.get("results", [])
    saved = 0

    for item in results:
        detail = requests.get(item["url"]).json()
        upsert_pokemon(db, detail)
        saved += 1

    db.commit()
    return saved
