from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    history = relationship("SearchHistory", back_populates="owner")

class SearchHistory(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    carbon_value = Column(Float)
    # New column to store input details (JSON string)
    details = Column(String) 
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="history")