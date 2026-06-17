import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Applicant } from '../App';

interface ResumeViewerProps {
  applicant: Applicant;
  onClose: () => void;
}

export function ResumeViewer({ applicant, onClose }: ResumeViewerProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed right-0 bottom-0 w-[500px] shadow-2xl z-50 flex flex-col"
        style={{
          height: 'calc(100vh - 80px)',
          background: '#ffffff',
          border: '2px solid #d3d3d3',
          borderRight: 'none',
          borderBottom: 'none'
        }}
      >
        {/* Header */}
        <div 
          className="p-4 flex items-center justify-between relative overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #000000 0%, #023047 100%)',
            borderBottom: '2px solid #FFC300'
          }}
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
          <div className="relative z-10 flex items-center gap-3">
            <FileText className="w-6 h-6" style={{ color: '#FFC300' }} />
            <div>
              <h3 style={{ color: '#f6f6f6' }}>{applicant.name}</h3>
              <p className="text-sm" style={{ color: '#d3d3d3' }}>Resume</p>
            </div>
          </div>
          <div className="relative z-10 flex items-center gap-2">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={applicant.resume}
              download
              className="p-2 rounded-lg transition-colors"
              style={{ color: '#FFC300' }}
              title="Download resume"
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 195, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Download className="w-5 h-5" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              href={applicant.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors"
              style={{ color: '#FFC300' }}
              title="Open in new tab"
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 195, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ExternalLink className="w-5 h-5" />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-lg transition-colors"
              style={{ color: '#f6f6f6' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(246, 246, 246, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Resume Content */}
        <div className="flex-1 overflow-hidden relative" style={{ background: '#f6f6f6' }}>
          {applicant.resume ? (
            <iframe
              src={applicant.resume}
              className="w-full h-full"
              style={{ border: 'none' }}
              title={`${applicant.name}'s Resume`}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: '#d3d3d3' }} />
                <h3 className="mb-2" style={{ color: '#000000' }}>No Resume Available</h3>
                <p style={{ color: '#6f6f6f' }}>This applicant hasn't uploaded a resume yet.</p>
              </div>
            </div>
          )}
        </div>

        {/* Applicant Info Footer */}
        <div 
          className="p-4"
          style={{ 
            background: '#ffffff',
            borderTop: '2px solid #d3d3d3'
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: '#6f6f6f' }}>Email:</span>
              <a href={`mailto:${applicant.email}`} style={{ color: '#023047' }}>{applicant.email}</a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span style={{ color: '#6f6f6f' }}>Phone:</span>
              <a href={`tel:${applicant.phone}`} style={{ color: '#023047' }}>{applicant.phone}</a>
            </div>
            {applicant.linkedIn && (
              <div className="flex items-center gap-2 text-sm">
                <span style={{ color: '#6f6f6f' }}>LinkedIn:</span>
                <a 
                  href={applicant.linkedIn} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#023047' }}
                >
                  View Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
