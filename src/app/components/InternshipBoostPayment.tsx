import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Users, TrendingUp, Eye, Target, CheckCircle2, CreditCard, Smartphone, Wallet, Building2 } from 'lucide-react';
import { useState } from 'react';

interface InternshipBoostPaymentProps {
  internshipTitle: string;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export function InternshipBoostPayment({ internshipTitle, onClose, onPaymentSuccess }: InternshipBoostPaymentProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi' | 'card' | 'wallet' | 'netbanking' | null>(null);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleBoostNow = () => {
    setShowPaymentMethods(true);
  };

  const handlePayment = () => {
    if (!selectedPaymentMethod) return;
    
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  const paymentMethods = [
    { id: 'upi' as const, name: 'UPI', icon: Smartphone, desc: 'Pay via UPI apps' },
    { id: 'card' as const, name: 'Credit/Debit Card', icon: CreditCard, desc: 'Visa, Mastercard, RuPay' },
    { id: 'wallet' as const, name: 'Wallet', icon: Wallet, desc: 'Paytm, PhonePe, Google Pay' },
    { id: 'netbanking' as const, name: 'Net Banking', icon: Building2, desc: 'All major banks' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.9)' }}
      onClick={onClose}
    >
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
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #023047 100%)',
          border: '2px solid #FFC300',
        }}
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center z-20"
          style={{
            background: 'rgba(255, 195, 0, 0.2)',
            border: '2px solid #FFC300',
            color: '#FFC300',
          }}
        >
          <X className="w-5 h-5" />
        </motion.button>

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
          {!showPaymentMethods ? (
            <>
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
                  <Zap className="w-10 h-10" style={{ color: '#000000' }} />
                </motion.div>
                <h2 className="text-3xl mb-2" style={{ color: '#f6f6f6' }}>
                  Boost Your Internship
                </h2>
                <p className="text-base mb-3" style={{ color: '#d3d3d3' }}>
                  Get 3X more applications for your post
                </p>
                <div
                  className="inline-block px-4 py-2 rounded-xl text-sm"
                  style={{
                    background: 'rgba(255, 195, 0, 0.15)',
                    border: '1px solid rgba(255, 195, 0, 0.3)',
                    color: '#FFC300',
                  }}
                >
                  {internshipTitle}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: TrendingUp,
                    title: '3X More Visibility',
                    desc: 'Your post appears at the top of search results',
                    color: '#FFC300',
                  },
                  {
                    icon: Users,
                    title: 'Reach 10,000+ Students',
                    desc: 'Get exposure to our entire student network',
                    color: '#023047',
                  },
                  {
                    icon: Eye,
                    title: 'Featured Badge',
                    desc: 'Stand out with a premium featured badge',
                    color: '#FFC300',
                  },
                  {
                    icon: Target,
                    title: '7 Days Boost',
                    desc: 'Premium placement for one full week',
                    color: '#023047',
                  },
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${feature.color}20`,
                          border: `2px solid ${feature.color}40`,
                        }}
                      >
                        <Icon className="w-6 h-6" style={{ color: feature.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-semibold mb-1" style={{ color: '#f6f6f6' }}>
                          {feature.title}
                        </h3>
                        <p className="text-sm" style={{ color: '#d3d3d3' }}>
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center mb-6">
                <div className="mb-2">
                  <span className="text-sm" style={{ color: '#d3d3d3' }}>One-time payment</span>
                </div>
                <div className="flex items-end justify-center gap-2 mb-6">
                  <span className="text-5xl" style={{ color: '#FFC300' }}>₹99</span>
                  <span className="text-base mb-2" style={{ color: '#d3d3d3' }}>
                    <span className="line-through mr-2">₹299</span>
                    <span className="px-2 py-1 rounded text-xs" style={{ background: '#FFC300', color: '#000000' }}>
                      67% OFF
                    </span>
                  </span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBoostNow}
                  className="w-full py-4 rounded-xl font-semibold text-lg relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)',
                    color: '#000000',
                    boxShadow: '0 10px 40px rgba(255, 195, 0, 0.4)',
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
                    <Zap className="w-5 h-5" />
                    Boost Now for ₹99
                  </span>
                </motion.button>

                <p className="text-xs mt-3" style={{ color: '#6f6f6f' }}>
                  Secure payment • 100% money-back guarantee
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="text-xl mb-4" style={{ color: '#f6f6f6' }}>
                  Select Payment Method
                </h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <motion.button
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPaymentMethod(method.id)}
                        className="w-full p-4 rounded-xl flex items-center gap-4 transition-all"
                        style={{
                          background: selectedPaymentMethod === method.id
                            ? 'rgba(255, 195, 0, 0.2)'
                            : 'rgba(255, 255, 255, 0.05)',
                          border: `2px solid ${selectedPaymentMethod === method.id ? '#FFC300' : 'rgba(255, 255, 255, 0.1)'}`,
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{
                            background: selectedPaymentMethod === method.id
                              ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)'
                              : 'rgba(255, 255, 255, 0.1)',
                            color: selectedPaymentMethod === method.id ? '#000000' : '#FFC300',
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold mb-0.5" style={{ color: '#f6f6f6' }}>
                            {method.name}
                          </p>
                          <p className="text-xs" style={{ color: '#d3d3d3' }}>
                            {method.desc}
                          </p>
                        </div>
                        {selectedPaymentMethod === method.id && (
                          <CheckCircle2 className="w-6 h-6" style={{ color: '#FFC300' }} />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div
                className="p-4 rounded-xl mb-6"
                style={{
                  background: 'rgba(255, 195, 0, 0.1)',
                  border: '1px solid rgba(255, 195, 0, 0.3)',
                }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: '#d3d3d3' }}>Boost Duration</span>
                  <span style={{ color: '#f6f6f6' }}>7 Days</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ color: '#d3d3d3' }}>Amount</span>
                  <span style={{ color: '#f6f6f6' }}>₹99</span>
                </div>
                <div className="border-t pt-2 mt-2" style={{ borderColor: 'rgba(255, 195, 0, 0.3)' }}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold" style={{ color: '#f6f6f6' }}>Total Amount</span>
                    <span className="text-xl font-bold" style={{ color: '#FFC300' }}>₹99</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPaymentMethods(false)}
                  className="flex-1 py-3 rounded-xl font-semibold"
                  style={{
                    background: 'transparent',
                    border: '2px solid #6f6f6f',
                    color: '#d3d3d3',
                  }}
                >
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePayment}
                  disabled={!selectedPaymentMethod || processing}
                  className="flex-1 py-3 rounded-xl font-semibold relative overflow-hidden"
                  style={{
                    background: selectedPaymentMethod && !processing
                      ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)'
                      : '#6f6f6f',
                    color: selectedPaymentMethod && !processing ? '#000000' : '#d3d3d3',
                    opacity: !selectedPaymentMethod || processing ? 0.5 : 1,
                  }}
                >
                  {processing ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      />
                      Processing...
                    </span>
                  ) : (
                    `Pay ₹99`
                  )}
                </motion.button>
              </div>
            </>
          )}
        </div>

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
  );
}
