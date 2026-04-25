from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
import io

# Constants
PASS_THRESHOLD = 40
AT_RISK_Z_CUTOFF = -1.0
SUBJECTS = ["Math", "Physics", "Electronics", "CS", "English"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_exam_status(mean: float, std_dev: float) -> str:
    if mean < 50 and std_dev < 15:
        return "NEEDS REVIEW"
    if mean > 80 and std_dev < 10:
        return "TOO EASY"
    if std_dev > 25:
        return "MIXED RESULTS"
    return "NORMAL"

@app.post("/api/analyze")
async def analyze_data(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=422, detail="File must be a CSV file")

    contents = await file.read()
    try:
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
    except Exception as e:
        raise HTTPException(status_code=422, detail="Malformed CSV file: unable to parse data.")

    # Validate schema
    required_columns = ["StudentID"] + SUBJECTS
    for col in required_columns:
        if col not in df.columns:
            raise HTTPException(status_code=422, detail=f"Missing required column: {col}")

    # Coerce to numeric
    for col in SUBJECTS:
        df[col] = pd.to_numeric(df[col], errors='coerce')
        
    # Calculate Overall average score for each student
    df['Overall'] = df[SUBJECTS].mean(axis=1)
    df = df.dropna(subset=['Overall']).copy()
    
    n = len(df)
    if n == 0:
        raise HTTPException(status_code=422, detail="No valid data found after processing.")

    # Basic Stats
    mean = float(df['Overall'].mean())
    std_dev = float(df['Overall'].std(ddof=0))
    pass_count = int((df['Overall'] >= PASS_THRESHOLD).sum())
    pass_rate = round((pass_count / n) * 100, 1) if n > 0 else 0.0

    # Advanced Stats
    kurtosis = float(df['Overall'].kurt()) if n > 3 else 0.0
    skewness = float(df['Overall'].skew()) if n > 2 else 0.0
    median = float(df['Overall'].median())
    iqr = float(df['Overall'].quantile(0.75) - df['Overall'].quantile(0.25))

    # Distribution (10 point buckets)
    distribution = []
    for i in range(10):
        start = i * 10 + 1 if i > 0 else 0
        end = (i + 1) * 10
        count = int(((df['Overall'] >= start) & (df['Overall'] <= end)).sum())
        distribution.append({"name": f"{start}-{end}", "count": count})

    # Exam Status
    status = get_exam_status(mean, std_dev)

    # Student Data
    df['Percentile'] = df['Overall'].rank(pct=True) * 100
    
    students = []
    for _, row in df.iterrows():
        score = int(round(row['Overall']))
        z_score = (score - mean) / std_dev if std_dev > 0 else 0.0
        percentile = int(round(row['Percentile']))
        delta = score - mean
        student_status = 'NEEDS SUPPORT' if z_score < AT_RISK_Z_CUTOFF else 'ON TRACK'
        
        students.append({
            "id": str(row["StudentID"]),
            "score": score,
            "z_score": float(z_score),
            "percentile": percentile,
            "delta": float(delta),
            "status": student_status
        })
        
    at_risk_count = sum(1 for s in students if s['status'] == 'NEEDS SUPPORT')
    
    # Sort students by z_score
    students = sorted(students, key=lambda x: x["z_score"])

    response_data = {
        "summary": {
            "mean": mean,
            "std_dev": std_dev,
            "pass_rate": pass_rate,
            "at_risk_count": at_risk_count
        },
        "distribution": distribution,
        "health": {
            "status": status,
            "kurtosis": kurtosis,
            "skewness": skewness,
            "median": median,
            "iqr": iqr
        },
        "students": students
    }
    
    return JSONResponse(content=response_data)
