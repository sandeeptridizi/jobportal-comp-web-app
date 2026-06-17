import { Job } from '../App';
import { JobCard } from './JobCard';

interface JobListProps {
  jobs: Job[];
  onSelectJob: (job: Job) => void;
}

export function JobList({ jobs, onSelectJob }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No jobs found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} onSelect={onSelectJob} />
      ))}
    </div>
  );
}
