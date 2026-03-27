from pydantic import BaseModel


class Settings(BaseModel):
    """
    Central configuration — loaded once at startup.
    All values are overridable via environment variables in production.
    """

    APP_NAME: str = "Forex Education API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # CORS — the Next.js frontend origin(s)
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]

    # Uvicorn concurrency — tuned for high-traffic
    # Workers are set at the CLI level (uvicorn --workers);
    # this controls the async event-loop capacity.
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000


settings = Settings()
