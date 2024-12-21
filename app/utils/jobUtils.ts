import jobsData from '../data/jobs.json';

export interface Job {
  id: number;
  company: string;
  title: string;
  description: string;
  education: string;
  skills: string[];
  industry: string;
  jobType: string;
  payRate: string;
  location: string;
}

export interface SearchParams {
  query: string;
  industry?: string;
  jobType?: string;
}

export function searchJobs(params: SearchParams): Job[] {
  return jobsData.filter((job) => {
    const matchesQuery =
      params.query === '' ||
      job.title.toLowerCase().includes(params.query.toLowerCase()) ||
      job.company.toLowerCase().includes(params.query.toLowerCase()) ||
      job.description.toLowerCase().includes(params.query.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(params.query.toLowerCase())
      );

    const matchesIndustry =
      params.industry === 'all' || job.industry === params.industry;

    const matchesJobType =
      params.jobType === 'all' || job.jobType === params.jobType;

    return matchesQuery && matchesIndustry && matchesJobType;
  });
}

export function getUniqueValues(field: keyof Job): string[] {
  const values = new Set(jobsData.map((job) => job[field]));
  return Array.from(values).filter((value): value is string => typeof value === 'string');
}

export async function getRelatedJobs(jobId: number): Promise<Job[]> {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // For demonstration purposes, we'll just return 3 random jobs
  const relatedJobs = jobsData
    .filter(job => job.id !== jobId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return relatedJobs;
}

