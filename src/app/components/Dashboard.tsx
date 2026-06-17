import { useState } from 'react';
import { User, Job, Applicant, Message } from '../App';
import { Sidebar } from './Sidebar';
import { Overview } from './Overview';
import { JobsManager } from './JobsManager';
import { InternshipsManager } from './InternshipsManager';
import { FreelanceManager } from './FreelanceManager';
import { ApplicantsManager } from './ApplicantsManager';
import { QuickRecruit } from './QuickRecruit';
import { ChatView } from './ChatView';
import { CompanyProfile } from './CompanyProfile';
import { RecruiterDatabase } from './RecruiterDatabase';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export type ViewType = 'overview' | 'jobs' | 'internships' | 'freelance' | 'applicants' | 'quickrecruit' | 'chat' | 'profile' | 'recruiters';

// Mock data
const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    type: 'Full-time',
    department: 'Engineering',
    location: 'San Francisco, CA',
    salary: '$120,000 - $160,000',
    description: 'We are looking for an experienced Frontend Developer to join our team and build cutting-edge web applications.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'Team player', 'Strong communication skills'],
    responsibilities: ['Build new features', 'Code reviews', 'Mentor junior developers', 'Architecture decisions'],
    status: 'Active',
    postedDate: '2025-11-28',
    applicants: 24
  },
  {
    id: '2',
    title: 'UX Design Intern',
    type: 'Internship',
    department: 'Design',
    location: 'Remote',
    salary: '$25/hour',
    description: 'Summer internship opportunity for aspiring UX designers to work on real-world projects.',
    requirements: ['Currently enrolled in design program', 'Figma knowledge', 'Portfolio', 'Passion for design'],
    responsibilities: ['Design mockups', 'User research', 'Prototype features', 'Collaborate with team'],
    status: 'Active',
    postedDate: '2025-12-01',
    applicants: 15
  },
  {
    id: '3',
    title: 'Content Writer',
    type: 'Freelance',
    department: 'Marketing',
    location: 'Remote',
    salary: '$50-80/hour',
    description: 'Looking for freelance content writers for blog posts, documentation, and marketing materials.',
    requirements: ['3+ years writing experience', 'Tech knowledge', 'SEO understanding', 'Portfolio of work'],
    responsibilities: ['Write blog posts', 'Edit content', 'Research topics', 'Meet deadlines'],
    status: 'Active',
    postedDate: '2025-11-25',
    applicants: 8
  },
  {
    id: '4',
    title: 'Backend Engineer',
    type: 'Full-time',
    department: 'Engineering',
    location: 'Austin, TX',
    salary: '$110,000 - $150,000',
    description: 'Join our backend team to build scalable APIs and microservices.',
    requirements: ['4+ years backend experience', 'Node.js or Python', 'Database expertise', 'Cloud platforms'],
    responsibilities: ['Design APIs', 'Optimize performance', 'Deploy services', 'Collaborate with frontend'],
    status: 'Draft',
    postedDate: '2025-11-30',
    applicants: 0
  },
  {
    id: '5',
    title: 'Product Manager',
    type: 'Full-time',
    department: 'Product',
    location: 'New York, NY',
    salary: '$130,000 - $170,000',
    description: 'Lead product strategy and execution for our flagship platform.',
    requirements: ['5+ years PM experience', 'Technical background', 'Leadership skills', 'Data-driven'],
    responsibilities: ['Define roadmap', 'Stakeholder management', 'Feature prioritization', 'Analytics'],
    status: 'Closed',
    postedDate: '2025-11-15',
    applicants: 32
  }
];

