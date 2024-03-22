# Config is used to manage configuration settings for our application.
from starlette.config import Config    
# Secret is a type of data structure provided by Starlette for handling 
# sensitive information, like passwords or API keys or database_url.
from starlette.datastructures import Secret

try:
    config = Config(".env")
    #  The cast=Secret parameter indicates that the value should be treated
    # as sensitive information and converted to a Secret object.
    DATABASE_URL = config("DATABASE_URL", cast=Secret)
except FileNotFoundError:
    print("Error: The .env file was not found.")
except Exception as e:
    print("Error:", e)
 