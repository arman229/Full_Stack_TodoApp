 
from starlette.config import Config    
 
from starlette.datastructures import Secret

try:
    config = Config(".env")
 
    DATABASE_URL = config("DATABASE_URL", cast=Secret)
except FileNotFoundError:
    print("Error: The .env file was not found.")
except Exception as e:
    print("Error:", e)
 