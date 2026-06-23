from fastapi.security import HTTPBearer

# This tells Swagger "this API uses Bearer token"
oauth2_scheme = HTTPBearer()