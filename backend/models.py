from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    
    name = Column(String(100), index=True)  
    username = Column(String(50), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))

    history = relationship("SearchHistory", back_populates="owner")

class SearchHistory(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    carbon_value = Column(Float)
    
    details = Column(String(2000)) 
    
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="history")