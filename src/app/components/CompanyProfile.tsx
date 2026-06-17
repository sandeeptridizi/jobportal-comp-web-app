import { useState } from 'react';
import { User } from '../App';
import { Building2, Globe, MapPin, Briefcase, Save, Edit2, CheckCircle, Sparkles, TrendingUp, Phone, FileText, Clock, Calendar, Users, Linkedin, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface CompanyProfileProps {
  user: User;
  onUpdateProfile: (user: User) => void;
}

export function CompanyProfile({ user, onUpdateProfile }: CompanyProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-8 min-h-screen" style={{ background: '#f6f6f6' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6" style={{ color: '#FFC300' }} />
              <h1 style={{ color: '#000000' }}>Company Profile</h1>
            </div>
            <p style={{ color: '#6f6f6f' }}>Manage your organization's information and settings</p>
          </motion.div>
          {!isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl transition-colors relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', color: '#f6f6f6', border: '2px solid #FFC300' }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Edit2 className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Edit Profile</span>
            </motion.button>
          )}
        </div>

        {saved && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl flex items-center gap-3"
            style={{ background: 'rgba(255, 195, 0, 0.1)', border: '2px solid #FFC300' }}
          >
            <CheckCircle className="w-5 h-5" style={{ color: '#FFC300' }} />
            <p style={{ color: '#000000' }}>Profile updated successfully!</p>
          </motion.div>
        )}

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl overflow-hidden shadow-sm"
          style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
        >
          {/* Company Header */}
          <div className="p-10 text-white relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)' }}>
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
            <div className="flex items-center gap-6 relative z-10">
              <motion.div 
                className="w-24 h-24 backdrop-blur rounded-2xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                style={{ background: 'rgba(255, 195, 0, 0.2)', border: '2px solid #FFC300' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Building2 className="w-12 h-12" style={{ color: '#FFC300' }} />
              </motion.div>
              <div>
                <h2 className="mb-2" style={{ color: '#f6f6f6' }}>{formData.companyName}</h2>
                <div className="flex items-center gap-4" style={{ color: '#d3d3d3' }}>
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {formData.industry}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {formData.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="p-10">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="companyName" className="block mb-2" style={{ color: '#000000' }}>
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="text"
                    id="companyName"
                    disabled={!isEditing}
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block mb-2" style={{ color: '#000000' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  disabled
                  value={formData.email}
                  className="w-full px-4 py-3 rounded-xl"
                  style={{ border: '2px solid #d3d3d3', background: '#f6f6f6', color: '#6f6f6f' }}
                />
                <p className="text-xs mt-1" style={{ color: '#6f6f6f' }}>Email address cannot be changed</p>
              </div>

              <div>
                <label htmlFor="industry" className="block mb-2" style={{ color: '#000000' }}>
                  Industry
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="text"
                    id="industry"
                    disabled={!isEditing}
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block mb-2" style={{ color: '#000000' }}>
                  Website
                </label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="url"
                    id="website"
                    disabled={!isEditing}
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label htmlFor="location" className="block mb-2" style={{ color: '#000000' }}>
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="text"
                    id="location"
                    disabled={!isEditing}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2" style={{ color: '#000000' }}>
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="tel"
                    id="phone"
                    disabled={!isEditing}
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="linkedinUrl" className="block mb-2" style={{ color: '#000000' }}>
                  LinkedIn URL
                </label>
                <div className="relative">
                  <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="url"
                    id="linkedinUrl"
                    disabled={!isEditing}
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="linkedin.com/company/..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="gst" className="block mb-2" style={{ color: '#000000' }}>
                  GST Number
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="text"
                    id="gst"
                    disabled={!isEditing}
                    value={formData.gst || ''}
                    onChange={(e) => setFormData({ ...formData, gst: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="22AAAAA0000A1Z5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="companySize" className="block mb-2" style={{ color: '#000000' }}>
                  Company Size
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <select
                    id="companySize"
                    disabled={!isEditing}
                    value={formData.companySize || ''}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 rounded-xl focus:outline-none transition-all appearance-none"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" style={{ color: '#6f6f6f' }} />
                </div>
              </div>

              <div>
                <label htmlFor="foundedYear" className="block mb-2" style={{ color: '#000000' }}>
                  Founded Year
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="number"
                    id="foundedYear"
                    disabled={!isEditing}
                    value={formData.foundedYear || ''}
                    onChange={(e) => setFormData({ ...formData, foundedYear: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="2020"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="officeTimings" className="block mb-2" style={{ color: '#000000' }}>
                  Office Timings
                </label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="text"
                    id="officeTimings"
                    disabled={!isEditing}
                    value={formData.officeTimings || ''}
                    onChange={(e) => setFormData({ ...formData, officeTimings: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                    style={{ 
                      border: '2px solid #d3d3d3', 
                      background: isEditing ? '#ffffff' : '#f6f6f6', 
                      color: '#000000' 
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d3d3d3';
                      e.target.style.boxShadow = 'none';
                    }}
                    placeholder="9:00 AM - 6:00 PM"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="block mb-2" style={{ color: '#000000' }}>
                  <Calendar className="inline-block w-5 h-5 mr-2" style={{ color: '#6f6f6f' }} />
                  Working Days
                </label>
                {isEditing ? (
                  <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <motion.button
                        key={day}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const workingDays = formData.workingDays || [];
                          const isSelected = workingDays.includes(day);
                          setFormData({
                            ...formData,
                            workingDays: isSelected
                              ? workingDays.filter(d => d !== day)
                              : [...workingDays, day]
                          });
                        }}
                        className="py-2 px-3 rounded-lg text-sm transition-all"
                        style={{
                          background: (formData.workingDays || []).includes(day) 
                            ? 'linear-gradient(135deg, #023047 0%, #000000 100%)' 
                            : '#ffffff',
                          color: (formData.workingDays || []).includes(day) ? '#FFC300' : '#6f6f6f',
                          border: (formData.workingDays || []).includes(day) ? '2px solid #FFC300' : '2px solid #d3d3d3'
                        }}
                      >
                        {day}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {(formData.workingDays && formData.workingDays.length > 0) ? (
                      formData.workingDays.map((day) => (
                        <span
                          key={day}
                          className="py-2 px-4 rounded-lg text-sm"
                          style={{
                            background: 'linear-gradient(135deg, #023047 0%, #000000 100%)',
                            color: '#FFC300',
                            border: '2px solid #FFC300'
                          }}
                        >
                          {day}
                        </span>
                      ))
                    ) : (
                      <span style={{ color: '#6f6f6f' }}>No working days specified</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="description" className="block mb-2" style={{ color: '#000000' }}>
                Company Description
              </label>
              <textarea
                id="description"
                disabled={!isEditing}
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-xl focus:outline-none resize-none transition-all"
                placeholder="Tell candidates about your company, culture, and mission..."
                style={{ 
                  border: '2px solid #d3d3d3', 
                  background: isEditing ? '#ffffff' : '#f6f6f6', 
                  color: '#000000' 
                }}
                onFocus={(e) => {
                  if (isEditing) {
                    e.target.style.borderColor = '#FFC300';
                    e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                  }
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d3d3d3';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-6" style={{ borderTop: '2px solid #d3d3d3' }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-colors relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', color: '#f6f6f6', border: '2px solid #FFC300' }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Save className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Save Changes</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => {
                    setFormData(user);
                    setIsEditing(false);
                  }}
                  className="px-8 py-3 rounded-xl transition-colors"
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
            )}
          </form>
        </motion.div>

        {/* Additional Info Section */}
        {!isEditing && (
          <div className="mt-6 grid grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-xl p-6"
              style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
            >
              <h3 className="mb-4" style={{ color: '#000000' }}>Profile Completion</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ color: '#6f6f6f' }}>Company Information</span>
                  <span style={{ color: '#FFC300' }}>100%</span>
                </div>
                <div className="w-full rounded-full h-2" style={{ background: '#d3d3d3' }}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-2 rounded-full" 
                    style={{ background: 'linear-gradient(90deg, #023047 0%, #FFC300 100%)' }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-xl p-6"
              style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" style={{ color: '#FFC300' }} />
                <h3 style={{ color: '#000000' }}>Quick Stats</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span style={{ color: '#6f6f6f' }}>Profile Views</span>
                  <span style={{ color: '#FFC300' }}>2,456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={{ color: '#6f6f6f' }}>Member Since</span>
                  <span style={{ color: '#000000' }}>Jan 2024</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}