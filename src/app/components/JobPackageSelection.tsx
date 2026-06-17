import { motion } from 'motion/react';
import { CheckCircle2, Calendar, Users, Target, Sparkles, MessageSquare, Crown, Shield, X } from 'lucide-react';

interface JobPackageSelectionProps {
  onSelectPackage: (packageType: 'free' | 'premium') => void;
  onClose: () => void;
}

export function JobPackageSelection({ onSelectPackage, onClose }: JobPackageSelectionProps) {
  const packages = [
    {
      id: 'free' as const,
      name: 'Free Plan',
      price: '0',
      icon: Target,
      gradient: 'linear-gradient(135deg, #d3d3d3 0%, #f6f6f6 100%)',
      borderColor: '#6f6f6f',
      features: [
        { icon: Calendar, text: '15 Days Validity', desc: 'Job listing active for 15 days' },
        { icon: Users, text: '20 Applicants', desc: 'Receive up to 20 applications' },
        { icon: Sparkles, text: 'AI Matching', desc: 'Smart candidate matching algorithm' },
        { icon: MessageSquare, text: 'Chat System', desc: 'Direct messaging with candidates' }
      ]
    },
    {
      id: 'premium' as const,
      name: 'Premium Plan',
      price: '99',
      icon: Crown,
      gradient: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
      borderColor: '#FFC300',
      popular: true,
      features: [
        { icon: Crown, text: 'Featured Job', desc: 'Showcase your job to top applicants' },
        { icon: Users, text: '50 Applicants', desc: 'Receive up to 50 applications' },
        { icon: Shield, text: 'Verified Candidates Priority', desc: 'See verified profiles first' },
        { icon: Calendar, text: '60 Days Duration', desc: 'Extended job listing period' },
        { icon: Sparkles, text: 'AI Matching', desc: 'Advanced candidate matching' },
        { icon: MessageSquare, text: 'Chat System', desc: 'Enhanced messaging features' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl p-8"
        style={{ background: '#f6f6f6', boxShadow: '0 25px 50px rgba(255, 195, 0, 0.3)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{ background: '#d3d3d3', color: '#000000' }}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-4"
          >
            <h1 style={{ color: '#000000' }}>Select Your Job Posting Plan</h1>
            <p className="mt-2" style={{ color: '#6f6f6f' }}>
              Choose the perfect plan to reach the right candidates
            </p>
          </motion.div>
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {packages.map((pkg, index) => {
            const Icon = pkg.icon;
            
            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{
                  background: '#ffffff',
                  border: `3px solid ${pkg.borderColor}`,
                  boxShadow: pkg.id === 'premium' 
                    ? '0 10px 40px rgba(255, 195, 0, 0.3)' 
                    : '0 5px 20px rgba(0, 0, 0, 0.1)'
                }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    className="absolute top-6 right-6 px-4 py-2 rounded-full text-sm"
                    style={{ background: '#023047', color: '#FFC300' }}
                  >
                    RECOMMENDED
                  </motion.div>
                )}

                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    background: pkg.id === 'premium'
                      ? ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)']
                      : ['rgba(111, 111, 111, 0)', 'rgba(111, 111, 111, 0.2)', 'rgba(111, 111, 111, 0)'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <div className="relative z-10">
                  {/* Package Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ 
                        background: pkg.id === 'premium' ? '#FFC300' : '#d3d3d3'
                      }}
                    >
                      <Icon 
                        className="w-8 h-8" 
                        style={{ color: pkg.id === 'premium' ? '#000000' : '#6f6f6f' }} 
                      />
                    </div>
                    <div>
                      <h2 style={{ color: '#000000' }}>
                        {pkg.name}
                      </h2>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm" style={{ color: '#6f6f6f' }}>
                        ₹
                      </span>
                      <span 
                        className="text-5xl" 
                        style={{ color: pkg.id === 'premium' ? '#FFC300' : '#023047' }}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-sm" style={{ color: '#6f6f6f' }}>
                        {pkg.id === 'free' ? '/ Always Free' : '/ posting'}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
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
                              background: pkg.id === 'premium' 
                                ? 'rgba(255, 195, 0, 0.2)' 
                                : 'rgba(2, 48, 71, 0.1)'
                            }}
                          >
                            <FeatureIcon 
                              className="w-4 h-4" 
                              style={{ 
                                color: pkg.id === 'premium' ? '#FFC300' : '#023047'
                              }} 
                            />
                          </div>
                          <div>
                            <p style={{ color: '#000000' }}>
                              {feature.text}
                            </p>
                            <p 
                              className="text-sm mt-1" 
                              style={{ color: '#6f6f6f' }}
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
                    onClick={() => onSelectPackage(pkg.id)}
                    className="w-full py-4 rounded-xl transition-all relative overflow-hidden"
                    style={{
                      background: pkg.id === 'premium' 
                        ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)'
                        : 'linear-gradient(135deg, #023047 0%, #000000 100%)',
                      color: pkg.id === 'premium' ? '#000000' : '#FFC300',
                      border: pkg.id === 'premium' 
                        ? '2px solid #023047' 
                        : '2px solid #FFC300'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: pkg.id === 'premium'
                          ? ['rgba(2, 48, 71, 0)', 'rgba(2, 48, 71, 0.2)', 'rgba(2, 48, 71, 0)']
                          : ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Select {pkg.name}
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Info Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-6 rounded-2xl text-center"
          style={{ background: 'rgba(2, 48, 71, 0.1)', border: '2px solid #023047' }}
        >
          <p style={{ color: '#6f6f6f' }}>
            💡 <span style={{ color: '#000000' }}>Pro Tip:</span> Premium plan increases your job visibility by 300% and attracts verified, quality candidates faster!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}