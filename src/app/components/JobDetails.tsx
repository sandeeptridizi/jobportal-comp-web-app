import { useState } from 'react';
import { Job } from '../App';
import { X, MapPin, Briefcase, DollarSign, Calendar } from 'lucide-react';
import { ApplicationForm } from './ApplicationForm';

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
}

export function JobDetails({ job, onClose }: JobDetailsProps) {
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="mb-2">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {/* Job Info */}
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Briefcase className="w-5 h-5" />
              <span>{job.type} • {job.department}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign className="w-5 h-5" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-5 h-5" />
              <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="mb-3">About the Role</h3>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div className="mb-6">
            <h3 className="mb-3">Responsibilities</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.responsibilities.map((resp, index) => (
                <li key={index}>{resp}</li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <h3 className="mb-3">Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Application Form or Button */}
          {showApplicationForm ? (
            <ApplicationForm job={job} onCancel={() => setShowApplicationForm(false)} />
          ) : (
            <button
              onClick={() => setShowApplicationForm(true)}
              className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