const initialApplicants: Applicant[] = [
  {
    id: '1',
    jobId: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
    resume: 'https://example.com/resume1.pdf',
    linkedIn: 'https://linkedin.com/in/sarahjohnson',
    coverLetter: 'I am excited to apply for the Senior Frontend Developer position. With over 6 years of experience building React applications and leading frontend teams, I believe I would be a great fit for your organization.',
    appliedDate: '2025-12-03',
    status: 'New',
    matchScore: 94
  },
  {
    id: '2',
    jobId: '1',
    name: 'Michael Chen',
    email: 'mchen@email.com',
    phone: '+1 (555) 234-5678',
    resume: 'https://example.com/resume2.pdf',
    linkedIn: 'https://linkedin.com/in/michaelchen',
    coverLetter: 'I have been following your company for years and would love to contribute to your frontend team. My experience with TypeScript and modern React patterns would be valuable.',
    appliedDate: '2025-12-02',
    status: 'Reviewed',
    matchScore: 87
  },
  {
    id: '3',
    jobId: '2',
    name: 'Emily Rodriguez',
    email: 'emily.r@email.com',
    phone: '+1 (555) 345-6789',
    resume: 'https://example.com/resume3.pdf',
    coverLetter: 'As a third-year design student at Stanford, I am eager to learn and contribute to your design team this summer. My portfolio showcases various UI/UX projects.',
    appliedDate: '2025-12-04',
    status: 'Shortlisted',
    matchScore: 92
  },
  {
    id: '4',
    jobId: '1',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1 (555) 456-7890',
    resume: 'https://example.com/resume4.pdf',
    linkedIn: 'https://linkedin.com/in/davidkim',
    coverLetter: 'With a strong background in frontend development and a passion for creating excellent user experiences, I would be thrilled to join your team.',
    appliedDate: '2025-12-01',
    status: 'Reviewed',
    matchScore: 78
  },
  {
    id: '5',
    jobId: '3',
    name: 'Jessica Martinez',
    email: 'jessica.m@email.com',
    phone: '+1 (555) 567-8901',
    resume: 'https://example.com/resume5.pdf',
    linkedIn: 'https://linkedin.com/in/jessicamartinez',
    coverLetter: 'I am a freelance content writer with 5 years of experience in tech writing. I specialize in creating engaging content that drives traffic and converts readers.',
    appliedDate: '2025-12-04',
    status: 'New',
    bidAmount: 3500,
    matchScore: 96
  },
  {
    id: '6',
    jobId: '1',
    name: 'Robert Taylor',
    email: 'robert.t@email.com',
    phone: '+1 (555) 678-9012',
    resume: 'https://example.com/resume6.pdf',
    coverLetter: 'Senior frontend engineer with 8 years of experience. Led multiple teams and architected large-scale React applications.',
    appliedDate: '2025-11-30',
    status: 'Shortlisted',
    matchScore: 89
  },
  {
    id: '7',
    jobId: '2',
    name: 'Amanda Wilson',
    email: 'amanda.w@email.com',
    phone: '+1 (555) 789-0123',
    resume: 'https://example.com/resume7.pdf',
    coverLetter: 'Design student passionate about creating user-centered designs. Would love to intern with your team.',
    appliedDate: '2025-12-03',
    status: 'New',
    matchScore: 85
  }
];

