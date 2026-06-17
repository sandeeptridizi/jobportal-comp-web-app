import { useState } from 'react';
import { Job, Applicant } from '../App';
import { Briefcase, GraduationCap, Code, Sparkles, Mail, Phone, Calendar, TrendingUp, MessageSquare, FileText, X, User as UserIcon, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MessengerChat } from './MessengerChat';
import { ResumeViewer } from './ResumeViewer';

interface ApplicantsManagerProps {
  jobs: Job[];
  applicants: Applicant[];
  onAddJob: (job: Job) => void;
  onUpdateJob: (job: Job) => void;
  onDeleteJob: (jobId: string) => void;
  onUpdateStatus: (applicantId: string, status: Applicant['status']) => void;
  onStartChat: (applicant: Applicant) => void;
}

type TabType = 'jobs' | 'internships' | 'freelance';

export function ApplicantsManager({ jobs, applicants, onAddJob, onUpdateJob, onDeleteJob, onUpdateStatus, onStartChat }: ApplicantsManagerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [applicantFilter, setApplicantFilter] = useState<'All' | Applicant['status']>('All');
  const [chatApplicant, setChatApplicant] = useState<Applicant | null>(null);
  const [resumeApplicant, setResumeApplicant] = useState<Applicant | null>(null);

  const tabs = [
    { id: 'jobs' as TabType, label: 'Job Postings', icon: Briefcase, type: ['Full-time', 'Part-time'] },
    { id: 'internships' as TabType, label: 'Internships', icon: GraduationCap, type: ['Internship'] },
    { id: 'freelance' as TabType, label: 'Freelance Gigs', icon: Code, type: ['Freelance'] }
  ];

  const filteredApplicants = applicants.filter(a => {
    const job = jobs.find(j => j.id === a.jobId);
    const currentTab = tabs.find(t => t.id === activeTab);
    if (!job || !currentTab) return false;
    
    const matchesTab = currentTab.type.includes(job.type);
    const matchesStatus = applicantFilter === 'All' || a.status === applicantFilter;
    
    return matchesTab && matchesStatus;
  });

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

  const getJobTitle = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : 'Unknown';
  };

  return (
    <div className="min-h-screen" style={{ background: '#f6f6f6' }}>
      <div className="sticky top-0 z-40 px-8 pt-8" style={{ background: '#f6f6f6' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-2 mb-6 shadow-sm relative overflow-hidden"
          style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
        >
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              background: [
                'radial-gradient(circle at 0% 50%, #FFC300 0%, transparent 50%)',
                'radial-gradient(circle at 100% 50%, #FFC300 0%, transparent 50%)',
                'radial-gradient(circle at 0% 50%, #FFC300 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <div className="flex gap-2 relative z-10">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const count = applicants.filter(a => {
                const job = jobs.find(j => j.id === a.jobId);
                return job && tab.type.includes(job.type);
              }).length;

              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-lg transition-all relative overflow-hidden"
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, #023047 0%, #000000 100%)' 
                      : 'transparent',
                    color: isActive ? '#f6f6f6' : '#000000',
                    border: isActive ? '2px solid #FFC300' : '2px solid transparent'
                  }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <Icon className="w-6 h-6 relative z-10" style={{ color: isActive ? '#FFC300' : '#6f6f6f' }} />
                  <div className="text-left relative z-10">
                    <div className="flex items-center gap-2">
                      <span>{tab.label}</span>
                      {isActive && <Sparkles className="w-4 h-4" style={{ color: '#FFC300' }} />}
                    </div>
                    <div className="text-xs mt-1" style={{ color: isActive ? '#FFC300' : '#6f6f6f' }}>
                      {count} {count === 1 ? 'Applicant' : 'Applicants'}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6" style={{ color: '#FFC300' }} />
            <h2 style={{ color: '#000000' }}>All Applicants</h2>
          </div>
          <div className="flex gap-2 ml-auto">
            {(['All', 'New', 'Reviewed', 'Shortlisted', 'Accepted', 'Rejected'] as const).map(status => {
              const count = status === 'All' 
                ? filteredApplicants.length 
                : applicants.filter(a => {
                    const job = jobs.find(j => j.id === a.jobId);
                    const currentTab = tabs.find(t => t.id === activeTab);
                    return job && currentTab && currentTab.type.includes(job.type) && a.status === status;
                  }).length;
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
      </div>

      <div className="px-8 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl overflow-hidden shadow-sm"
          style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
        >
          <table className="w-full">
            <thead style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)', borderBottom: '2px solid #FFC300' }}>
              <tr>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Applicant</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Applied For</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Contact</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Applied Date</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Match Score</th>
                <th className="px-6 py-4 text-left text-sm" style={{ color: '#f6f6f6' }}>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: '#d3d3d3' }}>
              {filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant, index) => {
                  const statusColors = getApplicantStatusColor(applicant.status);
                  const matchScoreColors = getMatchScoreColor(applicant.matchScore || 0);
                  return (
                    <motion.tr
                      key={applicant.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      whileHover={{ background: '#f6f6f6' }}
                      className="transition-colors cursor-pointer"
                      onClick={() => setSelectedApplicant(applicant)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: '#FFC300' }}>
                            <UserIcon className="w-5 h-5" style={{ color: '#000000' }} />
                          </div>
                          <div>
                            <p style={{ color: '#000000' }}>{applicant.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                          <span style={{ color: '#000000' }}>{getJobTitle(applicant.jobId)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                            <span style={{ color: '#6f6f6f' }}>{applicant.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                            <span style={{ color: '#6f6f6f' }}>{applicant.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                          <span style={{ color: '#6f6f6f' }}>{new Date(applicant.appliedDate).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                          style={{
                            background: matchScoreColors.bg,
                            color: matchScoreColors.text,
                            boxShadow: `0 0 15px ${matchScoreColors.glow}`
                          }}
                        >
                          <TrendingUp className="w-4 h-4" />
                          <span>{applicant.matchScore}%</span>
                        </motion.div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs inline-block" style={{ background: statusColors.bg, color: statusColors.text }}>
                          {applicant.status}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center" style={{ color: '#6f6f6f' }}>
                    <UserIcon className="w-16 h-16 mx-auto mb-4" style={{ color: '#d3d3d3' }} />
                    <h3 className="mb-2" style={{ color: '#000000' }}>No Applicants Found</h3>
                    <p style={{ color: '#6f6f6f' }}>No applicants match the current filter</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedApplicant && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
              style={{ background: 'rgba(0, 0, 0, 0.5)' }}
              onClick={() => setSelectedApplicant(null)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-[600px] shadow-2xl z-50 overflow-y-auto"
              style={{ background: '#ffffff' }}
            >
              <div className="sticky top-0 z-10 p-6 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)', borderBottom: '2px solid #FFC300' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#FFC300' }}>
                    <UserIcon className="w-6 h-6" style={{ color: '#000000' }} />
                  </div>
                  <div>
                    <h2 style={{ color: '#f6f6f6' }}>{selectedApplicant.name}</h2>
                    <p className="text-sm" style={{ color: '#FFC300' }}>Applicant Profile</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedApplicant(null)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ background: 'rgba(255, 195, 0, 0.2)' }}
                >
                  <X className="w-6 h-6" style={{ color: '#FFC300' }} />
                </motion.button>
              </div>

              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl p-6 mb-6 relative overflow-hidden"
                  style={{
                    background: getMatchScoreColor(selectedApplicant.matchScore || 0).bg,
                    color: getMatchScoreColor(selectedApplicant.matchScore || 0).text,
                    boxShadow: `0 0 30px ${getMatchScoreColor(selectedApplicant.matchScore || 0).glow}`
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8" />
                      <div>
                        <p className="text-sm opacity-90">AI Profile Match Score</p>
                        <p className="text-3xl">{selectedApplicant.matchScore}%</p>
                      </div>
                    </div>
                    <Sparkles className="w-12 h-12 opacity-50" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl p-6 mb-6"
                  style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}
                >
                  <h3 className="mb-3 flex items-center gap-2" style={{ color: '#000000' }}>
                    <Building2 className="w-5 h-5" style={{ color: '#FFC300' }} />
                    Applied For
                  </h3>
                  <p className="text-lg" style={{ color: '#023047' }}>{getJobTitle(selectedApplicant.jobId)}</p>
                  <div className="flex items-center gap-2 mt-2 text-sm">
                    <Calendar className="w-4 h-4" style={{ color: '#6f6f6f' }} />
                    <span style={{ color: '#6f6f6f' }}>Applied on {new Date(selectedApplicant.appliedDate).toLocaleDateString()}</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl p-6 mb-6"
                  style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}
                >
                  <h3 className="mb-4" style={{ color: '#000000' }}>Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <span style={{ color: '#000000' }}>{selectedApplicant.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" style={{ color: '#FFC300' }} />
                      <span style={{ color: '#000000' }}>{selectedApplicant.phone}</span>
                    </div>
                    {selectedApplicant.linkedIn && (
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5" style={{ color: '#FFC300' }} />
                        <a href={selectedApplicant.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: '#023047' }}>
                          LinkedIn Profile
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>

                {selectedApplicant.coverLetter && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-xl p-6 mb-6"
                    style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}
                  >
                    <h3 className="mb-3" style={{ color: '#000000' }}>Cover Letter</h3>
                    <p style={{ color: '#6f6f6f' }}>{selectedApplicant.coverLetter}</p>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-xl p-6 mb-6"
                  style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}
                >
                  <h3 className="mb-4" style={{ color: '#000000' }}>Update Status</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {['New', 'Reviewed', 'Shortlisted', 'Accepted', 'Rejected'].map(status => (
                      <motion.button
                        key={status}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateStatus(selectedApplicant.id, status as Applicant['status'])}
                        className="px-4 py-3 rounded-lg text-sm transition-all"
                        style={{
                          background: selectedApplicant.status === status ? '#023047' : '#ffffff',
                          color: selectedApplicant.status === status ? '#FFC300' : '#000000',
                          border: `2px solid ${selectedApplicant.status === status ? '#FFC300' : '#d3d3d3'}`
                        }}
                      >
                        {status}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setChatApplicant(selectedApplicant)}
                    className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)', color: '#000000' }}
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Start Chat</span>
                  </motion.button>
                  {selectedApplicant.resume && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setResumeApplicant(selectedApplicant)}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl transition-all relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', color: '#f6f6f6', border: '2px solid #FFC300' }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <FileText className="w-5 h-5 relative z-10" />
                      <span className="relative z-10">View Resume</span>
                    </motion.button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {chatApplicant && (
        <MessengerChat
          applicant={chatApplicant}
          onClose={() => setChatApplicant(null)}
          onSendMessage={(text) => {
            console.log('Message sent:', text);
          }}
        />
      )}

      {resumeApplicant && (
        <ResumeViewer
          applicant={resumeApplicant}
          onClose={() => setResumeApplicant(null)}
        />
      )}
    </div>
  );
}
