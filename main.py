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

# ─── Exam Profiler ───
def get_exam_status(mean: float, std_dev: float) -> tuple[str, str]:
    """
    Evaluates exam statistics to determine the health status of the exam.
    
    Args:
        mean: The mean score for the exam.
        std_dev: The population standard deviation of the scores.
        
    Returns:
        A tuple containing the status string and the corresponding color token.
    """
    if mean < 50 and std_dev < 15:
        return "Brutal / Flawed Exam", "red"
    if mean > 80 and std_dev < 10:
        return "Too Easy", "amber"
    if std_dev > 25:
        return "Polarizing Exam", "orange"
    return "Healthy Bell Curve", "green"


# ─── Student Profiler ───
# Student profiling logic is executed within the endpoint below.

# ─── Upload Handler ───
@app.post("/api/analyze")
async def analyze_data(file: UploadFile = File(...)):
    """
    Endpoint that accepts a CSV file upload, processes the data, 
    and returns comprehensive statistical analysis for exams and students.
    
    Args:
        file: The uploaded CSV file containing student scores.
        
    Returns:
        A structured JSON response with summary stats, exam health profiles, 
        and a list of at-risk students.
    """
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

    # Process Exam Data
    exam_health = []
    stats_dict = {}

    for subject in SUBJECTS:
        # Coerce to numeric, making errors NaN
        df[subject] = pd.to_numeric(df[subject], errors='coerce')
        subject_data = df[subject].dropna()
        n = int(len(subject_data))
        
        if n == 0:
            continue
            
        mean = float(np.mean(subject_data))
        std_dev = float(np.std(subject_data, ddof=0))  # Population standard deviation
        
        passes = subject_data[subject_data >= PASS_THRESHOLD]
        fails = subject_data[subject_data < PASS_THRESHOLD]
        pass_count = int(len(passes))
        fail_count = int(len(fails))
        pass_pct = round((pass_count / n) * 100, 1) if n > 0 else 0.0
        
        min_score = int(np.min(subject_data))
        max_score = int(np.max(subject_data))
        
        status, color = get_exam_status(mean, std_dev)
        
        exam_health.append({
            "subject": subject,
            "mean": round(mean, 1),
            "std_dev": round(std_dev, 1),
            "pass_pct": pass_pct,
            "pass_count": pass_count,
            "fail_count": fail_count,
            "min": min_score,
            "max": max_score,
            "status": status,
            "color": color
        })
        
        # Save stats for student profiling
        stats_dict[subject] = {"mean": mean, "std_dev": std_dev}

    # Process Student Data
    at_risk_students = []
    
    for index, row in df.iterrows():
        student_id = str(row["StudentID"])
        z_scores = {}
        raw_scores = {}
        
        for subject in SUBJECTS:
            if subject not in stats_dict:
                continue
                
            score = row[subject]
            if pd.isna(score):
                continue
                
            raw_scores[subject] = int(score)
            
            mean = stats_dict[subject]["mean"]
            std = stats_dict[subject]["std_dev"]
            
            if std == 0:
                z = 0.0
            else:
                z = (score - mean) / std
                
            z_scores[subject] = round(z, 2)
            
        if not z_scores:
            continue
            
        composite_z = round(sum(z_scores.values()) / len(z_scores), 2)
        critical_subject = min(z_scores, key=z_scores.get)
        
        if composite_z < AT_RISK_Z_CUTOFF:
            at_risk_students.append({
                "student_id": student_id,
                "composite_z": composite_z,
                "critical_subject": critical_subject,
                "z_scores": z_scores,
                "raw_scores": raw_scores
            })
            
    # Sort at_risk_students ascending by composite_z
    at_risk_students = sorted(at_risk_students, key=lambda x: x["composite_z"])
    
    response_data = {
        "summary": {
            "total_students": int(len(df)),
            "subjects_analyzed": len(exam_health),
            "at_risk_count": len(at_risk_students)
        },
        "exam_health": exam_health,
        "at_risk_students": at_risk_students
    }
    
    return JSONResponse(content=response_data)
