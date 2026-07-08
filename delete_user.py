from app.database.db import SessionLocal

# IMPORTANT: force-load all models
from app.models import *

from app.models.user import User

db = SessionLocal()

email_to_delete = "test@gmail.com"

user = db.query(User).filter(User.email == email_to_delete).first()

if user:
    db.delete(user)
    db.commit()
    print("User deleted successfully")
else:
    print("User not found")

db.close()