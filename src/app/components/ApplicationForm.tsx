import { useState } from 'react';
import { Job } from '../App';
import { CheckCircle } from 'lucide-react';

interface ApplicationFormProps {
  job: Job;
  onCancel: () => void;
}

export function ApplicationForm({ job, onCancel }: ApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resume: '',
    coverLetter: '',
    linkedIn: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log('Application submitted:', { job: job.id, ...formData });
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-green-900 mb-2">Application Submitted!</h3>
        <p className="text-green-700 mb-4">
          Thank you for applying to {job.title}. We&apos;ll review your application and get back to you soon.
        </p>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
      <h3 className="mb-4">Apply for {job.title}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm mb-1 text-gray-700">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm mb-1 text-gray-700">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm mb-1 text-gray-700">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="resume" className="block text-sm mb-1 text-gray-700">
            Resume URL *
          </label>
          <input
            type="url"
            id="resume"
            name="resume"
            required
            placeholder="https://..."
            value={formData.resume}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">Link to your resume (Google Drive, Dropbox, etc.)</p>
        </div>

        <div>
          <label htmlFor="linkedIn" className="block text-sm mb-1 text-gray-700">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedIn"
            name="linkedIn"
            placeholder="https://linkedin.com/in/..."
            value={formData.linkedIn}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="coverLetter" className="block text-sm mb-1 text-gray-700">
            Cover Letter *
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            required
            rows={6}
            placeholder="Tell us why you're a great fit for this role..."
            value={formData.coverLetter}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit Application
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
