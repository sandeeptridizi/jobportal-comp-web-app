import { useState, useRef, useEffect } from 'react';
import { Mail, ArrowLeft, Lock, Sparkles, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ForgotPasswordProps {
  onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
  const [step, setStep] = useState<'email' | 'otp' | 'reset' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (step === 'otp' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [step, countdown]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep('otp');
      setCountdown(60);
      setCanResend(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      setStep('reset');
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      setStep('success');
      setTimeout(() => {
        onBack();
      }, 2000);
    }
  };

  const handleResendOTP = () => {
    if (canResend) {
      setOtp(['', '', '', '', '', '']);
      setCountdown(60);
      setCanResend(false);
      otpInputs.current[0]?.focus();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md relative z-10"
    >
      <div className="rounded-2xl shadow-2xl overflow-hidden" style={{ background: '#f6f6f6', border: '2px solid #d3d3d3' }}>
        <div className="p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)' }}>
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
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ background: 'rgba(255, 195, 0, 0.2)' }}
            >
              <ArrowLeft className="w-5 h-5" style={{ color: '#FFC300' }} />
            </motion.button>
            <div className="flex-1">
              <h2 className="text-xl" style={{ color: '#f6f6f6' }}>
                {step === 'email' && 'Forgot Password'}
                {step === 'otp' && 'Verify OTP'}
                {step === 'reset' && 'Reset Password'}
                {step === 'success' && 'Success!'}
              </h2>
              <p className="text-sm" style={{ color: '#FFC300' }}>
                {step === 'email' && 'AI-Powered Security Recovery'}
                {step === 'otp' && 'Enter the code sent to your email'}
                {step === 'reset' && 'Create your new password'}
                {step === 'success' && 'Password reset successfully'}
              </p>
            </div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6" style={{ color: '#FFC300' }} />
            </motion.div>
          </div>
        </div>

        <div className="p-8">
          {step === 'email' && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleEmailSubmit}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(255, 195, 0, 0.2)', border: '2px solid #FFC300' }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 195, 0, 0.4)',
                      '0 0 40px rgba(255, 195, 0, 0.6)',
                      '0 0 20px rgba(255, 195, 0, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock className="w-10 h-10" style={{ color: '#FFC300' }} />
                </motion.div>
                <p style={{ color: '#6f6f6f' }}>
                  Enter your registered email address and we'll send you a verification code to reset your password.
                </p>
              </div>

              <div>
                <label htmlFor="forgot-email" className="block mb-2" style={{ color: '#000000' }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="email"
                    id="forgot-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-xl text-lg relative overflow-hidden"
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
                <span className="relative z-10">Send Verification Code</span>
              </motion.button>
            </motion.form>
          )}

          {step === 'otp' && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleOtpSubmit}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(2, 48, 71, 0.2)', border: '2px solid #023047' }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(2, 48, 71, 0.4)',
                      '0 0 40px rgba(2, 48, 71, 0.6)',
                      '0 0 20px rgba(2, 48, 71, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Shield className="w-10 h-10" style={{ color: '#023047' }} />
                </motion.div>
                <p style={{ color: '#6f6f6f' }}>
                  We've sent a 6-digit code to <strong style={{ color: '#000000' }}>{email}</strong>
                </p>
              </div>

              <div>
                <label className="block mb-3 text-center" style={{ color: '#000000' }}>
                  Enter Verification Code
                </label>
                <div className="flex gap-2 justify-center">
                  {otp.map((digit, index) => (
                    <motion.input
                      key={index}
                      ref={(el) => (otpInputs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl rounded-xl focus:outline-none transition-all"
                      style={{ 
                        border: '2px solid #d3d3d3',
                        background: '#ffffff',
                        color: '#000000',
                        fontWeight: '700'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#FFC300';
                        e.target.style.boxShadow = '0 0 20px rgba(255, 195, 0, 0.3)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#d3d3d3';
                        e.target.style.boxShadow = 'none';
                      }}
                      whileFocus={{ scale: 1.1 }}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center">
                {canResend ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleResendOTP}
                    className="text-sm transition-colors"
                    style={{ color: '#023047' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#FFC300';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#023047';
                    }}
                  >
                    Resend Code
                  </motion.button>
                ) : (
                  <p className="text-sm" style={{ color: '#6f6f6f' }}>
                    Resend code in <span style={{ color: '#FFC300', fontWeight: '700' }}>{countdown}s</span>
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={otp.some(digit => !digit)}
                className="w-full py-4 rounded-xl text-lg relative overflow-hidden"
                style={{
                  background: otp.some(digit => !digit) 
                    ? '#d3d3d3' 
                    : 'linear-gradient(135deg, #023047 0%, #000000 100%)',
                  color: '#f6f6f6',
                  border: '2px solid #FFC300',
                  cursor: otp.some(digit => !digit) ? 'not-allowed' : 'pointer',
                  opacity: otp.some(digit => !digit) ? 0.6 : 1
                }}
              >
                {!otp.some(digit => !digit) && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="relative z-10">Verify Code</span>
              </motion.button>
            </motion.form>
          )}

          {step === 'reset' && (
            <motion.form
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onSubmit={handleResetSubmit}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <motion.div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'rgba(255, 195, 0, 0.2)', border: '2px solid #FFC300' }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 195, 0, 0.4)',
                      '0 0 40px rgba(255, 195, 0, 0.6)',
                      '0 0 20px rgba(255, 195, 0, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock className="w-10 h-10" style={{ color: '#FFC300' }} />
                </motion.div>
                <p style={{ color: '#6f6f6f' }}>
                  Create a strong password for your account
                </p>
              </div>

              <div>
                <label htmlFor="new-password" className="block mb-2" style={{ color: '#000000' }}>
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
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
                    placeholder="Create new password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block mb-2" style={{ color: '#000000' }}>
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6f6f6f' }} />
                  <input
                    type="password"
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
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
                    placeholder="Confirm new password"
                  />
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-sm mt-2" style={{ color: '#6f6f6f' }}>
                    Passwords do not match
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
                className="w-full py-4 rounded-xl text-lg relative overflow-hidden"
                style={{
                  background: (!newPassword || !confirmPassword || newPassword !== confirmPassword)
                    ? '#d3d3d3' 
                    : 'linear-gradient(135deg, #023047 0%, #000000 100%)',
                  color: '#f6f6f6',
                  border: '2px solid #FFC300',
                  cursor: (!newPassword || !confirmPassword || newPassword !== confirmPassword) ? 'not-allowed' : 'pointer',
                  opacity: (!newPassword || !confirmPassword || newPassword !== confirmPassword) ? 0.6 : 1
                }}
              >
                {newPassword && confirmPassword && newPassword === confirmPassword && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['rgba(255, 195, 0, 0)', 'rgba(255, 195, 0, 0.2)', 'rgba(255, 195, 0, 0)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="relative z-10">Reset Password</span>
              </motion.button>
            </motion.form>
          )}

          {step === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                style={{ background: 'rgba(255, 195, 0, 0.2)', border: '3px solid #FFC300' }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.4 }}
                >
                  <CheckCircle className="w-16 h-16" style={{ color: '#FFC300' }} />
                </motion.div>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-2xl mb-3"
                style={{ color: '#000000' }}
              >
                Password Reset Successful!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{ color: '#6f6f6f' }}
              >
                Redirecting you to sign in...
              </motion.p>
              <motion.div
                className="mt-6 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-8 h-8" style={{ color: '#FFC300' }} />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
