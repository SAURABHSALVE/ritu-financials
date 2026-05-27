from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr, field_validator

router = APIRouter(tags=["contact"])


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Name cannot be empty.")
        if len(v) > 100:
            raise ValueError("Name is too long.")
        return v

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Message cannot be empty.")
        if len(v) > 2000:
            raise ValueError("Message exceeds maximum length of 2000 characters.")
        return v


@router.post("/contact")
async def submit_contact(form: ContactForm) -> dict:
    """
    Receive a contact form submission.
    In production: forward to an email service (SendGrid, Resend, etc.)
    or persist to a database. For now, acknowledges receipt.
    """
    # TODO: integrate email sending or DB persistence here
    print(f"[Contact] name={form.name!r}  email={form.email!r}  message={form.message!r}")
    return {
        "status": "received",
        "message": "Thanks for reaching out! We'll get back to you within 24 hours.",
    }