const initialMessages: Message[] = [
  {
    id: '1',
    applicantId: '2',
    senderId: 'company',
    senderType: 'company',
    text: 'Hi Michael, thank you for your application. We were impressed with your background. Would you be available for an initial screening call next week?',
    timestamp: '2025-12-04T10:30:00'
  },
  {
    id: '2',
    applicantId: '2',
    senderId: '2',
    senderType: 'applicant',
    text: 'Thank you for reaching out! Yes, I would be happy to schedule a call. I am available Monday through Wednesday afternoons. What time works best for you?',
    timestamp: '2025-12-04T11:15:00'
  },
  {
    id: '3',
    applicantId: '2',
    senderId: 'company',
    senderType: 'company',
    text: 'Perfect! How about Tuesday at 2 PM PST? I will send you a calendar invite with the video call link.',
    timestamp: '2025-12-04T11:45:00'
  },
  {
    id: '4',
    applicantId: '3',
    senderId: 'company',
    senderType: 'company',
    text: 'Hi Emily, your portfolio is impressive! We would love to discuss the internship opportunity with you. Are you available for a call this week?',
    timestamp: '2025-12-04T14:20:00'
  },
  {
    id: '5',
    applicantId: '3',
    senderId: '3',
    senderType: 'applicant',
    text: 'Thank you so much! I would love to chat. I am available Thursday or Friday this week.',
    timestamp: '2025-12-04T15:10:00'
  }
];

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [currentView, setCurrentView] = useState<ViewType>('overview');
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [companyUser, setCompanyUser] = useState<User>(user);

  const handleAddJob = (job: Job) => {
    setJobs([job, ...jobs]);
  };

  const handleUpdateJob = (updatedJob: Job) => {
    setJobs(jobs.map(j => j.id === updatedJob.id ? updatedJob : j));
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs(jobs.filter(j => j.id !== jobId));
  };

  const handleUpdateApplicantStatus = (applicantId: string, status: Applicant['status']) => {
    setApplicants(applicants.map(a => 
      a.id === applicantId ? { ...a, status } : a
    ));
  };

  const handleSendMessage = (applicantId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      applicantId,
      senderId: user.id,
      senderType: 'company',
      text,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
  };

  const handleStartChat = (applicant: Applicant) => {
    setSelectedApplicant(applicant);
    setCurrentView('chat');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setCompanyUser(updatedUser);
  };

  const renderView = () => {
    switch (currentView) {
      case 'overview':
        return <Overview jobs={jobs} applicants={applicants} />;
      case 'jobs':
        return (
          <JobsManager
            jobs={jobs.filter(j => j.type === 'Full-time' || j.type === 'Part-time')}
            applicants={applicants.filter(a => {
              const job = jobs.find(j => j.id === a.jobId);
              return job && (job.type === 'Full-time' || job.type === 'Part-time');
            })}
            onAddJob={handleAddJob}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleDeleteJob}
            onUpdateStatus={handleUpdateApplicantStatus}
            onStartChat={handleStartChat}
          />
        );
      case 'internships':
        return (
          <InternshipsManager
            jobs={jobs.filter(j => j.type === 'Internship')}
            applicants={applicants.filter(a => {
              const job = jobs.find(j => j.id === a.jobId);
              return job && job.type === 'Internship';
            })}
            onAddJob={handleAddJob}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleDeleteJob}
            onUpdateStatus={handleUpdateApplicantStatus}
            onStartChat={handleStartChat}
          />
        );
      case 'freelance':
        return (
          <FreelanceManager
            jobs={jobs.filter(j => j.type === 'Freelance')}
            applicants={applicants.filter(a => {
              const job = jobs.find(j => j.id === a.jobId);
              return job && job.type === 'Freelance';
            })}
            onAddJob={handleAddJob}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleDeleteJob}
            onUpdateStatus={handleUpdateApplicantStatus}
            onStartChat={handleStartChat}
          />
        );
      case 'applicants':
        return (
          <ApplicantsManager
            jobs={jobs}
            applicants={applicants}
            onAddJob={handleAddJob}
            onUpdateJob={handleUpdateJob}
            onDeleteJob={handleDeleteJob}
            onUpdateStatus={handleUpdateApplicantStatus}
            onStartChat={handleStartChat}
          />
        );
      case 'quickrecruit':
        return <QuickRecruit />;
      case 'chat':
        return (
          <ChatView
            applicants={applicants}
            messages={messages}
            selectedApplicant={selectedApplicant}
            onSelectApplicant={setSelectedApplicant}
            onSendMessage={handleSendMessage}
            jobs={jobs}
          />
        );
      case 'profile':
        return <CompanyProfile user={companyUser} onUpdateProfile={handleUpdateProfile} />;
      case 'recruiters':
        return <RecruiterDatabase />;
      default:
        return <Overview jobs={jobs} applicants={applicants} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f6f6f6' }}>
      <Sidebar
        user={companyUser}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={onLogout}
        jobsCount={jobs.filter(j => j.type === 'Full-time' || j.type === 'Part-time').length}
        internshipsCount={jobs.filter(j => j.type === 'Internship').length}
        freelanceCount={jobs.filter(j => j.type === 'Freelance').length}
        applicantsCount={applicants.length}
      />
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>
    </div>
  );
}