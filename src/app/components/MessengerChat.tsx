import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { Applicant } from '../App';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  sender: 'user' | 'applicant';
  text: string;
  timestamp: Date;
}

interface MessengerChatProps {
  applicant: Applicant;
  onClose: () => void;
}

export function MessengerChat({ applicant, onClose }: MessengerChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'applicant',
      text: `Hi! Thank you for considering my application. I'm excited about this opportunity!`,
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        sender: 'user',
        text: newMessage,
        timestamp: new Date()
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate applicant response after 2 seconds
      setTimeout(() => {
        const response: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'applicant',
          text: `Thanks for your message! I'll get back to you shortly.`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="fixed bottom-0 right-8 w-96 rounded-t-2xl shadow-2xl z-50 flex flex-col transition-all duration-300 overflow-hidden"
      style={{ 
        height: isMinimized ? '60px' : '600px',
        background: '#ffffff',
        border: '2px solid #FFC300',
        borderBottom: 'none'
      }}
    >
      {/* Chat Header */}
      <div 
        className="p-4 rounded-t-2xl flex items-center justify-between cursor-pointer relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #000000 0%, #023047 100%)' }}
        onClick={() => setIsMinimized(!isMinimized)}
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
        <div className="flex items-center gap-3 relative z-10">
          <motion.div 
            className="w-10 h-10 rounded-full flex items-center justify-center relative overflow-hidden"
            style={{ background: '#ffffff', color: '#023047', border: '2px solid #FFC300' }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.div
              className="absolute inset-0"
              animate={{
                background: ['radial-gradient(circle, #FFC300 0%, transparent 70%)', 'radial-gradient(circle, transparent 0%, transparent 70%)'],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="relative z-10" style={{ fontWeight: '700' }}>
              {applicant.name.charAt(0).toUpperCase()}
            </span>
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <h4 style={{ color: '#f6f6f6' }}>{applicant.name}</h4>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3" style={{ color: '#FFC300' }} />
              </motion.div>
            </div>
            <p className="text-xs" style={{ color: '#FFC300' }}>AI-Powered Chat</p>
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{ background: 'rgba(255, 195, 0, 0.2)' }}
          >
            {isMinimized ? (
              <Maximize2 className="w-4 h-4" style={{ color: '#FFC300' }} />
            ) : (
              <Minimize2 className="w-4 h-4" style={{ color: '#FFC300' }} />
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            style={{ background: 'rgba(255, 195, 0, 0.2)' }}
          >
            <X className="w-4 h-4" style={{ color: '#FFC300' }} />
          </motion.button>
        </div>
      </div>

      {/* Chat Messages */}
      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ background: '#f6f6f6' }}>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="rounded-2xl px-4 py-2 shadow-sm"
                    style={
                      message.sender === 'user'
                        ? { 
                            background: 'linear-gradient(135deg, #023047 0%, #000000 100%)', 
                            color: '#f6f6f6',
                            border: '1px solid #FFC300'
                          }
                        : { 
                            background: '#ffffff', 
                            color: '#000000', 
                            border: '2px solid #d3d3d3' 
                          }
                    }
                  >
                    <p className="text-sm">{message.text}</p>
                  </motion.div>
                  <p className="text-xs mt-1" style={{ 
                    color: '#6f6f6f',
                    textAlign: message.sender === 'user' ? 'right' : 'left'
                  }}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-4" style={{ background: '#ffffff', borderTop: '2px solid #d3d3d3' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full focus:outline-none text-sm transition-all"
                style={{ 
                  background: '#f6f6f6', 
                  border: '2px solid #d3d3d3',
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
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="submit"
                disabled={!newMessage.trim()}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all relative overflow-hidden"
                style={{ 
                  background: newMessage.trim() ? 'linear-gradient(135deg, #FFC300 0%, #FFD700 100%)' : '#d3d3d3',
                  color: '#000000',
                  cursor: newMessage.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                {newMessage.trim() && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0)'],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
                <Send className="w-4 h-4 relative z-10" />
              </motion.button>
            </div>
          </form>
        </>
      )}
    </motion.div>
  );
}