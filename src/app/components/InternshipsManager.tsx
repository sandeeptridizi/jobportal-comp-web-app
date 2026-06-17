import { useState } from 'react';
import { Job, Applicant } from '../App';
import { Plus, Edit2, Trash2, Eye, EyeOff, Search, GraduationCap, Calendar, Users as UsersIcon, Sparkles, ArrowLeft, MapPin, DollarSign, Building2, Clock, Mail, Phone, FileText, MessageSquare, TrendingUp, Share2, Check, Zap } from 'lucide-react';
import { JobForm } from './JobForm';
import { MessengerChat } from './MessengerChat';
import { ResumeViewer } from './ResumeViewer';
import { InternshipBoostPayment } from './InternshipBoostPayment';
import { motion } from 'motion/react';

interface InternshipsManagerProps {
  jobs: Job[];
  applicants: Applicant[];
  onAddJob: (job: Job) => void;
  onUpdateJob: (job: Job) => void;
  onDeleteJob: (jobId: string) => void;
  onUpdateStatus: (applicantId: string, status: Applicant['status']) => void;
  onStartChat: (applicant: Applicant) => void;
}

export function InternshipsManager({ jobs, applicants, onAddJob, onUpdateJob, onDeleteJob, onUpdateStatus, onStartChat }: InternshipsManagerProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Closed' | 'Draft'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobView, setSelectedJobView] = useState<Job | null>(null);
  const [chatApplicant, setChatApplicant] = useState<Applicant | null>(null);
  const [resumeApplicant, setResumeApplicant] = useState<Applicant | null>(null);
  const [applicantFilter, setApplicantFilter] = useState<'All' | Applicant['status']>('All');
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);
  const [showBoostPayment, setShowBoostPayment] = useState(false);

  const filteredJobs = jobs.filter(job => {
    const matchesFilter = filter === 'All' || job.status === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const allJobApplicants = selectedJobView
    ? applicants.filter(a => a.jobId === selectedJobView.id)
    : [];

  const jobApplicants = applicantFilter === 'All'
    ? allJobApplicants
    : allJobApplicants.filter(a => a.status === applicantFilter);

  const handleEdit = (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingJob(job);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingJob(null);
  };

  const handleSaveJob = (job: Job) => {
    if (editingJob) {
      onUpdateJob(job);
    } else {
      onAddJob(job);
    }
    handleCloseForm();
  };

  const toggleJobStatus = (job: Job, e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateJob({
      ...job,
      status: job.status === 'Active' ? 'Closed' : 'Active'
    });
  };

  const handleDeleteJob = (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this internship?')) {
      onDeleteJob(jobId);
    }
  };

  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Active':
        return { bg: '#FFC300', text: '#000000' };
      case 'Closed':
        return { bg: '#6f6f6f', text: '#f6f6f6' };
      case 'Draft':
        return { bg: '#d3d3d3', text: '#000000' };
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return { bg: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)', text: '#000000', glow: 'rgba(255, 195, 0, 0.6)' };
    if (score >= 80) return { bg: 'linear-gradient(135deg, #023047 0%, #034F73 100%)', text: '#ffffff', glow: 'rgba(2, 48, 71, 0.6)' };
    if (score >= 70) return { bg: 'linear-gradient(135deg, #6f6f6f 0%, #8f8f8f 100%)', text: '#ffffff', glow: 'rgba(111, 111, 111, 0.5)' };
    return { bg: 'linear-gradient(135deg, #d3d3d3 0%, #e3e3e3 100%)', text: '#000000', glow: 'rgba(211, 211, 211, 0.4)' };
  };

  const getApplicantStatusColor = (status: Applicant['status']) => {
    switch (status) {
      case 'New':
        return { bg: '#FFC300', text: '#000000' };
      case 'Reviewed':
        return { bg: '#023047', text: '#f6f6f6' };
      case 'Shortlisted':
        return { bg: '#FFC300', text: '#000000' };
      case 'Rejected':
        return { bg: '#6f6f6f', text: '#f6f6f6' };
      case 'Accepted':
        return { bg: '#FFC300', text: '#000000' };
    }
  };

  const handleShare = (jobId: string) => {
    const shareUrl = `${window.location.origin}/internships/${jobId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedJobId(jobId);
      setTimeout(() => setCopiedJobId(null), 2000);
    });
  };

  if (selectedJobView) {
    return (
      <div className="p-8 min-h-screen" style={{ background: '#f6f6f6' }}>
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedJobView(null)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl mb-6 transition-all relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', color: '#f6f6f6', border: '2px solid #FFC300' }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <ArrowLeft className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Back to Internships</span>
          </motion.button>

          {/* Internship Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-8 mb-6 shadow-sm relative overflow-hidden"
            style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
          >
            <motion.div
              className="absolute inset-0 opacity-5"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, #FFC300 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, #FFC300 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, #FFC300 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h1 style={{ color: '#000000' }}>{selectedJobView.title}</h1>
                    <span className="px-4 py-2 rounded-full text-sm" style={{ background: getStatusColor(selectedJobView.status).bg, color: getStatusColor(selectedJobView.status).text }}>
                      {selectedJobView.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                      <span style={{ color: '#000000' }}>{selectedJobView.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                      <span style={{ color: '#000000' }}>{selectedJobView.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <span style={{ color: '#FFC300' }}>{selectedJobView.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" style={{ color: '#6f6f6f' }} />
                      <span style={{ color: '#6f6f6f' }}>Posted {new Date(selectedJobView.postedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleShare(selectedJobView.id)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all relative overflow-hidden"
                    style={{ 
                      background: copiedJobId === selectedJobView.id ? '#FFC300' : 'linear-gradient(135deg, #023047 0%, #000000 100%)', 
                      color: copiedJobId === selectedJobView.id ? '#000000' : '#f6f6f6',
                      border: '2px solid #FFC300'
                    }}
                  >
                    {copiedJobId !== selectedJobView.id && (
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    {copiedJobId === selectedJobView.id ? <Check className="w-5 h-5 relative z-10" /> : <Share2 className="w-5 h-5 relative z-10" />}
                    <span className="relative z-10">{copiedJobId === selectedJobView.id ? 'Copied!' : 'Share Internship'}</span>
                  </motion.button>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-3" style={{ color: '#000000' }}>Description</h3>
                <p style={{ color: '#6f6f6f' }}>{selectedJobView.description}</p>
              </div>

              {selectedJobView.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3" style={{ color: '#000000' }}>Requirements</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJobView.requirements.map((req, idx) => (
                      <motion.span
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 rounded-full text-sm"
                        style={{ background: '#023047', color: '#FFC300' }}
                      >
                        {req}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}

              {selectedJobView.responsibilities.length > 0 && (
                <div>
                  <h3 className="mb-3" style={{ color: '#000000' }}>Responsibilities</h3>
                  <ul className="space-y-2">
                    {selectedJobView.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span style={{ color: '#FFC300' }}>•</span>
                        <span style={{ color: '#6f6f6f' }}>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>

          {/* Applications Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-6"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-7 h-7" style={{ color: '#FFC300' }} />
                <h2 style={{ color: '#000000' }}>Applications ({allJobApplicants.length})</h2>
              </div>
              
              {/* Applicant Status Filters */}
              <div className="flex gap-2">
                {(['All', 'New', 'Reviewed', 'Shortlisted', 'Accepted', 'Rejected'] as const).map(status => {
                  const count = status === 'All' 
                    ? allJobApplicants.length 
                    : allJobApplicants.filter(a => a.status === status).length;
                  return (
                    <motion.button
                      key={status}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setApplicantFilter(status)}
                      className="px-4 py-2 rounded-lg text-sm transition-all relative overflow-hidden"
                      style={{
                        background: applicantFilter === status ? '#023047' : '#ffffff',
                        color: applicantFilter === status ? '#FFC300' : '#000000',
                        border: `2px solid ${applicantFilter === status ? '#FFC300' : '#d3d3d3'}`
                      }}
                    >
                      {applicantFilter === status && (
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <span className="relative z-10">{status} ({count})</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
              {jobApplicants.length > 0 ? (
                jobApplicants.map((applicant, index) => {
                  const matchScoreColors = getMatchScoreColor(applicant.matchScore);
                  const statusColors = getApplicantStatusColor(applicant.status);
                  return (
                    <motion.div
                      key={applicant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      className="rounded-xl p-6 shadow-sm transition-all relative overflow-hidden"
                      style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 style={{ color: '#000000' }}>{applicant.name}</h3>
                            <span className="px-3 py-1 rounded-full text-xs" style={{ background: statusColors.bg, color: statusColors.text }}>
                              {applicant.status}
                            </span>
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                              style={{
                                background: matchScoreColors.bg,
                                color: matchScoreColors.text,
                                boxShadow: `0 0 20px ${matchScoreColors.glow}`
                              }}
                            >
                              <TrendingUp className="w-4 h-4" />
                              <span>{applicant.matchScore}% Match</span>
                            </motion.div>
                          </div>
                          <div className="flex items-center gap-6 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                              <span style={{ color: '#6f6f6f' }}>{applicant.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                              <span style={{ color: '#6f6f6f' }}>{applicant.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                              <span style={{ color: '#6f6f6f' }}>Applied {new Date(applicant.appliedDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {applicant.coverLetter && (
                            <p className="text-sm mb-4" style={{ color: '#6f6f6f' }}>{applicant.coverLetter}</p>
                          )}
                          <div className="flex gap-2">
                            {['New', 'Reviewed', 'Shortlisted', 'Accepted', 'Rejected'].map(status => (
                              <motion.button
                                key={status}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onUpdateStatus(applicant.id, status as Applicant['status'])}
                                className="px-4 py-2 rounded-lg text-sm transition-all"
                                style={{
                                  background: applicant.status === status ? '#023047' : '#f6f6f6',
                                  color: applicant.status === status ? '#FFC300' : '#000000',
                                  border: `2px solid ${applicant.status === status ? '#FFC300' : '#d3d3d3'}`
                                }}
                              >
                                {status}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setChatApplicant(applicant)}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                            style={{ background: '#FFC300', color: '#000000' }}
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Chat</span>
                          </motion.button>
                          {applicant.resume && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => setResumeApplicant(applicant)}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                              style={{ background: '#023047', color: '#f6f6f6' }}
                            >
                              <FileText className="w-4 h-4" />
                              <span>Resume</span>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl p-16 text-center"
                  style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
                >
                  <UsersIcon className="w-16 h-16 mx-auto mb-4" style={{ color: '#d3d3d3' }} />
                  <h3 className="mb-2" style={{ color: '#000000' }}>No Applications Yet</h3>
                  <p style={{ color: '#6f6f6f' }}>Applications for this internship will appear here</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Messenger Chat */}
        {chatApplicant && (
          <MessengerChat
            applicant={chatApplicant}
            onClose={() => setChatApplicant(null)}
            onSendMessage={(text) => {
              console.log('Message sent:', text);
            }}
          />
        )}

        {/* Resume Viewer */}
        {resumeApplicant && (
          <ResumeViewer
            applicant={resumeApplicant}
            onClose={() => setResumeApplicant(null)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen" style={{ background: '#f6f6f6' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-4"
            >
              <Sparkles className="w-8 h-8" style={{ color: '#FFC300' }} />
              <h1 style={{ color: '#000000' }}>Internship Programs</h1>
            </motion.div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl transition-colors shadow-sm relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', color: '#f6f6f6', border: '2px solid #FFC300' }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <Plus className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Post New Internship</span>
          </motion.button>
        </div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-6 mb-6"
          style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
        >
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
              <input
                type="text"
                placeholder="Search internships by title or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                style={{ border: '2px solid #d3d3d3', background: '#f6f6f6', color: '#000000' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFC300';
                  e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d3d3d3';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div className="flex gap-2">
              {(['All', 'Active', 'Closed', 'Draft'] as const).map(status => {
                const count = status === 'All' ? jobs.length : jobs.filter(j => j.status === status).length;
                return (
                  <motion.button
                    key={status}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFilter(status)}
                    className="px-5 py-3 rounded-xl transition-all relative overflow-hidden"
                    style={{
                      background: filter === status ? '#023047' : '#ffffff',
                      color: filter === status ? '#f6f6f6' : '#000000',
                      border: `2px solid ${filter === status ? '#FFC300' : '#d3d3d3'}`
                    }}
                  >
                    {filter === status && (
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <span className="relative z-10">{status} ({count})</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Internships Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl overflow-hidden shadow-sm"
          style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
        >
          <table className="w-full">
            <thead style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)', borderBottom: '2px solid #FFC300' }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Internship Title</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Department</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Location</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Stipend</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Applications</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Status</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Posted</th>
                <th className="px-6 py-4 text-right text-sm" style={{ color: '#f6f6f6' }}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#d3d3d3' }}>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => {
                  const statusColors = getStatusColor(job.status);
                  return (
                    <motion.tr 
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ background: '#f6f6f6' }}
                      className="transition-colors cursor-pointer"
                      onClick={() => setSelectedJobView(job)}
                    >
                      <td className="px-6 py-4">
                        <p style={{ color: '#000000' }}>{job.title}</p>
                      </td>
                      <td className="px-6 py-4" style={{ color: '#000000' }}>{job.department}</td>
                      <td className="px-6 py-4" style={{ color: '#000000' }}>{job.location}</td>
                      <td className="px-6 py-4" style={{ color: '#FFC300' }}>{job.salary}</td>
                      <td className="px-6 py-4">
                        <span style={{ color: '#FFC300' }}>{job.applicants}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs" style={{ background: statusColors.bg, color: statusColors.text }}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#6f6f6f' }}>
                        {new Date(job.postedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedJobView(job);
                              setShowBoostPayment(true);
                            }}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#FFC300' }}
                            title="Boost internship for more applications (₹99)"
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 195, 0, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <Zap className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => toggleJobStatus(job, e)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#6f6f6f' }}
                            title={job.status === 'Active' ? 'Close internship' : 'Activate internship'}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f6f6f6'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            {job.status === 'Active' ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleEdit(job, e)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#FFC300' }}
                            title="Edit internship"
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 195, 0, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <Edit2 className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleDeleteJob(job.id, e)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#6f6f6f' }}
                            title="Delete internship"
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f6f6f6'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleShare(job.id)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#FFC300' }}
                            title="Share internship"
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 195, 0, 0.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            {copiedJobId === job.id ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center" style={{ color: '#6f6f6f' }}>
                    No internships found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>

      {/* Internship Form Modal */}
      {showForm && (
        <JobForm
          job={editingJob}
          preselectedType="Internship"
          onSave={handleSaveJob}
          onCancel={handleCloseForm}
        />
      )}

      {/* Internship Boost Payment Modal */}
      {showBoostPayment && selectedJobView && (
        <InternshipBoostPayment
          internshipTitle={selectedJobView.title}
          onClose={() => setShowBoostPayment(false)}
          onPaymentSuccess={() => {
            setShowBoostPayment(false);
            alert('Internship boosted successfully! You will now get 3X more applications.');
          }}
        />
      )}
    </div>
  );
}