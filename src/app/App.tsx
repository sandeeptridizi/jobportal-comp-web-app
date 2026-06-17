import { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';

export interface User {
  id: string;
  email: string;
  companyName: string;
  companyLogo?: string;
  industry: string;
  website: string;
  description: string;
  location: string;
  linkedinUrl?: string;
  phone?: string;
  gst?: string;
  officeTimings?: string;
  workingDays?: string[];
  companySize?: string;
  foundedYear?: string;
}

export interface Job {
  id: string;
  title: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Freelance';
  location: string;
  salary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  status: 'Active' | 'Closed' | 'Draft';
  postedDate: string;
  applicants: number;
  quickRecruit?: {
    enabled: boolean;
    package: 'quick' | 'complete'; // quick = 999 INR, complete = 2499 INR
  };
  publishingPackage?: {
    type: 'free' | 'premium'; // free = 0 INR, premium = 99 INR
    validity: number; // days
    maxApplicants: number;
  };
}

export interface Applicant {
  id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  linkedIn?: string;
  coverLetter: string;
  appliedDate: string;
  status: 'New' | 'Reviewed' | 'Shortlisted' | 'Rejected' | 'Accepted';
  avatar?: string;
  bidAmount?: number; // For freelance proposals
  matchScore?: number; // AI Profile Match Score (0-100)
}

export interface Message {
  id: string;
  applicantId: string;
  senderId: string;
  senderType: 'company' | 'applicant';
  text: string;
  timestamp: string;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated || !currentUser) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />;
}