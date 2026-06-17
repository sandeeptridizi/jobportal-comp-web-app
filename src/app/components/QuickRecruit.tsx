import { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Target, Sparkles, CheckCircle2, Clock, TrendingUp, Users, Briefcase, Shield, FileCheck, UserCheck, Calendar, UserSearch, CalendarCheck, HandshakeIcon, ClipboardCheck, X } from 'lucide-react';

export function QuickRecruit() {
  const [selectedPackage, setSelectedPackage] = useState<'quick' | 'complete' | null>(null);

  const packages = [
    {
      id: 'quick' as const,
      name: 'Quick Recruit',
      price: '999',
      duration: '3 days',
      icon: Target,
      gradient: 'linear-gradient(135deg, #023047 0%, #000000 100%)',
      features: [
        { icon: UserSearch, text: 'Manual Interviews to validate the profile', desc: 'Human-led validation interviews for quality assurance' },
        { icon: CalendarCheck, text: 'Scheduling the technical interview', desc: 'Coordinate and schedule technical assessments' },
        { icon: HandshakeIcon, text: 'Handover to final interview', desc: 'Seamless transition to final hiring stage' }
      ]
    },
    {
      id: 'complete' as const,
      name: 'Complete Recruitment',
      price: '2,499',
      duration: '5 days',
      icon: Sparkles,
      gradient: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
      features: [
        { icon: Shield, text: 'Everything in Quick Recruit', desc: 'All Quick Recruit features included' },
        { icon: Users, text: 'Complete Interview Process', desc: 'Managed interview scheduling and coordination' },
        { icon: FileCheck, text: 'Background Verification', desc: 'Comprehensive background checks' },
        { icon: ClipboardCheck, text: 'Technical Interview', desc: 'In-depth technical assessment and evaluation' },
        { icon: CheckCircle2, text: 'Task Assignment', desc: 'Practical task evaluation for candidates' },
        { icon: HandshakeIcon, text: 'Final Interview', desc: 'Conclusive interview with decision makers' },
        { icon: X, text: 'Closing the Application', desc: 'Complete application closure and documentation' }
      ]
    }
  ];

  return (
    <div className="min-h-screen p-8" style={{ background: '#f6f6f6' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)', border: '3px solid #023047' }}
              animate={{
                boxShadow: [
                  '0 0 30px rgba(255, 195, 0, 0.4)',
                  '0 0 50px rgba(255, 195, 0, 0.7)',
                  '0 0 30px rgba(255, 195, 0, 0.4)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-9 h-9" style={{ color: '#000000' }} />
            </motion.div>
            <div>
              <h1 style={{ color: '#000000' }}>AI Quick Recruit</h1>
              <p style={{ color: '#6f6f6f' }}>Fill your open positions faster with AI-powered recruitment</p>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 mb-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(2, 48, 71, 0.1) 0%, rgba(255, 195, 0, 0.1) 100%)', border: '2px solid #FFC300' }}
        >
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 0% 50%, #FFC300 0%, transparent 50%)',
                'radial-gradient(circle at 100% 50%, #023047 0%, transparent 50%)',
                'radial-gradient(circle at 0% 50%, #FFC300 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <div className="relative z-10 flex items-start gap-4">
            <Clock className="w-12 h-12 flex-shrink-0" style={{ color: '#FFC300' }} />
            <div>
              <h3 className="mb-2" style={{ color: '#000000' }}>Why Choose Quick Recruit?</h3>
              <p style={{ color: '#6f6f6f' }}>
                Our AI-powered recruitment service helps you find the perfect candidates in record time. 
                Save time on screening, interviewing, and hiring while our intelligent system does the heavy lifting. 
                Get quality candidates matched to your job requirements with precision accuracy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            const isSelected = selectedPackage === pkg.id;
            
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setSelectedPackage(pkg.id)}
                className="rounded-2xl p-8 cursor-pointer transition-all relative overflow-hidden"
                style={{
                  background: isSelected 
                    ? pkg.gradient 
                    : '#ffffff',
                  border: isSelected 
                    ? `3px solid ${pkg.id === 'complete' ? '#023047' : '#FFC300'}` 
                    : '2px solid #d3d3d3',
                  boxShadow: isSelected 
                    ? `0 10px 40px ${pkg.id === 'complete' ? 'rgba(255, 195, 0, 0.5)' : 'rgba(2, 48, 71, 0.4)'}` 
                    : '0 2px 10px rgba(0, 0, 0, 0.1)'
                }}
              >
                {isSelected && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: pkg.id === 'complete' 
                        ? ['rgba(2, 48, 71, 0)', 'rgba(2, 48, 71, 0.2)', 'rgba(2, 48, 71, 0)']
                        : ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                
                <div className="relative z-10">
                  {/* Package Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center"
                        style={{ 
                          background: isSelected 
                            ? (pkg.id === 'complete' ? 'rgba(2, 48, 71, 0.3)' : 'rgba(255, 195, 0, 0.3)')
                            : (pkg.id === 'complete' ? '#FFC300' : '#023047')
                        }}
                      >
                        <Icon 
                          className="w-7 h-7" 
                          style={{ 
                            color: isSelected 
                              ? (pkg.id === 'complete' ? '#000000' : '#FFC300')
                              : (pkg.id === 'complete' ? '#000000' : '#FFC300')
                          }} 
                        />
                      </div>
                      <div>
                        <h2 
                          className="mb-1" 
                          style={{ 
                            color: isSelected 
                              ? (pkg.id === 'complete' ? '#000000' : '#f6f6f6')
                              : '#000000'
                          }}
                        >
                          {pkg.name}
                        </h2>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" style={{ color: isSelected ? (pkg.id === 'complete' ? '#023047' : '#FFC300') : '#6f6f6f' }} />
                          <span className="text-sm" style={{ color: isSelected ? (pkg.id === 'complete' ? '#023047' : '#FFC300') : '#6f6f6f' }}>
                            {pkg.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ background: pkg.id === 'complete' ? '#023047' : '#FFC300' }}
                      >
                        <CheckCircle2 className="w-6 h-6" style={{ color: pkg.id === 'complete' ? '#FFC300' : '#000000' }} />
                      </motion.div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm" style={{ color: isSelected ? (pkg.id === 'complete' ? '#000000' : '#FFC300') : '#6f6f6f' }}>
                        ₹
                      </span>
                      <span 
                        className="text-5xl" 
                        style={{ 
                          color: isSelected 
                            ? (pkg.id === 'complete' ? '#023047' : '#FFC300')
                            : '#023047'
                        }}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-sm" style={{ color: isSelected ? (pkg.id === 'complete' ? '#000000' : '#d3d3d3') : '#6f6f6f' }}>
                        / position
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-6">
                    {pkg.features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.2) + (idx * 0.1) }}
                          className="flex items-start gap-3"
                        >
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ 
                              background: isSelected 
                                ? (pkg.id === 'complete' ? 'rgba(2, 48, 71, 0.2)' : 'rgba(255, 195, 0, 0.2)')
                                : (pkg.id === 'complete' ? 'rgba(255, 195, 0, 0.1)' : 'rgba(2, 48, 71, 0.1)')
                            }}
                          >
                            <FeatureIcon 
                              className="w-4 h-4" 
                              style={{ 
                                color: isSelected 
                                  ? (pkg.id === 'complete' ? '#023047' : '#FFC300')
                                  : (pkg.id === 'complete' ? '#FFC300' : '#023047')
                              }} 
                            />
                          </div>
                          <div>
                            <p 
                              style={{ 
                                color: isSelected 
                                  ? (pkg.id === 'complete' ? '#000000' : '#f6f6f6')
                                  : '#000000'
                              }}
                            >
                              {feature.text}
                            </p>
                            <p 
                              className="text-sm mt-1" 
                              style={{ 
                                color: isSelected 
                                  ? (pkg.id === 'complete' ? '#023047' : '#d3d3d3')
                                  : '#6f6f6f'
                              }}
                            >
                              {feature.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-4 rounded-xl transition-all relative overflow-hidden"
                    style={{
                      background: isSelected 
                        ? (pkg.id === 'complete' ? '#023047' : 'rgba(255, 195, 0, 0.3)')
                        : (pkg.id === 'complete' ? '#FFC300' : '#023047'),
                      color: isSelected 
                        ? (pkg.id === 'complete' ? '#FFC300' : '#FFC300')
                        : (pkg.id === 'complete' ? '#000000' : '#FFC300'),
                      border: isSelected 
                        ? (pkg.id === 'complete' ? '2px solid #FFC300' : '2px solid #FFC300')
                        : (pkg.id === 'complete' ? '2px solid #023047' : '2px solid #FFC300')
                    }}
                  >
                    <span className="relative z-10">
                      {isSelected ? 'Selected Package' : 'Select Package'}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl p-8 mb-8"
          style={{ background: '#ffffff', border: '2px solid #d3d3d3' }}
        >
          <h2 className="mb-6 flex items-center gap-3" style={{ color: '#000000' }}>
            <Briefcase className="w-7 h-7" style={{ color: '#FFC300' }} />
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Select Package', desc: 'Choose Quick Recruit or Complete package', icon: Target },
              { step: '2', title: 'Post Your Job', desc: 'Create job listing with requirements', icon: Briefcase },
              { step: '3', title: 'Interview Process', desc: 'Our AI screens and matches candidates', icon: Shield },
              { step: '4', title: 'Profile Finalization', desc: 'Receive top candidates within 3-5 days', icon: CheckCircle2 }
            ].map((item, index) => {
              const StepIcon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (index * 0.1) }}
                  className="text-center"
                >
                  <div className="relative mb-4">
                    <motion.div
                      className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)', border: '2px solid #023047' }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <StepIcon className="w-7 h-7" style={{ color: '#000000' }} />
                    </motion.div>
                    <div 
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{ background: '#023047', color: '#FFC300' }}
                    >
                      {item.step}
                    </div>
                  </div>
                  <h3 className="mb-2" style={{ color: '#000000' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: '#6f6f6f' }}>{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl p-8 text-center relative overflow-hidden"
            style={{ 
              background: selectedPackage === 'complete' 
                ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)' 
                : 'linear-gradient(135deg, #023047 0%, #000000 100%)',
              border: selectedPackage === 'complete' ? '3px solid #023047' : '3px solid #FFC300'
            }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: selectedPackage === 'complete' 
                  ? ['rgba(2, 48, 71, 0)', 'rgba(2, 48, 71, 0.2)', 'rgba(2, 48, 71, 0)']
                  : ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative z-10">
              <h2 className="mb-4" style={{ color: selectedPackage === 'complete' ? '#000000' : '#f6f6f6' }}>
                Ready to Get Started?
              </h2>
              <p className="mb-6 text-lg" style={{ color: selectedPackage === 'complete' ? '#023047' : '#d3d3d3' }}>
                You've selected the <span style={{ color: selectedPackage === 'complete' ? '#000000' : '#FFC300' }}>{selectedPackage === 'complete' ? 'Complete Recruitment' : 'Quick Recruit'}</span> package
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 rounded-xl text-lg transition-all relative overflow-hidden"
                style={{
                  background: selectedPackage === 'complete' ? '#023047' : '#FFC300',
                  color: selectedPackage === 'complete' ? '#FFC300' : '#000000',
                  border: selectedPackage === 'complete' ? '2px solid #000000' : '2px solid #023047'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Proceed to Payment
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}