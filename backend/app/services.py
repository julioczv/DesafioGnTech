import requests

def fetch_pokemon(name_or_id: str) -> dict:
    url = f"https://pokeapi.co/api/v2/pokemon/{name_or_id}"
    r = requests.get(url, timeout=20)
    r.raise_for_status()
    p = r.json()

    image = (
        p.get("sprites", {})
         .get("other", {})
         .get("official-artwork", {})
         .get("front_default")
    )

    return {
        "id": p["id"],
        "name": p["name"],
        "types": [t["type"]["name"] for t in p["types"]],
        "abilities": [a["ability"]["name"] for a in p["abilities"]],
        "image": image,
    }
