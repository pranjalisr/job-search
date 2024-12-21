import { useState } from 'react';
import { Job, getRelatedJobs } from '../utils/jobUtils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

interface JobListProps {
  jobs: Job[];
}

export default function JobList({ jobs }: JobListProps) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const handleJobClick = async (job: Job) => {
    setSelectedJob(job);
    setLoading(true);
    try {
      const related = await getRelatedJobs(job.id);
      setRelatedJobs(related);
    } catch (error) {
      console.error('Failed to fetch related jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleJobClick(job)}>
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <CardDescription>{job.company}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{job.location}</p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Education:</span> {job.education}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Industry:</span> {job.industry}
                </p>
                <p className="text-sm mb-2">
                  <span className="font-semibold">Job Type:</span> {job.jobType}
                </p>
                <p className="text-sm mb-4">
                  <span className="font-semibold">Pay Rate:</span> {job.payRate}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      {selectedJob && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>{selectedJob.title}</CardTitle>
              <CardDescription>{selectedJob.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{selectedJob.description}</p>
              <h4 className="text-xl font-bold mb-2">Related Jobs</h4>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-[100px] w-full" />
                  <Skeleton className="h-[100px] w-full" />
                  <Skeleton className="h-[100px] w-full" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedJobs.map((job) => (
                    <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleJobClick(job)}>
                      <CardHeader>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription>{job.company}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{job.location}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

