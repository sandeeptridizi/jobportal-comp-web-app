import { useState } from 'react';
import { Applicant, Message, Job } from '../App';
import { Send, Search, Briefcase, GraduationCap, Code, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatViewProps {
  applicants: Applicant[];
  messages: Message[];
  selectedApplicant: Applicant | null;
  onSelectApplicant: (applicant: Applicant) => void;
  onSendMessage: (applicantId: string, text: string) => void;
  jobs: Job[];
}

export function ChatView({
  applicants,
  messages,
  selectedApplicant,
  onSelectApplicant,
  onSendMessage,
  jobs
}: ChatViewProps) {
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'jobs' | 'internships' | 'freelance'>('all');

  const applicantsWithMessages = applicants.filter(applicant =>
    messages.some(m => m.applicantId === applicant.id)
  );

  // Get job type for an applicant
  const getJobType = (applicantJobId: string): Job['type'] | null => {
    const job = jobs.find(j => j.id === applicantJobId);
    return job ? job.type : null;
  };

  // Filter by category
  const categoryFilteredApplicants = applicantsWithMessages.filter(applicant => {
    const jobType = getJobType(applicant.jobId);
    if (!jobType) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'jobs') return jobType === 'Full-time' || jobType === 'Part-time';
    if (selectedCategory === 'internships') return jobType === 'Internship';
    if (selectedCategory === 'freelance') return jobType === 'Freelance';
    return false;
  });

  const filteredApplicants = categoryFilteredApplicants.filter(applicant =>
    applicant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get counts for each category
  const getCategoryCount = (category: 'all' | 'jobs' | 'internships' | 'freelance'): number => {
    if (category === 'all') return applicantsWithMessages.length;
    
    return applicantsWithMessages.filter(applicant => {
      const jobType = getJobType(applicant.jobId);
      if (!jobType) return false;
      
      if (category === 'jobs') return jobType === 'Full-time' || jobType === 'Part-time';
      if (category === 'internships') return jobType === 'Internship';
      if (category === 'freelance') return jobType === 'Freelance';
      return false;
    }).length;
  };

  const currentMessages = selectedApplicant
    ? messages.filter(m => m.applicantId === selectedApplicant.id)
    : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() && selectedApplicant) {
      onSendMessage(selectedApplicant.id, messageText);
      setMessageText('');
    }
  };

  const getLastMessage = (applicantId: string) => {
    const applicantMessages = messages.filter(m => m.applicantId === applicantId);
    return applicantMessages[applicantMessages.length - 1];
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen flex" style={{ background: '#f6f6f6' }}>
      {/* Left Side - Conversations List */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 bg-white border-r flex flex-col"
        style={{ borderColor: '#d3d3d3' }}
      >
        {/* Header with AI Glow Effect */}
        <div className="p-6 border-b relative overflow-hidden" style={{ borderColor: '#d3d3d3', background: 'linear-gradient(135deg, #000000 0%, #023047 100%)' }}>
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, #FFC300 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, #FFC300 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, #FFC300 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6" style={{ color: '#FFC300' }} />
              <h1 style={{ color: '#f6f6f6' }}>AI Messages</h1>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                style={{ 
                  border: '2px solid #d3d3d3',
                  background: '#ffffff',
                  color: '#000000'
                }}
                onFocus={(e) => e.target.style.borderColor = '#FFC300'}
                onBlur={(e) => e.target.style.borderColor = '#d3d3d3'}
              />
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('all')}
                className="flex-shrink-0 px-4 py-2.5 rounded-full font-medium transition-all relative overflow-hidden"
                style={{
                  background: selectedCategory === 'all' ? '#6f6f6f' : '#ffffff',
                  color: selectedCategory === 'all' ? '#f6f6f6' : '#000000',
                  border: `2px solid ${selectedCategory === 'all' ? '#6f6f6f' : '#d3d3d3'}`
                }}
              >
                {selectedCategory === 'all' && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="flex items-center gap-2 relative z-10">
                  All <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: selectedCategory === 'all' ? '#FFC300' : '#d3d3d3', color: '#000000' }}>{getCategoryCount('all')}</span>
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('jobs')}
                className="flex-shrink-0 px-4 py-2.5 rounded-full font-medium transition-all relative overflow-hidden"
                style={{
                  background: selectedCategory === 'jobs' ? '#023047' : '#ffffff',
                  color: selectedCategory === 'jobs' ? '#f6f6f6' : '#023047',
                  border: `2px solid ${selectedCategory === 'jobs' ? '#023047' : '#d3d3d3'}`
                }}
              >
                {selectedCategory === 'jobs' && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="flex items-center gap-2 relative z-10">
                  <Briefcase className="w-4 h-4" />
                  Jobs
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: selectedCategory === 'jobs' ? '#FFC300' : '#d3d3d3', color: '#000000' }}>{getCategoryCount('jobs')}</span>
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('internships')}
                className="flex-shrink-0 px-4 py-2.5 rounded-full font-medium transition-all relative overflow-hidden"
                style={{
                  background: selectedCategory === 'internships' ? '#023047' : '#ffffff',
                  color: selectedCategory === 'internships' ? '#f6f6f6' : '#023047',
                  border: `2px solid ${selectedCategory === 'internships' ? '#023047' : '#d3d3d3'}`
                }}
              >
                {selectedCategory === 'internships' && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="flex items-center gap-2 relative z-10">
                  <GraduationCap className="w-4 h-4" />
                  Interns
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: selectedCategory === 'internships' ? '#FFC300' : '#d3d3d3', color: '#000000' }}>{getCategoryCount('internships')}</span>
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory('freelance')}
                className="flex-shrink-0 px-4 py-2.5 rounded-full font-medium transition-all relative overflow-hidden"
                style={{
                  background: selectedCategory === 'freelance' ? '#023047' : '#ffffff',
                  color: selectedCategory === 'freelance' ? '#f6f6f6' : '#023047',
                  border: `2px solid ${selectedCategory === 'freelance' ? '#023047' : '#d3d3d3'}`
                }}
              >
                {selectedCategory === 'freelance' && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="flex items-center gap-2 relative z-10">
                  <Code className="w-4 h-4" />
                  Freelance
                  <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: selectedCategory === 'freelance' ? '#FFC300' : '#d3d3d3', color: '#000000' }}>{getCategoryCount('freelance')}</span>
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filteredApplicants.length > 0 ? (
              filteredApplicants.map((applicant, index) => {
                const lastMessage = getLastMessage(applicant.id);
                const isSelected = selectedApplicant?.id === applicant.id;
                return (
                  <motion.div
                    key={applicant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onSelectApplicant(applicant)}
                    className="p-5 border-b cursor-pointer transition-all relative"
                    style={{
                      borderColor: '#d3d3d3',
                      background: isSelected ? 'linear-gradient(90deg, #FFC300 0%, #FFC300 4px, #f6f6f6 4px)' : 'transparent'
                    }}
                    whileHover={{ x: 5, background: isSelected ? 'linear-gradient(90deg, #FFC300 0%, #FFC300 4px, #f6f6f6 4px)' : '#f6f6f6' }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0 relative overflow-hidden"
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
                        <span className="relative z-10">{applicant.name.charAt(0).toUpperCase()}</span>
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="truncate" style={{ color: '#000000' }}>{applicant.name}</p>
                          {lastMessage && (
                            <span className="text-xs" style={{ color: '#6f6f6f' }}>
                              {formatTime(lastMessage.timestamp)}
                            </span>
                          )}
                        </div>
                        {lastMessage && (
                          <p className="text-sm truncate" style={{ color: '#6f6f6f' }}>
                            {lastMessage.senderType === 'company' ? 'You: ' : ''}
                            {lastMessage.text}
                          </p>
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
                className="flex items-center justify-center h-full"
              >
                <div className="text-center p-8">
                  <Zap className="w-16 h-16 mx-auto mb-4" style={{ color: '#FFC300' }} />
                  <p style={{ color: '#6f6f6f' }}>No conversations yet</p>
                  <p className="text-sm mt-2" style={{ color: '#d3d3d3' }}>Start chatting with applicants</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right Side - Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedApplicant ? (
          <>
            {/* Chat Header */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="border-b px-8 py-6 relative overflow-hidden"
              style={{ borderColor: '#d3d3d3', background: 'linear-gradient(135deg, #000000 0%, #023047 100%)' }}
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
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="flex items-center gap-4 relative z-10">
                <motion.div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #FFC300 0%, #023047 100%)' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', 'radial-gradient(circle, transparent 0%, transparent 70%)'],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="relative z-10">{selectedApplicant.name.charAt(0).toUpperCase()}</span>
                </motion.div>
                <div>
                  <h3 style={{ color: '#f6f6f6' }}>{selectedApplicant.name}</h3>
                  <p className="text-sm" style={{ color: '#d3d3d3' }}>{selectedApplicant.email}</p>
                </div>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8" style={{ background: '#f6f6f6' }}>
              <div className="max-w-4xl mx-auto space-y-6">
                <AnimatePresence>
                  {currentMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex ${message.senderType === 'company' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-2xl ${message.senderType === 'company' ? 'text-right' : 'text-left'}`}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="inline-block px-5 py-3 rounded-2xl relative overflow-hidden"
                          style={{
                            background: message.senderType === 'company' 
                              ? 'linear-gradient(135deg, #023047 0%, #000000 100%)'
                              : '#ffffff',
                            color: message.senderType === 'company' ? '#f6f6f6' : '#000000',
                            border: message.senderType === 'company' ? 'none' : '2px solid #d3d3d3',
                            borderBottomRightRadius: message.senderType === 'company' ? '4px' : '1rem',
                            borderBottomLeftRadius: message.senderType === 'applicant' ? '4px' : '1rem',
                          }}
                        >
                          {message.senderType === 'company' && (
                            <motion.div
                              className="absolute top-0 left-0 h-full w-1"
                              style={{ background: '#FFC300' }}
                              animate={{
                                opacity: [0.5, 1, 0.5],
                              }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                          <p className="leading-relaxed relative z-10">{message.text}</p>
                        </motion.div>
                        <p
                          className="text-xs mt-1 px-2"
                          style={{ color: '#6f6f6f' }}
                        >
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Message Input */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="border-t p-6"
              style={{ borderColor: '#d3d3d3', background: '#ffffff' }}
            >
              <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSend} className="flex gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message..."
                      className="w-full px-5 py-4 rounded-xl focus:outline-none transition-all"
                      style={{
                        border: '2px solid #d3d3d3',
                        background: '#f6f6f6',
                        color: '#000000'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 20px rgba(255, 195, 0, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d3d3d3';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!messageText.trim()}
                    className="px-8 py-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 relative overflow-hidden"
                    style={{
                      background: messageText.trim() ? 'linear-gradient(135deg, #023047 0%, #000000 100%)' : '#d3d3d3',
                      color: '#f6f6f6'
                    }}
                  >
                    {messageText.trim() && (
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    <Send className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Send</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div 
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #023047 0%, #000000 100%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle, #FFC300 0%, transparent 70%)',
                      'radial-gradient(circle, transparent 0%, transparent 70%)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Sparkles className="w-12 h-12 relative z-10" style={{ color: '#FFC300' }} />
              </motion.div>
              <h3 className="mb-2" style={{ color: '#000000' }}>No Conversation Selected</h3>
              <p style={{ color: '#6f6f6f' }}>Choose a conversation from the left to start messaging</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
