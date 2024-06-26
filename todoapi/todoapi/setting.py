 
from starlette.config import Config    
from starlette.datastructures import Secret

try:
    config = Config(".env")
except FileNotFoundError:
    print("Error: The .env file was not found.")
except Exception as e:
    print("Error:", e)
DATABASE_URL = config("DATABASE_URL", cast=Secret)
TEST_DATABASE_URL = config("TEST_DATABASE_URL", cast=Secret) 