'use client';

import { useState } from 'react';
import { SearchParams } from '../utils/jobUtils';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchFormProps {
  industries: string[];
  jobTypes: string[];
  onSearch: (params: SearchParams) => void;
}

export default function SearchForm({ industries, jobTypes, onSearch }: SearchFormProps) {
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('all');
  const [jobType, setJobType] = useState('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query, industry, jobType });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search jobs..."
          className="flex-grow"
        />
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Industries</SelectItem>
            {industries.map((ind) => (
              <SelectItem key={ind} value={ind}>
                {ind}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={jobType} onValueChange={setJobType}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Job Types</SelectItem>
            {jobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="w-full md:w-auto">
          Search
        </Button>
      </div>
    </form>
  );
}

