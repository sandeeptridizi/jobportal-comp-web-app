import { useState } from 'react';
import { Search, Filter, Star, Mail, Phone, MapPin, Briefcase, Award, TrendingUp, Eye, MessageSquare, Sparkles, Users, Calendar, Grid3x3, List, Crown, Zap, Check, X, DollarSign, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  experience: number; // years
  currentCTC: number; // in lakhs
  expectedCTC: number; // in lakhs
  skills: string[];
  education: string;
  noticePeriod: string;
  availability: string;
  profileMatch: number; // percentage
  lastActive: string;
}

// Mock candidate data
const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, Karnataka',
    jobTitle: 'Senior Full Stack Developer',
    experience: 5,
    currentCTC: 12,
    expectedCTC: 18,
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS'],
    education: 'B.Tech in Computer Science',
    noticePeriod: '30 days',
    availability: 'Immediate',
    profileMatch: 92,
    lastActive: '2 hours ago'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    phone: '+91 98765 43211',
    location: 'Mumbai, Maharashtra',
    jobTitle: 'UI/UX Designer',
    experience: 4,
    currentCTC: 10,
    expectedCTC: 15,
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Design Systems', 'Prototyping'],
    education: 'B.Des in Visual Communication',
    noticePeriod: '15 days',
    availability: 'Available',
    profileMatch: 88,
    lastActive: '1 hour ago'
  },
  {
    id: '3',
    name: 'Amit Kumar',
    email: 'amit.kumar@email.com',
    phone: '+91 98765 43212',
    location: 'Pune, Maharashtra',
    jobTitle: 'Data Scientist',
    experience: 6,
    currentCTC: 15,
    expectedCTC: 22,
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Data Analysis'],
    education: 'M.Tech in Data Science',
    noticePeriod: '60 days',
    availability: 'Serving Notice',
    profileMatch: 95,
    lastActive: '30 minutes ago'
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    phone: '+91 98765 43213',
    location: 'Hyderabad, Telangana',
    jobTitle: 'Product Manager',
    experience: 7,
    currentCTC: 18,
    expectedCTC: 25,
    skills: ['Product Strategy', 'Agile', 'User Research', 'Roadmapping', 'Analytics'],
    education: 'MBA + B.Tech',
    noticePeriod: '90 days',
    availability: 'Currently Employed',
    profileMatch: 90,
    lastActive: '3 hours ago'
  },
  {
    id: '5',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 98765 43214',
    location: 'Delhi, NCR',
    jobTitle: 'DevOps Engineer',
    experience: 5,
    currentCTC: 14,
    expectedCTC: 20,
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'CI/CD'],
    education: 'B.Tech in IT',
    noticePeriod: '30 days',
    availability: 'Available',
    profileMatch: 87,
    lastActive: '5 hours ago'
  },
  {
    id: '6',
    name: 'Anjali Mehta',
    email: 'anjali.mehta@email.com',
    phone: '+91 98765 43215',
    location: 'Chennai, Tamil Nadu',
    jobTitle: 'Business Analyst',
    experience: 4,
    currentCTC: 11,
    expectedCTC: 16,
    skills: ['SQL', 'Power BI', 'Excel', 'Business Intelligence', 'Stakeholder Management'],
    education: 'B.Tech + MBA',
    noticePeriod: '45 days',
    availability: 'Negotiable',
    profileMatch: 85,
    lastActive: '1 day ago'
  },
  {
    id: '7',
    name: 'Karthik Iyer',
    email: 'karthik.iyer@email.com',
    phone: '+91 98765 43216',
    location: 'Bangalore, Karnataka',
    jobTitle: 'Mobile App Developer',
    experience: 3,
    currentCTC: 8,
    expectedCTC: 12,
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
    education: 'B.E in Computer Science',
    noticePeriod: 'Immediate',
    availability: 'Immediate',
    profileMatch: 93,
    lastActive: '4 hours ago'
  },
  {
    id: '8',
    name: 'Neha Gupta',
    email: 'neha.gupta@email.com',
    phone: '+91 98765 43217',
    location: 'Noida, UP',
    jobTitle: 'QA Automation Engineer',
    experience: 5,
    currentCTC: 10,
    expectedCTC: 14,
    skills: ['Selenium', 'Automation Testing', 'Java', 'TestNG', 'API Testing'],
    education: 'B.Tech in CSE',
    noticePeriod: '30 days',
    availability: 'Available',
    profileMatch: 86,
    lastActive: '6 hours ago'
  }
];

