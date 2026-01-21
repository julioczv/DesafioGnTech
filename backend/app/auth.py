import os
from fastapi import Header, HTTPException

def require_api_key(x_api_key: str = Header(default="")):
    if not x_api_key or x_api_key != os.getenv("POKEAPI_API_KEY"):
        raise HTTPException(status_code=401, detail="Unauthorized")
