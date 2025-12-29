from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import pickle
import pandas as pd
import numpy as np
import traceback
import json # New Import

# Database Imports
from database import engine, SessionLocal, Base
from models import User, SearchHistory

# Create Tables
Base.metadata.create_all(bind=engine)

# ---------- Security Config ----------
SECRET_KEY = "your_super_secret_key_change_this"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# ---------- Pydantic Schemas ----------
class UserCreate(BaseModel):
    name: str
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class ForgotPassword(BaseModel):
    email: str
    username: str
    new_password: str

class ChangePassword(BaseModel):
    username: str
    current_password: str
    new_password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    name: str
    username: str
    email: str

class CarbonInput(BaseModel):
    Body_Type: str
    Sex: str
    Diet: str
    How_Often_Shower: str
    Heating_Energy_Source: str
    Transport: str
    Vehicle_Type: str | None = None
    Social_Activity: str
    Monthly_Grocery_Bill: float
    Frequency_of_Traveling_by_Air: str
    Vehicle_Monthly_Distance_Km: float
    Waste_Bag_Size: str
    Waste_Bag_Weekly_Count: int
    How_Long_TV_PC_Daily_Hour: float
    How_Many_New_Clothes_Monthly: int
    How_Long_Internet_Daily_Hour: float
    Energy_efficiency: str
    Recycle_Plastic: int
    Recycle_Glass: int
    Recycle_Paper: int
    Recycle_Metal: int
    Cook_Oven: int
    Cook_Airfryer: int
    Cook_Grill: int
    Cook_Microwave: int
    Cook_Stove: int
    user_id: str | None = None

# ---------- Load model and encoders ----------
try:
    with open("carbon_model.pkl", "rb") as f:
        model = pickle.load(f)
    with open("encoder.pkl", "rb") as f:
        encoder_data = pickle.load(f)
    encoder = encoder_data["encoder"]
    categorical_cols = encoder_data["categorical_cols"]
    numerical_cols = encoder_data["numerical_cols"]
except Exception as e:
    print(f"Warning: Model files not found. Prediction will fail. Error: {e}")
    model = None

# ---------- Dependency ----------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------- Helper Functions ----------
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# ---------- FastAPI app ----------
app = FastAPI(title="Carbon Footprint Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Auth Routes ----------
@app.post("/signup", response_model=Token)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        if db.query(User).filter(User.username == user.username).first():
            raise HTTPException(status_code=400, detail="Username already taken")
        if db.query(User).filter(User.email == user.email).first():
            raise HTTPException(status_code=400, detail="Email already registered")
        
        hashed_password = get_password_hash(user.password)
        new_user = User(username=user.username, email=user.email, name=user.name, hashed_password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        access_token = create_access_token(data={"sub": new_user.username})
        return {"access_token": access_token, "token_type": "bearer", "name": new_user.name, "username": new_user.username, "email": new_user.email}
    except Exception as e:
        print("Error during signup:", str(e))
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Signup failed: {str(e)}")

@app.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    try:
        db_user = db.query(User).filter(User.email == user.email).first()
        if not db_user or not verify_password(user.password, db_user.hashed_password):
            raise HTTPException(status_code=401, detail="Incorrect email or password")
        
        access_token = create_access_token(data={"sub": db_user.username})
        return {"access_token": access_token, "token_type": "bearer", "name": db_user.name, "username": db_user.username, "email": db_user.email}
    except Exception as e:
        print("Error during login:", str(e))
        raise HTTPException(status_code=500, detail="Login failed")

@app.post("/forgot-password")
def forgot_password(data: ForgotPassword, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email, User.username == data.username).first()
    if not user:
        raise HTTPException(status_code=404, detail="No account found with this Email and Username")
    
    user.hashed_password = get_password_hash(data.new_password)
    db.commit()
    return {"message": "Password updated successfully"}

@app.post("/change-password")
def change_password(data: ChangePassword, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == data.username).first()
    if not user:
         raise HTTPException(status_code=404, detail="User not found")
    
    if not verify_password(data.current_password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect current password")
    
    user.hashed_password = get_password_hash(data.new_password)
    db.commit()
    return {"message": "Password changed successfully"}

@app.get("/history/{username}")
def get_history(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return []
    
    history = db.query(SearchHistory).filter(SearchHistory.user_id == user.id).order_by(SearchHistory.timestamp.desc()).all()
    return history

@app.delete("/history/clear/{username}")
def clear_history(username: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Delete all history for this user
    db.query(SearchHistory).filter(SearchHistory.user_id == user.id).delete()
    db.commit()
    return {"message": "History cleared successfully"}

@app.post("/predict")
def predict_footprint(data: CarbonInput, db: Session = Depends(get_db)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model files not loaded")

    # Convert input to DataFrame
    input_data_dict = {
        "Body Type": data.Body_Type,
        "Sex": data.Sex,
        "Diet": data.Diet,
        "How Often Shower": data.How_Often_Shower,
        "Heating Energy Source": data.Heating_Energy_Source,
        "Transport": data.Transport,
        "Vehicle Type": data.Vehicle_Type,
        "Social Activity": data.Social_Activity,
        "Monthly Grocery Bill": data.Monthly_Grocery_Bill,
        "Frequency of Traveling by Air": data.Frequency_of_Traveling_by_Air,
        "Vehicle Monthly Distance Km": data.Vehicle_Monthly_Distance_Km,
        "Waste Bag Size": data.Waste_Bag_Size,
        "Waste Bag Weekly Count": data.Waste_Bag_Weekly_Count,
        "How Long TV PC Daily Hour": data.How_Long_TV_PC_Daily_Hour,
        "How Many New Clothes Monthly": data.How_Many_New_Clothes_Monthly,
        "How Long Internet Daily Hour": data.How_Long_Internet_Daily_Hour,
        "Energy efficiency": data.Energy_efficiency,
        "Recycle_Plastic": data.Recycle_Plastic,
        "Recycle_Glass": data.Recycle_Glass,
        "Recycle_Paper": data.Recycle_Paper,
        "Recycle_Metal": data.Recycle_Metal,
        "Cook_Oven": data.Cook_Oven,
        "Cook_Airfryer": data.Cook_Airfryer,
        "Cook_Grill": data.Cook_Grill,
        "Cook_Microwave": data.Cook_Microwave,
        "Cook_Stove": data.Cook_Stove
    }
    input_df = pd.DataFrame([input_data_dict])

    input_df[categorical_cols] = input_df[categorical_cols].fillna("missing")
    X_cat = encoder.transform(input_df[categorical_cols])
    X_final = np.hstack([X_cat, input_df[numerical_cols].values])
    prediction = model.predict(X_final)[0]
    result_value = float(prediction)

    # Save to History with Details
    if data.user_id:
        user = db.query(User).filter(User.username == data.user_id).first()
        if user:
            # Convert all input data to JSON string to store in DB
            details_json = json.dumps(data.dict(exclude={'user_id'}))
            new_history = SearchHistory(
                carbon_value=result_value, 
                user_id=user.id,
                details=details_json # Store inputs
            )
            db.add(new_history)
            db.commit()

    return {"predicted_carbon_footprint": result_value}