export function RecruiterDatabase() {
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showUpgradePlan, setShowUpgradePlan] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Advanced Filters
  const [filters, setFilters] = useState({
    skills: [] as string[],
    locations: [] as string[],
    jobTitle: '',
    minExperience: 0,
    maxExperience: 15,
    minCurrentCTC: 0,
    maxCurrentCTC: 50,
    minExpectedCTC: 0,
    maxExpectedCTC: 50,
  });

  const allSkills = Array.from(new Set(candidates.flatMap(c => c.skills)));
  const allLocations = Array.from(new Set(candidates.map(c => c.location)));
  const allJobTitles = Array.from(new Set(candidates.map(c => c.jobTitle)));

  const toggleSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleLocation = (location: string) => {
    setFilters(prev => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter(l => l !== location)
        : [...prev.locations, location]
    }));
  };

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      candidate.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply all filters
    const matchesSkills = filters.skills.length === 0 || 
      filters.skills.some(skill => candidate.skills.includes(skill));
    const matchesLocation = filters.locations.length === 0 || 
      filters.locations.includes(candidate.location);
    const matchesJobTitle = !filters.jobTitle || 
      candidate.jobTitle.toLowerCase().includes(filters.jobTitle.toLowerCase());
    const matchesExperience = candidate.experience >= filters.minExperience && 
      candidate.experience <= filters.maxExperience;
    const matchesCurrentCTC = candidate.currentCTC >= filters.minCurrentCTC && 
      candidate.currentCTC <= filters.maxCurrentCTC;
    const matchesExpectedCTC = candidate.expectedCTC >= filters.minExpectedCTC && 
      candidate.expectedCTC <= filters.maxExpectedCTC;
    
    return matchesSearch && matchesSkills && matchesLocation && matchesJobTitle && 
           matchesExperience && matchesCurrentCTC && matchesExpectedCTC;
  });

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setFilters({
      skills: [],
      locations: [],
      jobTitle: '',
      minExperience: 0,
      maxExperience: 15,
      minCurrentCTC: 0,
      maxCurrentCTC: 50,
      minExpectedCTC: 0,
      maxExpectedCTC: 50,
    });
  };

  return (
    <div className="h-screen flex flex-col" style={{ background: '#f6f6f6' }}>
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="p-8 border-b"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #023047 100%)',
          borderColor: 'rgba(255, 195, 0, 0.2)',
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                boxShadow: '0 0 30px rgba(255, 195, 0, 0.5)',
              }}
              animate={{
                boxShadow: [
                  '0 0 30px rgba(255, 195, 0, 0.5)',
                  '0 0 40px rgba(255, 195, 0, 0.7)',
                  '0 0 30px rgba(255, 195, 0, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Users className="w-8 h-8" style={{ color: '#000000' }} />
            </motion.div>
            <div>
              <h1 className="text-3xl mb-1" style={{ color: '#f6f6f6' }}>Candidate Database</h1>
              <p className="text-sm" style={{ color: '#FFC300' }}>
                Browse {candidates.length} qualified candidates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <motion.div
              className="px-6 py-3 rounded-xl"
              style={{
                background: 'rgba(255, 195, 0, 0.15)',
                border: '2px solid rgba(255, 195, 0, 0.3)',
              }}
            >
              <p className="text-sm" style={{ color: '#FFC300' }}>
                <span className="text-2xl font-bold block" style={{ color: '#f6f6f6' }}>
                  {candidates.reduce((sum, c) => sum + c.profileMatch, 0) / candidates.length}%
                </span>
                Avg Match Score
              </p>
            </motion.div>

            {/* Upgrade Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUpgradePlan(true)}
              className="px-6 py-3 rounded-xl flex items-center gap-2 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                color: '#000000',
                boxShadow: '0 4px 20px rgba(255, 195, 0, 0.4)',
              }}
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crown className="w-5 h-5" />
              </motion.div>
              <span className="font-semibold">Upgrade Plan</span>
            </motion.button>
          </div>
        </div>

        {/* Search, Filters, and View Toggle */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
            <input
              type="text"
              placeholder="Search by name, job title, skills, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl"
              style={{
                background: '#ffffff',
                border: '2px solid #e0e0e0',
                color: '#000000',
              }}
            />
          </div>
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(true)}
              className="pl-12 pr-6 py-3.5 rounded-xl flex items-center gap-2 relative"
              style={{
                background: '#ffffff',
                border: '2px solid #e0e0e0',
                color: '#000000',
                minWidth: '220px',
              }}
            >
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
              <span className="flex-1 text-left">Apply Filters</span>
              {(filters.skills.length > 0 || filters.locations.length > 0 || filters.jobTitle ||
                filters.minExperience > 0 || filters.minCurrentCTC > 0 || filters.minExpectedCTC > 0) && (
                <motion.div
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    background: '#FFC300',
                    color: '#000000',
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Active
                </motion.div>
              )}
            </motion.button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 p-1 rounded-xl" style={{ background: '#ffffff', border: '2px solid #e0e0e0' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              style={{
                background: viewMode === 'list' 
                  ? 'linear-gradient(135deg, #023047 0%, #000000 100%)'
                  : 'transparent',
                color: viewMode === 'list' ? '#FFC300' : '#6f6f6f',
              }}
            >
              <List className="w-5 h-5" />
              <span className="text-sm font-medium">List</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
              style={{
                background: viewMode === 'grid' 
                  ? 'linear-gradient(135deg, #023047 0%, #000000 100%)'
                  : 'transparent',
                color: viewMode === 'grid' ? '#FFC300' : '#6f6f6f',
              }}
            >
              <Grid3x3 className="w-5 h-5" />
              <span className="text-sm font-medium">Grid</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Candidates List/Grid */}
        <div 
          className={viewMode === 'list' ? 'w-2/5 border-r overflow-y-auto' : 'flex-1 overflow-y-auto'}
          style={{ borderColor: '#e0e0e0', background: '#ffffff' }}
        >
          <div className={viewMode === 'list' ? 'p-6 space-y-3' : 'p-6'}>
            {viewMode === 'list' ? (
              // List View
              filteredCandidates.map((candidate, index) => (
                <motion.div
                  key={candidate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedCandidate(candidate)}
                  className="p-5 rounded-2xl cursor-pointer transition-all relative overflow-hidden"
                  style={{
                    background: selectedCandidate?.id === candidate.id 
                      ? 'linear-gradient(135deg, #023047 0%, #000000 100%)'
                      : 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                    border: selectedCandidate?.id === candidate.id 
                      ? '2px solid #FFC300'
                      : '2px solid #e0e0e0',
                    boxShadow: selectedCandidate?.id === candidate.id 
                      ? '0 4px 20px rgba(255, 195, 0, 0.3)'
                      : '0 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  {selectedCandidate?.id === candidate.id && (
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.1)', 'rgba(255, 195, 0, 0)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: selectedCandidate?.id === candidate.id 
                          ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)'
                          : 'linear-gradient(135deg, #023047 0%, #034F73 100%)',
                        color: selectedCandidate?.id === candidate.id ? '#000000' : '#FFC300',
                      }}
                    >
                      <Sparkles className="w-7 h-7" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold mb-1 truncate"
                        style={{
                          color: selectedCandidate?.id === candidate.id ? '#f6f6f6' : '#000000',
                        }}
                      >
                        {candidate.name}
                      </h3>
                      <p
                        className="text-sm mb-2 truncate"
                        style={{
                          color: selectedCandidate?.id === candidate.id ? '#FFC300' : '#6f6f6f',
                        }}
                      >
                        {candidate.jobTitle}
                      </p>
                      
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" style={{ color: '#FFC300' }} />
                          <span style={{ color: selectedCandidate?.id === candidate.id ? '#f6f6f6' : '#000000' }}>
                            {candidate.profileMatch}% Match
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-1"
                          style={{ color: selectedCandidate?.id === candidate.id ? '#d3d3d3' : '#6f6f6f' }}
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{candidate.experience} yrs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Grid View
              <div className="grid grid-cols-3 gap-6">
                {filteredCandidates.map((candidate, index) => (
                  <motion.div
                    key={candidate.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedCandidate(candidate)}
                    className="p-6 rounded-3xl cursor-pointer transition-all relative overflow-hidden"
                    style={{
                      background: selectedCandidate?.id === candidate.id 
                        ? 'linear-gradient(135deg, #023047 0%, #000000 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                      border: selectedCandidate?.id === candidate.id 
                        ? '2px solid #FFC300'
                        : '2px solid #e0e0e0',
                      boxShadow: selectedCandidate?.id === candidate.id 
                        ? '0 6px 25px rgba(255, 195, 0, 0.3)'
                        : '0 2px 10px rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    {selectedCandidate?.id === candidate.id && (
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.1)', 'rgba(255, 195, 0, 0)'],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}

                    <div className="relative z-10 text-center">
                      <div
                        className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{
                          background: selectedCandidate?.id === candidate.id 
                            ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)'
                            : 'linear-gradient(135deg, #023047 0%, #034F73 100%)',
                          color: selectedCandidate?.id === candidate.id ? '#000000' : '#FFC300',
                        }}
                      >
                        <Sparkles className="w-10 h-10" />
                      </div>

                      <h3
                        className="font-semibold mb-1"
                        style={{
                          color: selectedCandidate?.id === candidate.id ? '#f6f6f6' : '#000000',
                        }}
                      >
                        {candidate.name}
                      </h3>
                      <p
                        className="text-sm mb-3"
                        style={{
                          color: selectedCandidate?.id === candidate.id ? '#FFC300' : '#6f6f6f',
                        }}
                      >
                        {candidate.jobTitle}
                      </p>

                      <div className="flex items-center justify-center gap-4 text-xs mb-3">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" style={{ color: '#FFC300' }} />
                          <span style={{ color: selectedCandidate?.id === candidate.id ? '#f6f6f6' : '#000000' }}>
                            {candidate.profileMatch}%
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-1"
                          style={{ color: selectedCandidate?.id === candidate.id ? '#d3d3d3' : '#6f6f6f' }}
                        >
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{candidate.experience} yrs</span>
                        </div>
                      </div>

                      <div
                        className="text-xs px-3 py-1.5 rounded-lg inline-flex items-center gap-1"
                        style={{
                          background: selectedCandidate?.id === candidate.id 
                            ? 'rgba(255, 195, 0, 0.2)'
                            : 'rgba(2, 48, 71, 0.1)',
                          color: selectedCandidate?.id === candidate.id ? '#FFC300' : '#023047',
                        }}
                      >
                        <MapPin className="w-3 h-3" />
                        <span>{candidate.location.split(',')[0]}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Candidate Details - Only show in List View */}
        {viewMode === 'list' && (
          <div className="flex-1 overflow-y-auto">
            {selectedCandidate ? (
              <div className="p-8 space-y-6">
                {/* Profile Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-3xl p-8 relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #000000 0%, #023047 100%)',
                    border: '2px solid #FFC300',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                      background: [
                        'radial-gradient(circle at 20% 50%, #FFC300 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 50%, #FFC300 0%, transparent 50%)',
                        'radial-gradient(circle at 20% 50%, #FFC300 0%, transparent 50%)',
                      ],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  <div className="relative z-10 flex items-start gap-6">
                    <motion.div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 30px rgba(255, 195, 0, 0.5)',
                          '0 0 40px rgba(255, 195, 0, 0.8)',
                          '0 0 30px rgba(255, 195, 0, 0.5)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-12 h-12" style={{ color: '#000000' }} />
                    </motion.div>

                    <div className="flex-1">
                      <h2 className="text-2xl mb-2" style={{ color: '#f6f6f6' }}>
                        {selectedCandidate.name}
                      </h2>
                      <p className="text-base mb-4" style={{ color: '#FFC300' }}>
                        {selectedCandidate.jobTitle}
                      </p>

                      <div className="flex items-center gap-6 mb-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" style={{ color: '#FFC300' }} />
                          <span className="text-lg" style={{ color: '#f6f6f6' }}>
                            {selectedCandidate.profileMatch}% Match
                          </span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: '#d3d3d3' }}>
                          <Briefcase className="w-5 h-5" />
                          <span>{selectedCandidate.experience} Years Experience</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 rounded-xl flex items-center gap-2 relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                            color: '#000000',
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span className="font-semibold">Contact</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 rounded-xl flex items-center gap-2"
                          style={{
                            background: 'rgba(255, 195, 0, 0.15)',
                            border: '2px solid rgba(255, 195, 0, 0.3)',
                            color: '#FFC300',
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          <span className="font-semibold">View Resume</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Current CTC', value: `₹${selectedCandidate.currentCTC}L`, icon: DollarSign, color: '#FFC300' },
                    { label: 'Expected CTC', value: `₹${selectedCandidate.expectedCTC}L`, icon: TrendingUp, color: '#023047' },
                    { label: 'Notice Period', value: selectedCandidate.noticePeriod, icon: Calendar, color: '#FFC300' },
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-2xl p-5 text-center"
                        style={{
                          background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                          border: `2px solid ${stat.color}30`,
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                          style={{
                            background: `${stat.color}15`,
                            color: stat.color,
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <p className="text-2xl font-bold mb-1" style={{ color: '#000000' }}>
                          {stat.value}
                        </p>
                        <p className="text-xs" style={{ color: '#6f6f6f' }}>
                          {stat.label}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-3xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#000000' }}>
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    {[
                      { icon: Mail, label: 'Email', value: selectedCandidate.email, color: '#023047' },
                      { icon: Phone, label: 'Phone', value: selectedCandidate.phone, color: '#FFC300' },
                      { icon: MapPin, label: 'Location', value: selectedCandidate.location, color: '#023047' },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: `${item.color}15`,
                              color: item.color,
                            }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs mb-0.5" style={{ color: '#6f6f6f' }}>
                              {item.label}
                            </p>
                            <p className="text-sm font-medium" style={{ color: '#000000' }}>
                              {item.value}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Skills */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-3xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#000000' }}>
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCandidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-lg text-sm font-medium"
                        style={{
                          background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                          color: '#000000',
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="rounded-3xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  <h3 className="text-lg font-semibold mb-4" style={{ color: '#000000' }}>
                    Additional Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs mb-1" style={{ color: '#6f6f6f' }}>Education</p>
                      <p className="text-sm font-medium" style={{ color: '#000000' }}>
                        {selectedCandidate.education}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs mb-1" style={{ color: '#6f6f6f' }}>Availability</p>
                      <p className="text-sm font-medium" style={{ color: '#000000' }}>
                        {selectedCandidate.availability}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 195, 0, 0.15) 0%, rgba(2, 48, 71, 0.15) 100%)',
                      border: '2px solid rgba(255, 195, 0, 0.3)',
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Users className="w-12 h-12" style={{ color: '#FFC300' }} />
                  </motion.div>
                  <h3 className="text-xl mb-2" style={{ color: '#000000' }}>
                    Select a Candidate
                  </h3>
                  <p className="text-sm" style={{ color: '#6f6f6f' }}>
                    Choose a candidate from the list to view their profile
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Upgrade Plan Modal */}
      <AnimatePresence>
        {showUpgradePlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.9)' }}
            onClick={() => setShowUpgradePlan(false)}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 4 + 2,
                    height: Math.random() * 4 + 2,
                    background: i % 2 === 0 ? '#FFC300' : '#023047',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #000000 0%, #023047 50%, #000000 100%)',
                border: '2px solid #FFC300',
              }}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowUpgradePlan(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-20"
                style={{
                  background: 'rgba(255, 195, 0, 0.2)',
                  border: '2px solid #FFC300',
                  color: '#FFC300',
                }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 195, 0, 0.2), transparent 70%)',
                }}
              />

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                    }}
                    animate={{
                      boxShadow: [
                        '0 0 30px rgba(255, 195, 0, 0.5)',
                        '0 0 50px rgba(255, 195, 0, 0.8)',
                        '0 0 30px rgba(255, 195, 0, 0.5)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Crown className="w-10 h-10" style={{ color: '#000000' }} />
                  </motion.div>
                  <h2 className="text-3xl mb-2" style={{ color: '#f6f6f6' }}>
                    Unlock Premium Candidate Access
                  </h2>
                  <p className="text-base" style={{ color: '#d3d3d3' }}>
                    Get unlimited access to top talent and advanced hiring tools
                  </p>
                </div>

                {/* Plans Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Elite Plan */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-3xl p-8 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #023047 0%, #034F73 100%)',
                      border: '2px solid #FFC300',
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        background: [
                          'radial-gradient(circle at 30% 50%, #FFC300 0%, transparent 50%)',
                          'radial-gradient(circle at 70% 50%, #FFC300 0%, transparent 50%)',
                          'radial-gradient(circle at 30% 50%, #FFC300 0%, transparent 50%)',
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Zap className="w-6 h-6" style={{ color: '#FFC300' }} />
                        <h3 className="text-2xl" style={{ color: '#f6f6f6' }}>Elite</h3>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-4xl" style={{ color: '#FFC300' }}>₹2,999</span>
                          <span className="text-sm mb-2" style={{ color: '#d3d3d3' }}>/month</span>
                        </div>
                        <p className="text-sm" style={{ color: '#d3d3d3' }}>
                          Perfect for growing companies
                        </p>
                      </div>

                      <div className="space-y-3 mb-6">
                        {[
                          'Access to 100+ candidates',
                          'Direct messaging',
                          'Profile match insights',
                          'Priority support',
                          'Monthly hiring reports'
                        ].map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#FFC300' }} />
                            <span className="text-sm" style={{ color: '#f6f6f6' }}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-xl font-semibold"
                        style={{
                          background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                          color: '#000000',
                        }}
                      >
                        Choose Elite
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Pro Plan */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-3xl p-8 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                      border: '2px solid #023047',
                      boxShadow: '0 0 40px rgba(255, 195, 0, 0.5)',
                    }}
                  >
                    {/* Popular Badge */}
                    <motion.div
                      className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: '#023047',
                        color: '#FFC300',
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      MOST POPULAR
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 opacity-10"
                      animate={{
                        background: [
                          'radial-gradient(circle at 30% 50%, #023047 0%, transparent 50%)',
                          'radial-gradient(circle at 70% 50%, #023047 0%, transparent 50%)',
                          'radial-gradient(circle at 30% 50%, #023047 0%, transparent 50%)',
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <Crown className="w-6 h-6" style={{ color: '#023047' }} />
                        <h3 className="text-2xl" style={{ color: '#000000' }}>Pro</h3>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-end gap-2 mb-1">
                          <span className="text-4xl" style={{ color: '#023047' }}>₹3,999</span>
                          <span className="text-sm mb-2" style={{ color: '#000000' }}>/month</span>
                        </div>
                        <p className="text-sm" style={{ color: '#000000' }}>
                          For enterprises seeking excellence
                        </p>
                      </div>

                      <div className="space-y-3 mb-6">
                        {[
                          'Unlimited candidate access',
                          'Video interviews',
                          'AI-powered matching',
                          'Dedicated account manager',
                          'Advanced analytics',
                          'Custom integrations'
                        ].map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Check className="w-5 h-5 flex-shrink-0" style={{ color: '#023047' }} />
                            <span className="text-sm font-medium" style={{ color: '#000000' }}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-3 rounded-xl font-semibold relative overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #023047 0%, #000000 100%)',
                          color: '#FFC300',
                        }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255, 195, 0, 0.3), transparent)',
                          }}
                        />
                        <span className="relative z-10">Choose Pro</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>

                {/* Footer Note */}
                <p className="text-center text-sm" style={{ color: '#6f6f6f' }}>
                  All plans include a 14-day money-back guarantee • Cancel anytime
                </p>
              </div>

              {/* Decorative Line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(90deg, transparent, #FFC300, transparent)',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters Modal */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.9)' }}
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-y-auto rounded-3xl shadow-2xl max-h-[90vh]"
              style={{
                background: 'linear-gradient(135deg, #000000 0%, #023047 50%, #000000 100%)',
                border: '2px solid #FFC300',
              }}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowFilters(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-20"
                style={{
                  background: 'rgba(255, 195, 0, 0.2)',
                  border: '2px solid #FFC300',
                  color: '#FFC300',
                }}
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="relative z-10 p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                      }}
                    >
                      <Filter className="w-6 h-6" style={{ color: '#000000' }} />
                    </div>
                    <div>
                      <h2 className="text-2xl" style={{ color: '#f6f6f6' }}>
                        Advanced Filters
                      </h2>
                      <p className="text-sm" style={{ color: '#d3d3d3' }}>
                        Find the perfect candidate
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-8">
                  {/* Job Title */}
                  <div>
                    <label className="block text-sm mb-2" style={{ color: '#f6f6f6' }}>Job Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Full Stack Developer"
                      value={filters.jobTitle}
                      onChange={(e) => setFilters(prev => ({ ...prev, jobTitle: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl"
                      style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 195, 0, 0.3)', color: '#f6f6f6' }}
                    />
                  </div>

                  {/* Experience Range */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#f6f6f6' }}>Min Experience: <span style={{ color: '#FFC300' }}>{filters.minExperience} yrs</span></label>
                      <input type="range" min="0" max="15" value={filters.minExperience} onChange={(e) => setFilters(prev => ({ ...prev, minExperience: parseInt(e.target.value) }))} className="w-full" style={{ accentColor: '#FFC300' }} />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#f6f6f6' }}>Max Experience: <span style={{ color: '#FFC300' }}>{filters.maxExperience} yrs</span></label>
                      <input type="range" min="0" max="15" value={filters.maxExperience} onChange={(e) => setFilters(prev => ({ ...prev, maxExperience: parseInt(e.target.value) }))} className="w-full" style={{ accentColor: '#FFC300' }} />
                    </div>
                  </div>

                  {/* CTC Ranges */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#f6f6f6' }}>Current CTC: <span style={{ color: '#FFC300' }}>₹{filters.minCurrentCTC}L - ₹{filters.maxCurrentCTC}L</span></label>
                      <div className="flex gap-2">
                        <input type="number" placeholder="Min" value={filters.minCurrentCTC} onChange={(e) => setFilters(prev => ({ ...prev, minCurrentCTC: parseInt(e.target.value) || 0 }))} className="w-1/2 px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 195, 0, 0.3)', color: '#f6f6f6' }} />
                        <input type="number" placeholder="Max" value={filters.maxCurrentCTC} onChange={(e) => setFilters(prev => ({ ...prev, maxCurrentCTC: parseInt(e.target.value) || 50 }))} className="w-1/2 px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 195, 0, 0.3)', color: '#f6f6f6' }} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: '#f6f6f6' }}>Expected CTC: <span style={{ color: '#FFC300' }}>₹{filters.minExpectedCTC}L - ₹{filters.maxExpectedCTC}L</span></label>
                      <div className="flex gap-2">
                        <input type="number" placeholder="Min" value={filters.minExpectedCTC} onChange={(e) => setFilters(prev => ({ ...prev, minExpectedCTC: parseInt(e.target.value) || 0 }))} className="w-1/2 px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 195, 0, 0.3)', color: '#f6f6f6' }} />
                        <input type="number" placeholder="Max" value={filters.maxExpectedCTC} onChange={(e) => setFilters(prev => ({ ...prev, maxExpectedCTC: parseInt(e.target.value) || 50 }))} className="w-1/2 px-3 py-2 rounded-lg text-sm" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '2px solid rgba(255, 195, 0, 0.3)', color: '#f6f6f6' }} />
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="block text-sm mb-3" style={{ color: '#f6f6f6' }}>Skills {filters.skills.length > 0 && <span style={{ color: '#FFC300' }}>({filters.skills.length})</span>}</label>
                    <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
                      {allSkills.map((skill) => (
                        <motion.button
                          key={skill}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleSkill(skill)}
                          className="px-3 py-2 rounded-lg text-sm"
                          style={{
                            background: filters.skills.includes(skill) ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)' : 'rgba(255, 255, 255, 0.1)',
                            border: `2px solid ${filters.skills.includes(skill) ? '#FFC300' : 'rgba(255, 195, 0, 0.3)'}`,
                            color: filters.skills.includes(skill) ? '#000000' : '#f6f6f6',
                          }}
                        >
                          {skill}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Locations */}
                  <div>
                    <label className="block text-sm mb-3" style={{ color: '#f6f6f6' }}>Locations {filters.locations.length > 0 && <span style={{ color: '#FFC300' }}>({filters.locations.length})</span>}</label>
                    <div className="grid grid-cols-3 gap-2">
                      {allLocations.map((location) => (
                        <motion.button
                          key={location}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleLocation(location)}
                          className="px-3 py-2 rounded-lg text-sm"
                          style={{
                            background: filters.locations.includes(location) ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)' : 'rgba(255, 255, 255, 0.1)',
                            border: `2px solid ${filters.locations.includes(location) ? '#FFC300' : 'rgba(255, 195, 0, 0.3)'}`,
                            color: filters.locations.includes(location) ? '#000000' : '#f6f6f6',
                          }}
                        >
                          {location.split(',')[0]}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleResetFilters}
                    className="flex-1 px-6 py-3 rounded-xl"
                    style={{ background: 'transparent', border: '2px solid #6f6f6f', color: '#d3d3d3' }}
                  >
                    Reset
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApplyFilters}
                    className="flex-1 px-6 py-3 rounded-xl font-semibold"
                    style={{ background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)', color: '#000000' }}
                  >
                    Apply ({filteredCandidates.length})
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
