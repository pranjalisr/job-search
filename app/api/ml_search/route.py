from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import json
from pathlib import Path

def load_jobs():
    jobs_path = Path(__file__).parent.parent.parent / 'data' / 'jobs.json'
    with open(jobs_path, 'r') as f:
        return json.load(f)

def preprocess_job(job):
    return f"{job['title']} {job['description']} {' '.join(job['skills'])}"

def get_related_jobs(job_id, top_n=3):
    jobs = load_jobs()
    job_texts = [preprocess_job(job) for job in jobs]
    
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(job_texts)
    
    job_index = next(index for (index, job) in enumerate(jobs) if job["id"] == job_id)
    job_vector = tfidf_matrix[job_index]
    
    cosine_similarities = cosine_similarity(job_vector, tfidf_matrix).flatten()
    related_indices = cosine_similarities.argsort()[-top_n-1:-1][::-1]
    
    return [jobs[i] for i in related_indices if i != job_index]

def POST(request):
    data = request.json()
    job_id = data.get('jobId')
    
    if not job_id:
        return {'error': 'Job ID is required'}, 400
    
    related_jobs = get_related_jobs(job_id)
    return {'relatedJobs': related_jobs}

