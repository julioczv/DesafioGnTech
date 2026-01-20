import os
from fastapi import Header, HTTPException

EXPECTED_API_KEY = os.getenv("POKEAPI_API_KEY")

def require_api_key(
    poke_api_key: str = Header(..., alias="poke-api-key")
):
    if not EXPECTED_API_KEY:
        raise HTTPException(
            status_code=500,
            detail="API key not configured on server"
        )

    if poke_api_key != EXPECTED_API_KEY:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )
