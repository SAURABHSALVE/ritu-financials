from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check() -> dict:
    """Lightweight health-check endpoint for load balancers and uptime monitors."""
    return {"status": "ok"}
