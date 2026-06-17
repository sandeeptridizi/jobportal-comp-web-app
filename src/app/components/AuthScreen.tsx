import { useState } from 'react';
import { User } from '../App';
import { Briefcase, Mail, Lock, Building2, Globe, MapPin, Sparkles, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { ForgotPassword } from './ForgotPassword';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    email: '',
    password: '',
    companyName: '',
    industry: '',
    website: '',
    location: '',
    description: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const mockUser: User = {
      id: '1',
      email: loginData.email,
      companyName: 'TechCorp Inc.',
      industry: 'Technology',
      website: 'https://techcorp.com',
      description: 'Leading technology company building innovative solutions for the future.',
      location: 'San Francisco, CA'
    };
    onLogin(mockUser);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: Date.now().toString(),
      email: signupData.email,
      companyName: signupData.companyName,
      industry: signupData.industry,
      website: signupData.website,
      description: signupData.description,
      location: signupData.location
    };
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden" style={{ background: '#000000' }}>
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, #FFC300 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, #023047 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, #FFC300 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, #023047 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, #FFC300 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {showForgotPassword ? (
        <ForgotPassword onBack={() => setShowForgotPassword(false)} />
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-2 gap-8 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ color: '#f6f6f6' }}
          >
            <div className="flex items-center gap-4 mb-8">
              <motion.div 
                className="w-16 h-16 backdrop-blur rounded-2xl flex items-center justify-center relative overflow-hidden"
                style={{ background: 'rgba(255, 195, 0, 0.2)', border: '2px solid #FFC300' }}
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255, 195, 0, 0.5)',
                    '0 0 40px rgba(255, 195, 0, 0.8)',
                    '0 0 20px rgba(255, 195, 0, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-10 h-10" style={{ color: '#FFC300' }} />
              </motion.div>
              <div>
                <h1 className="text-4xl" style={{ color: '#FFC300' }}>AI JobPortal</h1>
                <p style={{ color: '#d3d3d3' }}>Next-Gen Hiring Intelligence</p>
              </div>
            </div>
            
            <h2 className="text-3xl mb-6" style={{ color: '#f6f6f6' }}>AI-Powered Recruitment</h2>
            <ul className="space-y-4" style={{ color: '#d3d3d3' }}>
              {[
                'Smart job posting with AI recommendations',
                'Intelligent applicant tracking & matching',
                'Real-time AI chat with candidates',
                'Automated profile optimization'
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(255, 195, 0, 0.5)',
                        '0 0 20px rgba(255, 195, 0, 0.8)',
                        '0 0 10px rgba(255, 195, 0, 0.5)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <Zap className="w-5 h-5" style={{ color: '#FFC300' }} />
                  </motion.div>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl shadow-2xl overflow-hidden relative"
            style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}
          >
            <div className="flex border-b" style={{ borderColor: '#d3d3d3' }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLogin(true)}
                className="flex-1 py-5 text-center transition-all relative"
                style={{
                  background: isLogin ? '#ffffff' : '#f6f6f6',
                  color: isLogin ? '#023047' : '#6f6f6f',
                  borderBottom: isLogin ? '3px solid #FFC300' : 'none'
                }}
              >
                {isLogin && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    layoutId="activeTab"
                    style={{ background: '#FFC300' }}
                  />
                )}
                <span className="text-lg relative z-10">Sign In</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsLogin(false)}
                className="flex-1 py-5 text-center transition-all relative"
                style={{
                  background: !isLogin ? '#ffffff' : '#f6f6f6',
                  color: !isLogin ? '#023047' : '#6f6f6f',
                  borderBottom: !isLogin ? '3px solid #FFC300' : 'none'
                }}
              >
                {!isLogin && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1"
                    layoutId="activeTab"
                    style={{ background: '#FFC300' }}
                  />
                )}
                <span className="text-lg relative z-10">Create Account</span>
              </motion.button>
            </div>

            <div className="p-10">
              {isLogin ? (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleLogin} 
                  className="space-y-6"
                >
                  <div>
                    <h2 className="mb-2" style={{ color: '#000000' }}>Welcome Back</h2>
                    <p style={{ color: '#6f6f6f' }}>Sign in to access your AI dashboard</p>
                  </div>

                  <div>
                    <label htmlFor="login-email" className="block mb-2" style={{ color: '#000000' }}>
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                      <input
                        type="email"
                        id="login-email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none transition-all"
                        style={{ 
                          border: '2px solid #d3d3d3',
                          background: '#ffffff',
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
                        placeholder="hr@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block mb-2" style={{ color: '#000000' }}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                      <input
                        type="password"
                        id="login-password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none transition-all"
                        style={{ 
                          border: '2px solid #d3d3d3',
                          background: '#ffffff',
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
                        placeholder="Enter your password"
                      />
                    </div>
                    <div className="mt-2 text-right">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-sm transition-colors"
                        style={{ color: '#023047' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#FFC300';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#023047';
                        }}
                      >
                        Forgot Password?
                      </motion.button>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-xl transition-colors text-lg relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #023047 0%, #000000 100%)',
                      color: '#f6f6f6',
                      border: '2px solid #FFC300'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10">Sign In to Dashboard</span>
                  </motion.button>

                  <div className="rounded-lg p-4 text-center" style={{ background: 'rgba(255, 195, 0, 0.1)', border: '2px solid #FFC300' }}>
                    <p className="text-sm" style={{ color: '#000000' }}>
                      <strong>Demo Mode:</strong> Use any email and password to sign in
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.form 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSignup} 
                  className="space-y-5"
                >
                  <div>
                    <h2 className="mb-2" style={{ color: '#000000' }}>Create Your Account</h2>
                    <p style={{ color: '#6f6f6f' }}>Join the AI hiring revolution</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="signup-company" className="block mb-2" style={{ color: '#000000' }}>
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                        <input
                          type="text"
                          id="signup-company"
                          value={signupData.companyName}
                          onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                          style={{ 
                            border: '2px solid #d3d3d3',
                            background: '#ffffff',
                            color: '#000000'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#FFC300';
                            e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#d3d3d3';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="TechCorp Inc."
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="signup-industry" className="block mb-2" style={{ color: '#000000' }}>
                        Industry
                      </label>
                      <input
                        type="text"
                        id="signup-industry"
                        value={signupData.industry}
                        onChange={(e) => setSignupData({ ...signupData, industry: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                        style={{ 
                          border: '2px solid #d3d3d3',
                          background: '#ffffff',
                          color: '#000000'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#FFC300';
                          e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#d3d3d3';
                          e.target.style.boxShadow = 'none';
                        }}
                        placeholder="Technology"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="signup-email" className="block mb-2" style={{ color: '#000000' }}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                        <input
                          type="email"
                          id="signup-email"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                          style={{ 
                            border: '2px solid #d3d3d3',
                            background: '#ffffff',
                            color: '#000000'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#FFC300';
                            e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#d3d3d3';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="hr@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="signup-password" className="block mb-2" style={{ color: '#000000' }}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                        <input
                          type="password"
                          id="signup-password"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                          style={{ 
                            border: '2px solid #d3d3d3',
                            background: '#ffffff',
                            color: '#000000'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#FFC300';
                            e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#d3d3d3';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Create password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="signup-website" className="block mb-2" style={{ color: '#000000' }}>
                        Website
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                        <input
                          type="url"
                          id="signup-website"
                          value={signupData.website}
                          onChange={(e) => setSignupData({ ...signupData, website: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                          style={{ 
                            border: '2px solid #d3d3d3',
                            background: '#ffffff',
                            color: '#000000'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#FFC300';
                            e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#d3d3d3';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="https://company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="signup-location" className="block mb-2" style={{ color: '#000000' }}>
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                        <input
                          type="text"
                          id="signup-location"
                          value={signupData.location}
                          onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none transition-all"
                          style={{ 
                            border: '2px solid #d3d3d3',
                            background: '#ffffff',
                            color: '#000000'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#FFC300';
                            e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#d3d3d3';
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="San Francisco, CA"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-description" className="block mb-2" style={{ color: '#000000' }}>
                      Description
                    </label>
                    <textarea
                      id="signup-description"
                      value={signupData.description}
                      onChange={(e) => setSignupData({ ...signupData, description: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl focus:outline-none transition-all"
                      style={{ 
                        border: '2px solid #d3d3d3',
                        background: '#ffffff',
                        color: '#000000'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 15px rgba(255, 195, 0, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d3d3d3';
                        e.target.style.boxShadow = 'none';
                      }}
                      placeholder="Enter a brief description of your company"
                      rows={4}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 rounded-xl transition-colors text-lg relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #023047 0%, #000000 100%)',
                      color: '#f6f6f6',
                      border: '2px solid #FFC300'
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10">Create Account</span>
                  </motion.button>
                </motion.form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}