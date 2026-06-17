import { useState } from 'react';
import { Job } from '../App';
import { X, Plus, Minus, Sparkles, Zap, CheckCircle2, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { JobPackageSelection } from './JobPackageSelection';

interface JobFormProps {
  job: Job | null;
  preselectedType?: Job['type'] | null;
  onSave: (job: Job) => void;
  onCancel: () => void;
}

export function JobForm({ job, preselectedType, onSave, onCancel }: JobFormProps) {
  const [formData, setFormData] = useState<Omit<Job, 'id' | 'applicants'>>({
    title: job?.title || '',
    type: job?.type || preselectedType || 'Full-time',
    location: job?.location || '',
    salary: job?.salary || '',
    description: job?.description || '',
    requirements: job?.requirements || [''],
    responsibilities: job?.responsibilities || [''],
    status: job?.status || 'Draft',
    postedDate: job?.postedDate || new Date().toISOString().split('T')[0],
    quickRecruit: job?.quickRecruit || { enabled: false, package: 'quick' },
    publishingPackage: job?.publishingPackage || undefined
  });
  const [showPackageSelection, setShowPackageSelection] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (job || formData.publishingPackage) {
      const newJob: Job = {
        id: job?.id || Date.now().toString(),
        ...formData,
        requirements: formData.requirements.filter(r => r.trim()),
        responsibilities: formData.responsibilities.filter(r => r.trim()),
        applicants: job?.applicants || 0
      };
      onSave(newJob);
    } else {
      setShowPackageSelection(true);
    }
  };

  const handlePackageSelect = (packageType: 'free' | 'premium') => {
    const packageDetails = packageType === 'free' 
      ? { type: 'free' as const, validity: 15, maxApplicants: 20 }
      : { type: 'premium' as const, validity: 60, maxApplicants: 50 };
    
    const newJob: Job = {
      id: job?.id || Date.now().toString(),
      ...formData,
      requirements: formData.requirements.filter(r => r.trim()),
      responsibilities: formData.responsibilities.filter(r => r.trim()),
      applicants: job?.applicants || 0,
      publishingPackage: packageDetails
    };
    onSave(newJob);
    setShowPackageSelection(false);
  };

  const updateArrayField = (
    field: 'requirements' | 'responsibilities',
    index: number,
    value: string
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field: 'requirements' | 'responsibilities') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayField = (field: 'requirements' | 'responsibilities', index: number) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const getTypeGuidance = (type: Job['type']) => {
    switch (type) {
      case 'Full-time':
        return {
          title: 'Full-time Position',
          description: 'Permanent employment with benefits and long-term commitment',
          salaryPlaceholder: 'e.g., $80,000 - $120,000/year'
        };
      case 'Part-time':
        return {
          title: 'Part-time Position',
          description: 'Flexible hours with reduced commitment',
          salaryPlaceholder: 'e.g., $30 - $50/hour'
        };
      case 'Internship':
        return {
          title: 'Internship Program',
          description: 'Temporary learning opportunity for students or recent graduates',
          salaryPlaceholder: 'e.g., $20 - $30/hour or Unpaid'
        };
      case 'Freelance':
        return {
          title: 'Freelance/Contract Work',
          description: 'Project-based work with flexible engagement',
          salaryPlaceholder: 'e.g., $50 - $100/hour or $5,000 - $10,000/project'
        };
    }
  };

  const guidance = getTypeGuidance(formData.type);

  return (
    <>
      {showPackageSelection && (
        <JobPackageSelection
          onSelectPackage={handlePackageSelect}
          onClose={() => setShowPackageSelection(false)}
        />
      )}
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex items-center justify-center z-50 p-8"
        style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)' }}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          style={{ background: '#f6f6f6', border: '3px solid #FFC300' }}
        >
          <div className="sticky top-0 px-8 py-6 flex justify-between items-center rounded-t-2xl relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)', borderBottom: '2px solid #FFC300' }}>
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
            <div className="relative z-10 flex items-center gap-3">
              <Sparkles className="w-6 h-6" style={{ color: '#FFC300' }} />
              <div>
                <h2 style={{ color: '#f6f6f6' }}>{job ? 'Edit Job Posting' : `Create New ${guidance.title}`}</h2>
                <p className="text-sm mt-1" style={{ color: '#d3d3d3' }}>{guidance.description}</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onCancel} 
              className="p-2 rounded-xl transition-colors relative z-10"
              style={{ color: '#FFC300' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 195, 0, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {!job && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl relative overflow-hidden"
                style={{
                  background: formData.type === 'Internship' ? 'rgba(255, 195, 0, 0.2)' : 'rgba(2, 48, 71, 0.1)',
                  border: `2px solid ${formData.type === 'Internship' ? '#FFC300' : '#023047'}`
                }}
              >
                <p className="text-sm" style={{ color: '#000000' }}>
                  <strong>Posting Type:</strong> {guidance.title} - {guidance.description}
                </p>
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2">
                <label htmlFor="title" className="block mb-2" style={{ color: '#000000' }}>
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{ border: '2px solid #d3d3d3', background: '#ffffff', color: '#000000' }}
                  placeholder="e.g., Senior Frontend Developer"
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

              <div>
                <label htmlFor="type" className="block mb-2" style={{ color: '#000000' }}>
                  Job Type
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Job['type'] })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{ border: '2px solid #d3d3d3', background: '#ffffff', color: '#000000' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFC300';
                    e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d3d3d3';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <label htmlFor="salary" className="block mb-2" style={{ color: '#000000' }}>
                  {formData.type === 'Freelance' ? 'Rate/Budget' : 'Salary Package'}
                </label>
                <input
                  type="text"
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{ border: '2px solid #d3d3d3', background: '#ffffff', color: '#000000' }}
                  placeholder={formData.type === 'Freelance' ? 'e.g., $50/hr or $5,000 project' : 'e.g., $80,000 - $120,000'}
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

              <div>
                <label htmlFor="location" className="block mb-2" style={{ color: '#000000' }}>
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{ border: '2px solid #d3d3d3', background: '#ffffff', color: '#000000' }}
                  placeholder="e.g., San Francisco, CA"
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

              <div>
                <label htmlFor="status" className="block mb-2" style={{ color: '#000000' }}>
                  Publishing Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Job['status'] })}
                  className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                  style={{ border: '2px solid #d3d3d3', background: '#ffffff', color: '#000000' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFC300';
                    e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d3d3d3';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="Draft">Draft (Not visible to applicants)</option>
                  <option value="Active">Active (Accepting applications)</option>
                  <option value="Closed">Closed (Not accepting applications)</option>
                </select>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl p-6 relative overflow-hidden"
              style={{ 
                background: formData.quickRecruit?.enabled 
                  ? 'linear-gradient(135deg, rgba(255, 195, 0, 0.15) 0%, rgba(2, 48, 71, 0.1) 100%)' 
                  : '#ffffff',
                border: formData.quickRecruit?.enabled ? '2px solid #FFC300' : '2px solid #d3d3d3'
              }}
            >
              {formData.quickRecruit?.enabled && (
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: [
                      'radial-gradient(circle at 0% 50%, #FFC300 0%, transparent 70%)',
                      'radial-gradient(circle at 100% 50%, #FFC300 0%, transparent 70%)',
                      'radial-gradient(circle at 0% 50%, #FFC300 0%, transparent 70%)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Zap className="w-6 h-6" style={{ color: '#FFC300' }} />
                    <div>
                      <h3 style={{ color: '#000000' }}>AI Quick Recruit</h3>
                      <p className="text-sm" style={{ color: '#6f6f6f' }}>
                        Get your position filled within 5 days with AI-powered recruitment
                      </p>
                    </div>
                  </div>
                  <motion.label
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <span className="text-sm" style={{ color: '#000000' }}>
                      Enable Quick Recruit
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.quickRecruit?.enabled || false}
                      onChange={(e) => setFormData({
                        ...formData,
                        quickRecruit: {
                          enabled: e.target.checked,
                          package: formData.quickRecruit?.package || 'quick'
                        }
                      })}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </motion.label>
                </div>

                {formData.quickRecruit?.enabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-2 gap-4 mt-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({
                        ...formData,
                        quickRecruit: { enabled: true, package: 'quick' }
                      })}
                      className="rounded-xl p-6 cursor-pointer transition-all relative overflow-hidden"
                      style={{
                        background: formData.quickRecruit.package === 'quick'
                          ? 'linear-gradient(135deg, #023047 0%, #000000 100%)'
                          : '#ffffff',
                        border: formData.quickRecruit.package === 'quick' 
                          ? '3px solid #FFC300' 
                          : '2px solid #d3d3d3',
                        boxShadow: formData.quickRecruit.package === 'quick' 
                          ? '0 0 30px rgba(255, 195, 0, 0.4)' 
                          : 'none'
                      }}
                    >
                      {formData.quickRecruit.package === 'quick' && (
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-5 h-5" style={{ 
                              color: formData.quickRecruit.package === 'quick' ? '#FFC300' : '#6f6f6f' 
                            }} />
                            <h4 style={{ 
                              color: formData.quickRecruit.package === 'quick' ? '#f6f6f6' : '#000000' 
                            }}>
                              Quick Recruit
                            </h4>
                          </div>
                          {formData.quickRecruit.package === 'quick' && (
                            <CheckCircle2 className="w-6 h-6" style={{ color: '#FFC300' }} />
                          )}
                        </div>
                        <div className="mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl" style={{ 
                              color: formData.quickRecruit.package === 'quick' ? '#FFC300' : '#023047' 
                            }}>
                              ₹999
                            </span>
                            <span className="text-sm" style={{ 
                              color: formData.quickRecruit.package === 'quick' ? '#d3d3d3' : '#6f6f6f' 
                            }}>
                              / position
                            </span>
                          </div>
                          <p className="text-xs mt-1" style={{ 
                            color: formData.quickRecruit.package === 'quick' ? '#FFC300' : '#FFC300' 
                          }}>
                            Fill within 3 days
                          </p>
                        </div>
                        <div className="space-y-2">
                          {[
                            'Manual Interviews to validate the profile',
                            'Scheduling the technical interview',
                            'Handover to final interview'
                          ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ 
                                color: formData.quickRecruit.package === 'quick' ? '#FFC300' : '#023047' 
                              }} />
                              <span style={{ 
                                color: formData.quickRecruit.package === 'quick' ? '#f6f6f6' : '#000000' 
                              }}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({
                        ...formData,
                        quickRecruit: { enabled: true, package: 'complete' }
                      })}
                      className="rounded-xl p-6 cursor-pointer transition-all relative overflow-hidden"
                      style={{
                        background: formData.quickRecruit.package === 'complete'
                          ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)'
                          : '#ffffff',
                        border: formData.quickRecruit.package === 'complete' 
                          ? '3px solid #023047' 
                          : '2px solid #d3d3d3',
                        boxShadow: formData.quickRecruit.package === 'complete' 
                          ? '0 0 30px rgba(255, 195, 0, 0.5)' 
                          : 'none'
                      }}
                    >
                      {formData.quickRecruit.package === 'complete' && (
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: ['rgba(2, 48, 71, 0)', 'rgba(2, 48, 71, 0.2)', 'rgba(2, 48, 71, 0)'],
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5" style={{ 
                              color: formData.quickRecruit.package === 'complete' ? '#023047' : '#6f6f6f' 
                            }} />
                            <h4 style={{ 
                              color: formData.quickRecruit.package === 'complete' ? '#000000' : '#000000' 
                            }}>
                              Complete Recruitment
                            </h4>
                          </div>
                          {formData.quickRecruit.package === 'complete' && (
                            <CheckCircle2 className="w-6 h-6" style={{ color: '#023047' }} />
                          )}
                        </div>
                        <div className="mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl" style={{ 
                              color: formData.quickRecruit.package === 'complete' ? '#023047' : '#023047' 
                            }}>
                              ₹2,499
                            </span>
                            <span className="text-sm" style={{ 
                              color: formData.quickRecruit.package === 'complete' ? '#000000' : '#6f6f6f' 
                            }}>
                              / position
                            </span>
                          </div>
                          <p className="text-xs mt-1" style={{ 
                            color: formData.quickRecruit.package === 'complete' ? '#023047' : '#FFC300' 
                          }}>
                            Fill within 5 days
                          </p>
                        </div>
                        <div className="space-y-2">
                          {[
                            'Everything in Quick Recruit',
                            'Complete Interview Process',
                            'Background Verification',
                            'Technical Interview',
                            'Task Assignment',
                            'Final Interview',
                            'Closing the Application'
                          ].map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ 
                                color: formData.quickRecruit.package === 'complete' ? '#023047' : '#023047' 
                              }} />
                              <span style={{ 
                                color: formData.quickRecruit.package === 'complete' ? '#000000' : '#000000' 
                              }}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            <div>
              <label htmlFor="description" className="block mb-2" style={{ color: '#000000' }}>
                {formData.type === 'Internship' ? 'Internship Description' : 
                 formData.type === 'Freelance' ? 'Project Description' : 
                 'Job Description'}
              </label>
              <textarea
                id="description"
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl focus:outline-none resize-none transition-all"
                style={{ border: '2px solid #d3d3d3', background: '#ffffff', color: '#000000' }}
                placeholder={
                  formData.type === 'Internship' 
                    ? 'Describe the learning opportunities, mentorship, and projects interns will work on...'
                    : formData.type === 'Freelance'
                    ? 'Describe the project scope, deliverables, timeline, and collaboration requirements...'
                    : 'Describe the role, team, and what makes this opportunity exciting...'
                }
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

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-3" style={{ color: '#000000' }}>
                  {formData.type === 'Internship' ? 'Qualifications' : 
                   formData.type === 'Freelance' ? 'Required Skills' : 
                   'Requirements'}
                </label>
                <div className="space-y-3">
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) => updateArrayField('requirements', index, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ border: '2px solid #d3d3d3', background: '#ffffff', color: '#000000' }}
                        placeholder={
                          formData.type === 'Internship' 
                            ? `e.g., Currently enrolled in relevant program`
                            : formData.type === 'Freelance'
                            ? `e.g., 3+ years experience with React`
                            : `Requirement ${index + 1}`
                        }
                        onFocus={(e) => {
                          e.target.style.borderColor = '#FFC300';
                          e.target.style.boxShadow = '0 0 10px rgba(255, 195, 0, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d3d3d3';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      {formData.requirements.length > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => removeArrayField('requirements', index)}
                          className="p-3 rounded-xl transition-colors"
                          style={{ color: '#6f6f6f', border: '2px solid #d3d3d3' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f6f6f6';
                            e.currentTarget.style.borderColor = '#6f6f6f';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = '#d3d3d3';
                          }}
                        >
                          <Minus className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={() => addArrayField('requirements')}
                    className="flex items-center gap-2 text-sm px-2"
                    style={{ color: '#FFC300' }}
                  >
                    <Plus className="w-4 h-4" />
                    Add {formData.type === 'Internship' ? 'Qualification' : formData.type === 'Freelance' ? 'Skill' : 'Requirement'}
                  </motion.button>
                </div>
              </div>

              <div>
                <label className="block mb-3" style={{ color: '#000000' }}>
                  {formData.type === 'Internship' ? 'Learning Opportunities' : 
                   formData.type === 'Freelance' ? 'Deliverables' : 
                   'Responsibilities'}
                </label>
                <div className="space-y-3">
                  {formData.responsibilities.map((resp, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={resp}
                        onChange={(e) => updateArrayField('responsibilities', index, e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ border: '2px solid #d3d3d3', background: '#ffffff', color: '#000000' }}
                        placeholder={
                          formData.type === 'Internship' 
                            ? `e.g., Work on real product features`
                            : formData.type === 'Freelance'
                            ? `e.g., Design and develop landing page`
                            : `Responsibility ${index + 1}`
                        }
                        onFocus={(e) => {
                          e.target.style.borderColor = '#FFC300';
                          e.target.style.boxShadow = '0 0 10px rgba(255, 195, 0, 0.2)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d3d3d3';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      {formData.responsibilities.length > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => removeArrayField('responsibilities', index)}
                          className="p-3 rounded-xl transition-colors"
                          style={{ color: '#6f6f6f', border: '2px solid #d3d3d3' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f6f6f6';
                            e.currentTarget.style.borderColor = '#6f6f6f';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.borderColor = '#d3d3d3';
                          }}
                        >
                          <Minus className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    onClick={() => addArrayField('responsibilities')}
                    className="flex items-center gap-2 text-sm px-2"
                    style={{ color: '#FFC300' }}
                  >
                    <Plus className="w-4 h-4" />
                    Add {formData.type === 'Internship' ? 'Learning Opportunity' : formData.type === 'Freelance' ? 'Deliverable' : 'Responsibility'}
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6" style={{ borderTop: '2px solid #d3d3d3' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="flex-1 py-4 rounded-xl transition-colors text-lg relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', color: '#f6f6f6', border: '2px solid #FFC300' }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="relative z-10">
                  {job ? 'Update Posting' : `Publish ${formData.type === 'Internship' ? 'Internship' : formData.type === 'Freelance' ? 'Gig' : 'Job'}`}
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onCancel}
                className="px-8 py-4 rounded-xl transition-colors"
                style={{ border: '2px solid #d3d3d3', color: '#000000', background: '#ffffff' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#6f6f6f';
                  e.currentTarget.style.background = '#f6f6f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#d3d3d3';
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}