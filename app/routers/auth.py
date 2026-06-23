@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    print("JWT LOGIN FUNCTION ACTIVE")  # DEBUG

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # DEBUG
    print("Entered password:", user.password)
    print("Entered password length:", len(user.password))
    print("DB password:", db_user.password)
    print("DB password length:", len(db_user.password))

    if not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }