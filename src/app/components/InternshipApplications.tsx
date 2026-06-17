import { useState } from 'react';
import { Job, Applicant } from '../App';
import { Search, MessageSquare, ExternalLink, Mail, Phone, FileText, Linkedin, GraduationCap, Calendar, Award, BookOpen, Sparkles } from 'lucide-react';
import { MessengerChat } from './MessengerChat';
import { motion } from 'motion/react';

interface InternshipApplicationsProps {
  jobs: Job[];
  applicants: Applicant[];
  onUpdateStatus: (applicantId: string, status: Applicant['status']) => void;
  onStartChat: (applicant: Applicant) => void;
}

export function InternshipApplications({ jobs, applicants, onUpdateStatus, onStartChat }: InternshipApplicationsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    applicants && applicants.length > 0 ? applicants[0] : null
  );
  const [chatApplicant, setChatApplicant] = useState<Applicant | null>(null);

  // Safe defaults
  const safeJobs = jobs || [];
  const safeApplicants = applicants || [];

  const filteredApplicants = safeApplicants.filter(applicant => {
    const matchesSearch = applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         applicant.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = selectedProgram === 'all' || applicant.jobId === selectedProgram;
    const matchesStatus = selectedStatus === 'all' || applicant.status === selectedStatus;
    return matchesSearch && matchesProgram && matchesStatus;
  });

  const getStatusColor = (status: Applicant['status']) => {
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

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return { bg: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)', text: '#000000', glow: 'rgba(255, 195, 0, 0.6)' };
    if (score >= 80) return { bg: 'linear-gradient(135deg, #023047 0%, #034F73 100%)', text: '#ffffff', glow: 'rgba(2, 48, 71, 0.6)' };
    if (score >= 70) return { bg: 'linear-gradient(135deg, #6f6f6f 0%, #8f8f8f 100%)', text: '#ffffff', glow: 'rgba(111, 111, 111, 0.5)' };
    return { bg: 'linear-gradient(135deg, #d3d3d3 0%, #e3e3e3 100%)', text: '#000000', glow: 'rgba(211, 211, 211, 0.4)' };
  };

  if (applicants.length === 0) {
    return (
      <div className="rounded-xl p-16 text-center shadow-sm" style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}>
        <GraduationCap className="w-16 h-16 mx-auto mb-4" style={{ color: '#d3d3d3' }} />
        <h3 className="mb-2" style={{ color: '#000000' }}>No Applications Yet</h3>
        <p style={{ color: '#6f6f6f' }}>Student applications will appear here once they apply to your internship programs</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex" style={{ background: '#f6f6f6' }}>
      {/* Left Side - Applications List */}
      <div className="w-2/5 flex flex-col" style={{ background: '#ffffff', borderRight: '2px solid #d3d3d3' }}>
        <div className="p-6 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)', borderBottom: '2px solid #FFC300' }}>
          <motion.div
            className="absolute inset-0 opacity-20"
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
            <div className="flex items-center gap-3 mb-4">
              <motion.div 
                className="w-10 h-10 backdrop-blur rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(255, 195, 0, 0.2)' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <GraduationCap className="w-6 h-6" style={{ color: '#FFC300' }} />
              </motion.div>
              <h1 style={{ color: '#f6f6f6' }}>Internship Applications</h1>
            </div>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#FFC300' }} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 backdrop-blur rounded-xl focus:outline-none transition-all"
                style={{ background: 'rgba(255, 195, 0, 0.1)', border: '2px solid rgba(255, 195, 0, 0.3)', color: '#f6f6f6' }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFC300';
                  e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255, 195, 0, 0.3)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-2 gap-3">
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="px-4 py-2.5 backdrop-blur rounded-xl focus:outline-none text-sm transition-all"
                style={{ background: 'rgba(255, 195, 0, 0.1)', border: '2px solid rgba(255, 195, 0, 0.3)', color: '#f6f6f6' }}
              >
                <option value="all" style={{ background: '#000000', color: '#f6f6f6' }}>All Programs</option>
                {safeJobs.map(job => (
                  <option key={job.id} value={job.id} style={{ background: '#000000', color: '#f6f6f6' }}>{job.title}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2.5 backdrop-blur rounded-xl focus:outline-none text-sm transition-all"
                style={{ background: 'rgba(255, 195, 0, 0.1)', border: '2px solid rgba(255, 195, 0, 0.3)', color: '#f6f6f6' }}
              >
                <option value="all" style={{ background: '#000000', color: '#f6f6f6' }}>All Status</option>
                <option value="New" style={{ background: '#000000', color: '#f6f6f6' }}>New</option>
                <option value="Reviewed" style={{ background: '#000000', color: '#f6f6f6' }}>Reviewed</option>
                <option value="Shortlisted" style={{ background: '#000000', color: '#f6f6f6' }}>Shortlisted</option>
                <option value="Rejected" style={{ background: '#000000', color: '#f6f6f6' }}>Rejected</option>
                <option value="Accepted" style={{ background: '#000000', color: '#f6f6f6' }}>Accepted</option>
              </select>
            </div>

            <p className="text-sm mt-4" style={{ color: '#FFC300' }}>
              {filteredApplicants.length} {filteredApplicants.length === 1 ? 'student' : 'students'} found
            </p>
          </div>
        </div>

        {/* Applications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredApplicants.length > 0 ? (
            <div>
              {filteredApplicants.map((applicant, index) => {
                const program = safeJobs.find(j => j.id === applicant.jobId);
                const statusColors = getStatusColor(applicant.status);
                return (
                  <motion.div
                    key={applicant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedApplicant(applicant)}
                    className="p-5 cursor-pointer transition-all"
                    style={{
                      borderBottom: '1px solid #d3d3d3',
                      background: selectedApplicant?.id === applicant.id ? '#f6f6f6' : '#ffffff',
                      borderLeft: selectedApplicant?.id === applicant.id ? '4px solid #FFC300' : '4px solid transparent'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-11 h-11 rounded-full flex items-center justify-center text-white flex-shrink-0 relative overflow-hidden"
                          style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)' }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <motion.div
                            className="absolute inset-0"
                            animate={{
                              background: ['radial-gradient(circle, #FFC300 0%, transparent 70%)', 'radial-gradient(circle, transparent 0%, transparent 70%)'],
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="relative z-10" style={{ color: '#f6f6f6' }}>
                            {applicant.name.charAt(0).toUpperCase()}
                          </span>
                        </motion.div>
                        <div>
                          <h4 style={{ color: '#000000' }}>{applicant.name}</h4>
                          <p className="text-sm truncate" style={{ color: '#6f6f6f' }}>{program?.title}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="px-3 py-1 rounded-full text-xs" style={{ background: statusColors.bg, color: statusColors.text }}>
                          {applicant.status}
                        </span>
                        {applicant.matchScore && (
                          <motion.div 
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                            style={{ 
                              background: getMatchScoreColor(applicant.matchScore).bg,
                              color: getMatchScoreColor(applicant.matchScore).text,
                              boxShadow: `0 0 15px ${getMatchScoreColor(applicant.matchScore).glow}`
                            }}
                            animate={{ 
                              boxShadow: [
                                `0 0 15px ${getMatchScoreColor(applicant.matchScore).glow}`,
                                `0 0 25px ${getMatchScoreColor(applicant.matchScore).glow}`,
                                `0 0 15px ${getMatchScoreColor(applicant.matchScore).glow}`
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Sparkles className="w-3 h-3" />
                            <span style={{ fontWeight: '700' }}>{applicant.matchScore}%</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs" style={{ color: '#6f6f6f' }}>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {applicant.email}
                      </span>
                      <span>•</span>
                      <span>{new Date(applicant.appliedDate).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p style={{ color: '#6f6f6f' }}>No applications found</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Application Details */}
      {selectedApplicant ? (
        <div className="flex-1 overflow-y-auto" style={{ background: '#f6f6f6' }}>
          <div className="p-8">
            <div className="max-w-5xl mx-auto">
              {/* Profile Header Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl shadow-sm mb-6 overflow-hidden"
                style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
              >
                {/* Header Section with Gradient */}
                <div className="p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)' }}>
                  <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 50%, #FFC300 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, #FFC300 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, #FFC300 0%, transparent 50%)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="flex items-start gap-6 relative z-10">
                    <motion.div 
                      className="w-24 h-24 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg"
                      style={{ background: '#ffffff', color: '#023047', border: '3px solid #FFC300' }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {selectedApplicant.name.charAt(0).toUpperCase()}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl" style={{ color: '#f6f6f6' }}>{selectedApplicant.name}</h2>
                        {selectedApplicant.matchScore && (
                          <motion.div 
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm"
                            style={{ 
                              background: getMatchScoreColor(selectedApplicant.matchScore).bg,
                              color: getMatchScoreColor(selectedApplicant.matchScore).text,
                              boxShadow: `0 0 20px ${getMatchScoreColor(selectedApplicant.matchScore).glow}`
                            }}
                            animate={{ 
                              boxShadow: [
                                `0 0 20px ${getMatchScoreColor(selectedApplicant.matchScore).glow}`,
                                `0 0 30px ${getMatchScoreColor(selectedApplicant.matchScore).glow}`,
                                `0 0 20px ${getMatchScoreColor(selectedApplicant.matchScore).glow}`
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-4 h-4" />
                            </motion.div>
                            <span style={{ fontWeight: '700' }}>{selectedApplicant.matchScore}% AI Match</span>
                          </motion.div>
                        )}
                      </div>
                      <p className="text-lg mb-4" style={{ color: '#FFC300' }}>{safeJobs.find(j => j.id === selectedApplicant.jobId)?.title}</p>
                      <div className="inline-flex items-center gap-2">
                        <span className="text-xs" style={{ color: '#d3d3d3' }}>Applied on</span>
                        <span style={{ color: '#f6f6f6' }}>{new Date(selectedApplicant.appliedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact & Status Section */}
                <div className="p-8">
                  {/* Contact Information Row */}
                  <div className="rounded-xl p-6 mb-6" style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}>
                    <div className="grid grid-cols-2 gap-8">
                      {/* Email */}
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                          style={{ background: '#023047' }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Mail className="w-6 h-6" style={{ color: '#FFC300' }} />
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs mb-1" style={{ color: '#6f6f6f' }}>Email Address</p>
                          <p className="truncate" style={{ color: '#000000' }} title={selectedApplicant.email}>{selectedApplicant.email}</p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                          style={{ background: '#000000' }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <Phone className="w-6 h-6" style={{ color: '#FFC300' }} />
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs mb-1" style={{ color: '#6f6f6f' }}>Phone Number</p>
                          <p style={{ color: '#000000' }}>{selectedApplicant.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Management */}
                  <div className="rounded-xl p-6 mb-6" style={{ background: '#ffffff', border: '2px solid #FFC300' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          className="w-2 h-2 rounded-full"
                          style={{ background: '#FFC300' }}
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span style={{ color: '#000000' }}>Application Status</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <select
                          value={selectedApplicant.status}
                          onChange={(e) => onUpdateStatus(selectedApplicant.id, e.target.value as Applicant['status'])}
                          className="px-6 py-3 rounded-xl border-0 cursor-pointer transition-all"
                          style={{ 
                            background: getStatusColor(selectedApplicant.status).bg, 
                            color: getStatusColor(selectedApplicant.status).text,
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 195, 0, 0.6), 0 4px 12px rgba(0, 0, 0, 0.15)';
                            e.currentTarget.style.transform = 'scale(1.02)';
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        >
                          <option value="New">New Application</option>
                          <option value="Reviewed">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Accepted">Accepted</option>
                        </select>
                      </motion.div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mb-6">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={selectedApplicant.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl transition-all shadow-sm"
                      style={{ background: '#0077B5', color: '#ffffff' }}
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn</span>
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setChatApplicant(selectedApplicant)}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl transition-all shadow-sm relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', color: '#f6f6f6', border: '2px solid #FFC300' }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <MessageSquare className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">Chat</span>
                    </motion.button>
                  </div>

                  {/* Resume Viewer */}
                  <div className="rounded-xl shadow-sm overflow-hidden" style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}>
                    <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)' }}>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5" style={{ color: '#FFC300' }} />
                        <h3 style={{ color: '#f6f6f6' }}>Resume / CV</h3>
                      </div>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={selectedApplicant.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm"
                        style={{ background: 'rgba(255, 195, 0, 0.2)', color: '#FFC300' }}
                      >
                        <span>Open in New Tab</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                    <div className="p-4" style={{ background: '#f6f6f6' }}>
                      <iframe
                        src={selectedApplicant.resume}
                        className="w-full h-[600px] rounded-lg shadow-inner"
                        style={{ background: '#ffffff' }}
                        title="Resume Preview"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Student Information Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl shadow-sm p-8 mb-6"
                style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#FFC300' }}>
                    <BookOpen className="w-5 h-5" style={{ color: '#000000' }} />
                  </div>
                  <h3 style={{ color: '#000000' }}>Student Information</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="rounded-xl p-5" style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <GraduationCap className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <span className="text-xs uppercase tracking-wider" style={{ color: '#6f6f6f' }}>Education Status</span>
                    </div>
                    <p style={{ color: '#000000' }}>Currently Enrolled Student</p>
                  </div>

                  <div className="rounded-xl p-5" style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <Award className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <span className="text-xs uppercase tracking-wider" style={{ color: '#6f6f6f' }}>Expected Graduation</span>
                    </div>
                    <p style={{ color: '#000000' }}>Spring 2026</p>
                  </div>
                </div>
              </motion.div>

              {/* Statement of Interest Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl shadow-sm p-8"
                style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#FFC300' }}>
                    <FileText className="w-5 h-5" style={{ color: '#000000' }} />
                  </div>
                  <h3 style={{ color: '#000000' }}>Statement of Interest</h3>
                </div>
                <div className="rounded-xl p-6" style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}>
                  <p className="leading-relaxed whitespace-pre-line" style={{ color: '#000000' }}>
                    {selectedApplicant.coverLetter}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center" style={{ background: '#f6f6f6' }}>
          <div className="text-center">
            <GraduationCap className="w-16 h-16 mx-auto mb-4" style={{ color: '#d3d3d3' }} />
            <p style={{ color: '#6f6f6f' }}>Select a student to view their application</p>
          </div>
        </div>
      )}
      
      {/* Messenger Chat */}
      {chatApplicant && (
        <MessengerChat
          applicant={chatApplicant}
          onClose={() => setChatApplicant(null)}
        />
      )}
    </div>
  );
}