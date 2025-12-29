# SustainaMind 🌱

SustainaMind is an AI-powered platform that helps individuals understand and reduce their carbon footprint. By analyzing lifestyle, diet, energy usage, and transportation habits, it provides personalized insights to live more sustainably.

---

## Table of Contents

- [Features](#features)  
- [Technology Stack](#technology-stack)  
- [AI & ML Details](#ai--ml-details)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
- [Usage](#usage)   

---

## Features

- **Carbon Footprint Calculation:** Predicts individual CO₂ emissions based on lifestyle and consumption data.  
- **Personalized Tips:** Suggests sustainable actions to reduce carbon footprint.  
- **Real-Time Predictions:** Instant results powered by a trained machine learning model.  
- **Privacy-Focused:** No user data is stored; all computations are done in real-time.  

---

## Technology Stack

- **Frontend:** React (Vite)  
  - Fast build and hot-reload with Vite bundler  
  - Responsive UI and interactive components  
  - Users input lifestyle, diet, and transportation habits directly in the browser  

- **Backend:** FastAPI  
  - Handles requests and interfaces with the AI model  
  - Computes predictions in real-time without storing user data  

- **AI Model:** Random Forest Regressor  
  - Predicts individual carbon footprints based on numerical and categorical data  
  - Uses OneHotEncoder to encode categorical features  
  - Robust, accurate, and capable of handling non-linear interactions  

---

## AI & ML Details

1. **Data Preprocessing:**  
   - Lifestyle data, energy usage, diet, transportation, and recycling habits are collected.  
   - List-like features (e.g., `Recycling`, `Cooking With`) are expanded into binary flags.  
   - Categorical features are encoded using OneHotEncoder.  

2. **Model Training & Saving:**  
   After training, the model and encoder are saved as `.pkl` files:  
   ```python
   with open("carbon_model.pkl", "wb") as f:
       pickle.dump(model, f)

   with open("encoder.pkl", "wb") as f:
       pickle.dump({
           "encoder": encoder,
           "categorical_cols": categorical_cols,
           "numerical_cols": numerical_cols
       }, f)

   print("✅ Model & encoder saved successfully!")
````

**Note:** After generating these files in the `Ai/` folder, they must be copied into the `backend/` folder so the FastAPI server can access them:

```bash
cp Ai/carbon_model.pkl backend/
cp Ai/encoder.pkl backend/
```

3. **Prediction Workflow:**

   * Users input their data via the frontend.
   * Backend encodes categorical features and combines them with numeric features.
   * The model predicts CO₂ emissions instantly and returns the result.

4. **Model Benefits:**

   * Captures complex interactions between features
   * Robust against missing or noisy data
   * Provides actionable insights for users

---

## Project Structure

```
SustainaMind/
│
├─ Ai/                  # AI model, training scripts, and encoders (pkl generated here)
├─ backend/             # FastAPI backend (store pkl files here for API use)
├─ frontend/            # React (Vite) frontend
├─ Readme.md            # Project documentation
└─ .venv/               # Python virtual environment
```

---

## Getting Started

### Prerequisites

* Python 3.10+
* Node.js & npm/yarn
* Virtual environment (`venv`)

### Setup

1. **Activate Python environment**

```bash
source .venv/bin/activate
```

2. **Install backend dependencies**

```bash
pip install -r backend/requirements.txt
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