import { Job, Applicant } from '../App';
import { Briefcase, Users, CheckCircle, Clock, TrendingUp, Calendar, GraduationCap, Code, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface OverviewProps {
  jobs: Job[];
  applicants: Applicant[];
}

export function Overview({ jobs, applicants }: OverviewProps) {
  const activeJobs = jobs.filter(j => j.status === 'Active' && (j.type === 'Full-time' || j.type === 'Part-time')).length;
  const activeInternships = jobs.filter(j => j.status === 'Active' && j.type === 'Internship').length;
  const activeFreelance = jobs.filter(j => j.status === 'Active' && j.type === 'Freelance').length;
  const totalApplicants = applicants.length;
  const newApplicants = applicants.filter(a => a.status === 'New').length;
  const shortlisted = applicants.filter(a => a.status === 'Shortlisted').length;

  const recentApplicants = [...applicants]
    .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
    .slice(0, 6);

  const topJobs = [...jobs]
    .filter(j => j.status === 'Active')
    .sort((a, b) => b.applicants - a.applicants)
    .slice(0, 5);

  const stats = [
    {
      label: 'Active Job Postings',
      value: activeJobs,
      icon: Briefcase,
      bgColor: '#023047',
      iconColor: '#FFC300',
      trend: `${jobs.filter(j => j.type === 'Full-time' || j.type === 'Part-time').length} total`
    },
    {
      label: 'Active Internships',
      value: activeInternships,
      icon: GraduationCap,
      bgColor: '#000000',
      iconColor: '#FFC300',
      trend: `${jobs.filter(j => j.type === 'Internship').length} total programs`
    },
    {
      label: 'Active Freelance Gigs',
      value: activeFreelance,
      icon: Code,
      bgColor: '#023047',
      iconColor: '#FFC300',
      trend: `${jobs.filter(j => j.type === 'Freelance').length} total gigs`
    },
    {
      label: 'Total Applications',
      value: totalApplicants,
      icon: Users,
      bgColor: '#000000',
      iconColor: '#FFC300',
      trend: `${newApplicants} new, ${shortlisted} shortlisted`
    }
  ];

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
      default:
        return { bg: '#d3d3d3', text: '#000000' };
    }
  };

  const getTypeColor = (type: Job['type']) => {
    switch (type) {
      case 'Full-time':
        return { bg: '#023047', text: '#f6f6f6' };
      case 'Part-time':
        return { bg: '#6f6f6f', text: '#f6f6f6' };
      case 'Internship':
        return { bg: '#FFC300', text: '#000000' };
      case 'Freelance':
        return { bg: '#023047', text: '#f6f6f6' };
    }
  };

  return (
    <div className="p-8 min-h-screen" style={{ background: '#f6f6f6' }}>
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative overflow-hidden rounded-2xl p-8"
        style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)' }}
      >
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
        <div className="relative z-10 flex items-center gap-4">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-10 h-10" style={{ color: '#FFC300' }} />
          </motion.div>
          <div>
            <h1 className="mb-2" style={{ color: '#f6f6f6' }}>AI Recruitment Dashboard</h1>
            <p style={{ color: '#d3d3d3' }}>Welcome back! Here's your intelligent hiring overview</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colors = getStatusColor(stat.label as any);
          return (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="rounded-xl p-6 transition-shadow relative overflow-hidden"
              style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
            >
              <motion.div
                className="absolute inset-0 opacity-0"
                whileHover={{ opacity: 0.1 }}
                style={{ background: '#FFC300' }}
              />
              <div className="flex items-start justify-between mb-4 relative z-10">
                <motion.div 
                  className="p-3 rounded-xl relative overflow-hidden"
                  style={{ background: stat.bgColor }}
                  whileHover={{ rotate: 5 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Icon className="w-6 h-6 relative z-10" style={{ color: stat.iconColor }} />
                </motion.div>
                <Zap className="w-5 h-5" style={{ color: '#FFC300' }} />
              </div>
              <div className="mb-2 relative z-10">
                <motion.p 
                  className="text-4xl mb-1"
                  style={{ color: '#000000' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm" style={{ color: '#6f6f6f' }}>{stat.label}</p>
              </div>
              <p className="text-xs flex items-center gap-1 relative z-10" style={{ color: '#FFC300' }}>
                <span>{stat.trend}</span>
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Applications */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl p-6"
          style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" style={{ color: '#023047' }} />
              <h3 style={{ color: '#000000' }}>Recent Applications</h3>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="text-sm"
              style={{ color: '#FFC300' }}
            >
              View All
            </motion.button>
          </div>
          <div className="space-y-4">
            {recentApplicants.length > 0 ? (
              recentApplicants.map((applicant, index) => {
                const job = jobs.find(j => j.id === applicant.jobId);
                const statusColors = getStatusColor(applicant.status);
                return (
                  <motion.div 
                    key={applicant.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between py-3 border-b last:border-0"
                    style={{ borderColor: '#d3d3d3' }}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <motion.div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 relative overflow-hidden"
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
                        <span className="relative z-10" style={{ color: '#f6f6f6' }}>{applicant.name.charAt(0)}</span>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate" style={{ color: '#000000' }}>{applicant.name}</p>
                        <p className="text-sm truncate" style={{ color: '#6f6f6f' }}>{job?.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs" style={{ color: '#6f6f6f' }}>
                        {new Date(applicant.appliedDate).toLocaleDateString()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ background: statusColors.bg, color: statusColors.text }}>
                        {applicant.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center py-8" style={{ color: '#6f6f6f' }}>No applications yet</p>
            )}
          </div>
        </motion.div>

        {/* Top Performing Jobs */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl p-6"
          style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" style={{ color: '#023047' }} />
              <h3 style={{ color: '#000000' }}>Top Performing Jobs</h3>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="text-sm"
              style={{ color: '#FFC300' }}
            >
              View All
            </motion.button>
          </div>
          <div className="space-y-4">
            {topJobs.length > 0 ? (
              topJobs.map((job, index) => {
                const typeColors = getTypeColor(job.type);
                return (
                  <motion.div 
                    key={job.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ x: -5 }}
                    className="py-3 border-b last:border-0"
                    style={{ borderColor: '#d3d3d3' }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="mb-1" style={{ color: '#000000' }}>{job.title}</p>
                        <p className="text-sm" style={{ color: '#6f6f6f' }}>{job.department} • {job.location}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs" style={{ background: typeColors.bg, color: typeColors.text }}>
                        {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span style={{ color: '#6f6f6f' }}>
                        <strong style={{ color: '#FFC300' }}>{job.applicants}</strong> applicants
                      </span>
                      <span style={{ color: '#d3d3d3' }}>•</span>
                      <span style={{ color: '#6f6f6f' }}>
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <p className="text-center py-8" style={{ color: '#6f6f6f' }}>No active jobs</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 grid grid-cols-3 gap-6"
      >
        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          className="rounded-xl p-6 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', border: '2px solid #FFC300' }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.1)', 'rgba(255, 195, 0, 0)'],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-5 h-5" style={{ color: '#FFC300' }} />
              <h4 style={{ color: '#f6f6f6' }}>Post Full-time Job</h4>
            </div>
            <p className="text-sm mb-4" style={{ color: '#d3d3d3' }}>Hire permanent employees with full benefits</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg transition-colors text-sm"
              style={{ background: '#FFC300', color: '#000000' }}
            >
              Create Job Posting
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          className="rounded-xl p-6 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', border: '2px solid #FFC300' }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.1)', 'rgba(255, 195, 0, 0)'],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5" style={{ color: '#FFC300' }} />
              <h4 style={{ color: '#f6f6f6' }}>Post Internship</h4>
            </div>
            <p className="text-sm mb-4" style={{ color: '#d3d3d3' }}>Recruit talented students and recent graduates</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg transition-colors text-sm"
              style={{ background: '#FFC300', color: '#000000' }}
            >
              Create Internship
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02, y: -5 }}
          className="rounded-xl p-6 text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', border: '2px solid #FFC300' }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.1)', 'rgba(255, 195, 0, 0)'],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Code className="w-5 h-5" style={{ color: '#FFC300' }} />
              <h4 style={{ color: '#f6f6f6' }}>Post Freelance Gig</h4>
            </div>
            <p className="text-sm mb-4" style={{ color: '#d3d3d3' }}>Find skilled freelancers for project-based work</p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg transition-colors text-sm"
              style={{ background: '#FFC300', color: '#000000' }}
            >
              Create Freelance Gig
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
