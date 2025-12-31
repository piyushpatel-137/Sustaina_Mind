# SustainaMind 🌱

**SustainaMind** is an AI-powered full-stack web application designed to help individuals calculate, track, and reduce their carbon footprint. By analyzing lifestyle, diet, energy usage, and transportation habits using Machine Learning, it provides personalized insights.

Unlike basic calculators, **SustainaMind** features a complete user system with secure authentication, allowing users to save their history, view past calculations, and monitor their progress over time.

---

## 🚀 Key Features

### 🧠 AI & Core Functionality
* **Smart Calculation:** Predicts individual CO₂ emissions using a trained **Random Forest Regressor** model.
* **Comprehensive Inputs:** Analyzes 20+ factors including diet, vehicle usage, shower frequency, and waste management.
* **Real-Time Predictions:** Instant results via FastAPI without page reloads.

### 👤 User & Data Management
* **Secure Authentication:** Full Signup and Login system using **JWT (JSON Web Tokens)**.
* **Persistent Storage:** Uses **MySQL Database** to securely store user profiles and history.
* **Profile Dashboard:** Users can view their personal details and calculation history.
* **Secure Environment:** Sensitive credentials (like DB passwords) are protected using `.env` files.

---

## 🛠️ Technology Stack

### **Frontend**
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **HTTP Client:** Axios

### **Backend**
* **Framework:** FastAPI (Python)
* **Database:** **MySQL 8.0+** (Relational Database)
* **ORM:** SQLAlchemy
* **Driver:** PyMySQL
* **Authentication:** Passlib (Hashing) & Python-Jose (JWT Tokens)

### **Machine Learning (AI)**
* **Model:** Random Forest Regressor
* **Preprocessing:** OneHotEncoder
* **Libraries:** Scikit-learn, Pandas, NumPy

---

## 📂 Project Structure

```bash
SustainaMind/
│
├─ Ai/                  # ML Training: Jupyter Notebooks & CSV datasets
│   ├── carbon_model.pkl    # Trained Model
│   └── encoder.pkl         # Data Encoder
│
├─ backend/             # FastAPI Server
│   ├── main.py             # Main API Routes
│   ├── database.py         # MySQL Connection Logic
│   ├── models.py           # Database Schema (User & History)
│   ├── .env                # Secret Keys (Not on GitHub)
│   └── requirements.txt    # Python Dependencies
│
├─ frontend/            # React Client
│   ├── src/
│   │   ├── pages/          # Login, Signup, Profile, TrackCarbon
│   └── package.json
│
└─ Readme.md            # Documentation

---

## Getting Started

### Prerequisites

* Python 3.10+
* Node.js & npm/yarn
* MySQL Server (Installed and Running)
* Git

### Setup

1. **Activate Python environment**

```bash
source .venv/bin/activate
```

2. **Install backend dependencies**

```bash
cd backend
python -m venv venv
pip install fastapi uvicorn sqlalchemy passlib[bcrypt] python-jose[cryptography] python-multipart pandas scikit-learn numpy
pip install pymysql
```

3. **Install frontend dependencies**

```bash
cd frontend
npm install
```

4. **Ensure AI model & encoder files are in backend**

```bash
cp Ai/carbon_model.pkl backend/
cp Ai/encoder.pkl backend/
```

---

## Usage

1. **Run Backend**

```bash
cd backend
uvicorn main:app --reload
```

2. **Run Frontend (Vite)**

```bash
cd frontend
npm run dev
```

3. **Access the app**
   Open [http://localhost:5173/](http://localhost:5173/) in your browser.

4. **Calculate Carbon Footprint**
   Enter your lifestyle and energy data to get a personalized carbon footprint estimate.

---

## Experience the App
1.Open your browser and go to http://localhost:5173.
2.Signup for a new account.
3.Login to access the "Track Carbon" feature.
4.Fill out the form to get your prediction.
5.Check your Profile to see your saved history.

---

## 🔒 AI Model Details
The model was trained on a dataset containing lifestyle habits and their corresponding carbon emissions.
Input Features: Body Type, Diet, Social Activity, Transport Mode, Grocery Bill, Waste Production, etc.
Processing:
Categorical data (e.g., "Vegan", "Car") is encoded using OneHotEncoder.
Missing values are handled dynamically.
Accuracy: The Random Forest algorithm ensures robust predictions by averaging multiple decision trees.

---