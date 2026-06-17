import { motion } from 'motion/react';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessScreenProps {
  title: string;
  message: string;
  onClose?: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export function SuccessScreen({ 
  title, 
  message, 
  onClose, 
  actionLabel = 'Continue',
  onAction 
}: SuccessScreenProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.95)' }}
    >
      {/* Animated Background Particles */}
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

      {/* Success Card */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          delay: 0.1 
        }}
        className="relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl"
        style={{ 
          background: 'linear-gradient(135deg, #000000 0%, #023047 50%, #000000 100%)',
          border: '2px solid #FFC300'
        }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 195, 0, 0.3), transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-8 space-y-6">
          {/* Success Icon */}
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 150, 
              damping: 15,
              delay: 0.3 
            }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ background: '#FFC300' }}
              />
              <motion.div
                className="relative w-24 h-24 rounded-full flex items-center justify-center"
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
                <CheckCircle className="w-14 h-14" style={{ color: '#000000' }} />
              </motion.div>
              
              {/* Sparkles around icon */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: Math.cos((i * 60 * Math.PI) / 180) * 50,
                    y: Math.sin((i * 60 * Math.PI) / 180) * 50,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5 + i * 0.1,
                  }}
                >
                  <Sparkles className="w-4 h-4" style={{ color: '#FFC300' }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center space-y-2"
          >
            <motion.h2 
              className="text-3xl tracking-tight"
              style={{ 
                color: '#f6f6f6',
                background: 'linear-gradient(135deg, #f6f6f6 0%, #FFC300 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-base"
              style={{ color: '#d3d3d3' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {message}
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex gap-3 pt-4"
          >
            {onClose && (
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full text-base py-6 rounded-xl transition-all"
                  style={{
                    background: 'transparent',
                    border: '2px solid #6f6f6f',
                    color: '#d3d3d3',
                  }}
                >
                  Close
                </Button>
              </motion.div>
            )}
            
            {onAction && (
              <motion.div
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={onAction}
                  className="w-full text-base py-6 rounded-xl transition-all group relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                    color: '#000000',
                    border: 'none',
                  }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 w-full"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {actionLabel}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Decorative Lines */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ 
            background: 'linear-gradient(90deg, transparent, #FFC300, transparent)' 
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ 
            background: 'linear-gradient(90deg, transparent, #023047, transparent)' 
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
      </motion.div>
    </motion.div>
  );
}
