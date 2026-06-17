import { User } from '../App';
import { LayoutDashboard, Briefcase, GraduationCap, Code, Users, MessageSquare, Building2, LogOut, Sparkles, Zap, AlertTriangle, UserSearch } from 'lucide-react';
import { ViewType } from './Dashboard';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface SidebarProps {
  user: User;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onLogout: () => void;
  jobsCount?: number;
  internshipsCount?: number;
  freelanceCount?: number;
  applicantsCount?: number;
}

export function Sidebar({ user, currentView, onViewChange, onLogout, jobsCount = 0, internshipsCount = 0, freelanceCount = 0, applicantsCount = 0 }: SidebarProps) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  const menuItems = [
    { id: 'overview' as ViewType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'jobs' as ViewType, label: 'Job Postings', icon: Briefcase },
    { id: 'internships' as ViewType, label: 'Internships', icon: GraduationCap },
    { id: 'freelance' as ViewType, label: 'Freelance Gigs', icon: Code },
    { id: 'applicants' as ViewType, label: 'Applicants', icon: Users },
    { id: 'recruiters' as ViewType, label: 'Recruiter Database', icon: UserSearch },
    { id: 'chat' as ViewType, label: 'Messages', icon: MessageSquare },
    { id: 'profile' as ViewType, label: 'Company Profile', icon: Building2 }
  ];

  const quickRecruitItem = { id: 'quickrecruit' as ViewType, label: 'Quick Recruit', icon: Zap };

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-72 flex flex-col shadow-2xl relative overflow-hidden"
      style={{ background: '#000000' }}
    >
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, #FFC300 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, #023047 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, #FFC300 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="p-6 border-b relative z-10" style={{ borderColor: '#6f6f6f', background: 'linear-gradient(135deg, #000000 0%, #023047 100%)' }}>
        <div className="flex items-center gap-3">
          <motion.div 
            className="w-12 h-12 backdrop-blur rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden"
            style={{ background: 'rgba(255, 195, 0, 0.2)', border: '2px solid #FFC300' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 195, 0, 0.3)',
                '0 0 30px rgba(255, 195, 0, 0.6)',
                '0 0 20px rgba(255, 195, 0, 0.3)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-7 h-7" style={{ color: '#FFC300' }} />
          </motion.div>
          <div className="min-w-0">
            <h3 className="truncate" style={{ color: '#f6f6f6' }}>{user.companyName}</h3>
            <p className="text-xs truncate" style={{ color: '#FFC300' }}>{user.industry}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 relative z-10">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            let count = 0;
            if (item.id === 'jobs') count = jobsCount;
            else if (item.id === 'internships') count = internshipsCount;
            else if (item.id === 'freelance') count = freelanceCount;
            else if (item.id === 'applicants') count = applicantsCount;
            
            const showCount = ['jobs', 'internships', 'freelance', 'applicants'].includes(item.id);
            
            return (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.button
                  onClick={() => onViewChange(item.id)}
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all relative overflow-hidden"
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, #023047 0%, #000000 100%)'
                      : 'transparent',
                    color: isActive ? '#f6f6f6' : '#d3d3d3',
                    border: isActive ? '2px solid #FFC300' : '2px solid transparent'
                  }}
                >
                  {isActive && (
                    <>
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ background: '#FFC300' }}
                        layoutId="activeIndicator"
                      />
                    </>
                  )}
                  <Icon className="w-5 h-5 flex-shrink-0 relative z-10" style={{ color: isActive ? '#FFC300' : '#d3d3d3' }} />
                  <span className="text-sm relative z-10 flex-1 text-left">{item.label}</span>
                  
                  {showCount && (
                    <motion.div
                      className="px-2.5 py-1 rounded-full text-xs relative z-10"
                      style={{
                        background: isActive 
                          ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)'
                          : 'linear-gradient(135deg, rgba(255, 195, 0, 0.2) 0%, rgba(255, 195, 0, 0.3) 100%)',
                        color: isActive ? '#000000' : '#FFC300',
                        border: `1px solid ${isActive ? '#FFC300' : 'rgba(255, 195, 0, 0.5)'}`,
                        fontWeight: '700',
                        minWidth: '28px',
                        textAlign: 'center'
                      }}
                      whileHover={{ scale: 1.1 }}
                      animate={count > 0 ? {
                        boxShadow: [
                          '0 0 10px rgba(255, 195, 0, 0.3)',
                          '0 0 15px rgba(255, 195, 0, 0.5)',
                          '0 0 10px rgba(255, 195, 0, 0.3)'
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {count}
                    </motion.div>
                  )}
                  
                  {isActive && !showCount && (
                    <motion.div
                      className="ml-auto"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      <Sparkles className="w-4 h-4" style={{ color: '#FFC300' }} />
                    </motion.div>
                  )}
                </motion.button>
              </motion.li>
            );
          })}
          
          <motion.li 
            key={quickRecruitItem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: menuItems.length * 0.1 }}
            className="mt-2"
          >
            <motion.button
              onClick={() => onViewChange(quickRecruitItem.id)}
              whileHover={{ scale: 1.05, x: 8 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all relative overflow-hidden"
              style={{
                background: currentView === quickRecruitItem.id 
                  ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)'
                  : 'linear-gradient(135deg, rgba(255, 195, 0, 0.2) 0%, rgba(2, 48, 71, 0.2) 100%)',
                color: currentView === quickRecruitItem.id ? '#000000' : '#FFC300',
                border: currentView === quickRecruitItem.id ? '2px solid #023047' : '2px solid #FFC300',
                boxShadow: currentView === quickRecruitItem.id 
                  ? '0 0 25px rgba(255, 195, 0, 0.6)' 
                  : '0 0 15px rgba(255, 195, 0, 0.3)'
              }}
              animate={{
                boxShadow: currentView === quickRecruitItem.id 
                  ? [
                      '0 0 25px rgba(255, 195, 0, 0.6)',
                      '0 0 35px rgba(255, 195, 0, 0.8)',
                      '0 0 25px rgba(255, 195, 0, 0.6)'
                    ]
                  : [
                      '0 0 15px rgba(255, 195, 0, 0.3)',
                      '0 0 20px rgba(255, 195, 0, 0.5)',
                      '0 0 15px rgba(255, 195, 0, 0.3)'
                    ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: currentView === quickRecruitItem.id 
                    ? ['rgba(2, 48, 71, 0)', 'rgba(2, 48, 71, 0.2)', 'rgba(2, 48, 71, 0)']
                    : ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.3)', 'rgba(255, 195, 0, 0)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              {currentView === quickRecruitItem.id && (
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ background: '#023047' }}
                  layoutId="activeIndicator"
                />
              )}
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Zap className="w-5 h-5 flex-shrink-0 relative z-10" style={{ color: currentView === quickRecruitItem.id ? '#023047' : '#FFC300' }} />
              </motion.div>
              <span className="relative z-10">{quickRecruitItem.label}</span>
              {currentView === quickRecruitItem.id ? (
                <motion.div
                  className="ml-auto"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: '#023047' }} />
                </motion.div>
              ) : (
                <motion.div
                  className="ml-auto px-2 py-0.5 rounded-full text-xs"
                  style={{ background: '#023047', color: '#FFC300' }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  NEW
                </motion.div>
              )}
            </motion.button>
          </motion.li>
        </ul>
      </nav>

      <div className="p-4 border-t relative z-10" style={{ borderColor: '#6f6f6f', background: 'rgba(2, 48, 71, 0.3)' }}>
        <div className="mb-3 px-2">
          <p className="text-xs mb-1" style={{ color: '#6f6f6f' }}>Signed in as</p>
          <p className="text-sm truncate" style={{ color: '#FFC300' }}>{user.email}</p>
        </div>
        <motion.button
          onClick={() => setShowLogoutConfirm(true)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden"
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
          <LogOut className="w-5 h-5 relative z-10" style={{ color: '#FFC300' }} />
          <span className="text-sm relative z-10">Sign Out</span>
        </motion.button>
      </div>
      
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ background: 'rgba(0, 0, 0, 0.9)' }}
            onClick={() => setShowLogoutConfirm(false)}
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    background: i % 2 === 0 ? '#FFC300' : '#023047',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: Math.random() * 2 + 1.5,
                    repeat: Infinity,
                    delay: Math.random() * 1,
                  }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md overflow-hidden rounded-2xl shadow-2xl"
              style={{ 
                background: 'linear-gradient(135deg, #000000 0%, #023047 50%, #000000 100%)',
                border: '2px solid #FFC300'
              }}
            >
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  background: 'radial-gradient(circle at center, rgba(255, 195, 0, 0.2), transparent 70%)',
                }}
              />

              <div className="relative z-10 p-6 space-y-6">
                <motion.div
                  className="flex justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 15 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ background: '#FFC300' }}
                    />
                    <motion.div
                      className="relative w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ 
                        background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                      }}
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(255, 195, 0, 0.4)',
                          '0 0 30px rgba(255, 195, 0, 0.7)',
                          '0 0 20px rgba(255, 195, 0, 0.4)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <AlertTriangle className="w-8 h-8" style={{ color: '#000000' }} />
                    </motion.div>
                  </div>
                </motion.div>

                <div className="text-center space-y-2">
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl"
                    style={{ color: '#f6f6f6' }}
                  >
                    Sign Out?
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm"
                    style={{ color: '#d3d3d3' }}
                  >
                    Are you sure you want to sign out from your account?
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 pt-2"
                >
                  <motion.button
                    onClick={() => setShowLogoutConfirm(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 rounded-xl transition-all text-sm"
                    style={{
                      background: 'transparent',
                      border: '2px solid #6f6f6f',
                      color: '#d3d3d3',
                    }}
                  >
                    Cancel
                  </motion.button>

                  <motion.button
                    onClick={() => {
                      setShowLogoutConfirm(false);
                      onLogout();
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 px-4 py-3 rounded-xl transition-all text-sm relative overflow-hidden group"
                    style={{
                      background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                      color: '#000000',
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
                        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                      }}
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </span>
                  </motion.button>
                </motion.div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, #FFC300, transparent)' 
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
    </motion.div>
  );
}