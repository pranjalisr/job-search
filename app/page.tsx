'use client';

import { useState } from 'react';
import Layout from './components/Layout';
import SearchForm from './components/SearchForm';
import JobList from './components/JobList';
import { searchJobs, getUniqueValues, Job, SearchParams } from './utils/jobUtils';
import { motion } from "framer-motion"

export default function JobSearchPage() {
  const [jobs, setJobs] = useState<Job[]>(searchJobs({ query: '' }));

  const handleSearch = (params: SearchParams) => {
    const results = searchJobs(params);
    setJobs(results);
  };

  const industries = getUniqueValues('industry');
  const jobTypes = getUniqueValues('jobType');

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Find Your Dream Job</h1>
        <p className="text-xl text-center mb-8 text-gray-600">
          Discover opportunities tailored to your skills and interests with our AI-powered job search.
        </p>
      </motion.div>
      <SearchForm industries={industries} jobTypes={jobTypes} onSearch={handleSearch} />
      <div className="mt-12">
        <JobList jobs={jobs} />
      </div>
    </Layout>
  );
}

