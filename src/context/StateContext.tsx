import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Activity, Teacher, Class, Fee, SchoolEvent, Student } from '@/types';

interface StudentState extends Student {
  attendance_status?: boolean; // simple toggle for current session
}

interface StateContextType {
  students: StudentState[];
  teachers: Teacher[];
  classes: Class[];
  fees: Fee[];
  events: SchoolEvent[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  toggleAttendance: (id: string) => void;
  stars: number;
  addStar: (count: number) => void;
  recentActivities: { time: string; event: string; photo?: string }[];
  addActivity: (activity: { time: string; event: string; photo?: string }) => void;
  highlights: string[];
  addHighlight: (url: string) => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stars, setStars] = useState(12);
  const [students, setStudents] = useState<StudentState[]>([
    { 
      id: '1', name: 'Alice Johnson', age: '4', level: 'Nursery', parentName: 'Mark Johnson', 
      attendance: 92, progress: 85, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
      milestones: [], attendance_status: false 
    },
    { 
      id: '2', name: 'Bob Smith', age: '5', level: 'Kindergarten', parentName: 'Jane Smith', 
      attendance: 88, progress: 70, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      milestones: [], attendance_status: false 
    },
    { 
      id: '3', name: 'Charlie Brown', age: '4', level: 'Pre-Nursery', parentName: 'Chris Brown', 
      attendance: 95, progress: 95, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
      milestones: [], attendance_status: false 
    },
    { 
      id: '4', name: 'Daisy Miller', age: '3', level: 'Playgroup', parentName: 'Dan Miller', 
      attendance: 80, progress: 60, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daisy',
      milestones: [], attendance_status: false 
    },
  ]);

  const [teachers] = useState<Teacher[]>([
    { id: 't1', name: 'Sarah Wilson', email: 'sarah@littlesteps.edu', subject: 'Early Literacy', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', experience: '8 Years' },
    { id: 't2', name: 'James Miller', email: 'james@littlesteps.edu', subject: 'Cognitive Development', status: 'on-leave', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', experience: '12 Years' },
    { id: 't3', name: 'Emily Davis', email: 'emily@littlesteps.edu', subject: 'Creative Arts', status: 'active', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', experience: '5 Years' },
  ]);

  const [classes] = useState<Class[]>([
    { id: 'c1', name: 'Nursery Blue', teacherId: 't1', studentsCount: 15, level: 'Nursery', schedule: '08:00 AM - 12:00 PM' },
    { id: 'c2', name: 'KG Gold', teacherId: 't2', studentsCount: 18, level: 'Kindergarten', schedule: '08:00 AM - 01:00 PM' },
  ]);

  const [fees] = useState<Fee[]>([
    { id: 'f1', studentId: '1', amount: 1200, status: 'paid', dueDate: '2024-04-01' },
    { id: 'f2', studentId: '2', amount: 1200, status: 'pending', dueDate: '2024-05-01' },
    { id: 'f3', studentId: '3', amount: 1500, status: 'overdue', dueDate: '2024-03-15' },
  ]);

  const [events] = useState<SchoolEvent[]>([
    { id: 'e1', title: 'Spring Carnival', date: '2024-04-20', time: '10:00 AM', type: 'cultural', description: 'Annual family gather and food stalls.' },
    { id: 'e2', title: 'Parent-Teacher Meet', date: '2024-04-25', time: '02:00 PM', type: 'academic', description: 'Quarterly review of academic progress.' },
  ]);

  const [highlights, setHighlights] = useState<string[]>([]);
  const [recentActivities, setRecentActivities] = useState<{ time: string; event: string; photo?: string }[]>([
    { time: '09:00 AM', event: 'Arrival & Morning Circle' },
    { time: '10:30 AM', event: 'Art Session: Fine Arts', photo: 'https://picsum.photos/seed/art/800/400' },
  ]);

  const toggleAttendance = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, attendance_status: !s.attendance_status } : s));
  };

  const addStar = (count: number) => {
    setStars(prev => prev + count);
  };

  const addActivity = (activity: { time: string; event: string; photo?: string }) => {
    setRecentActivities(prev => [...prev, activity]);
  };

  const addHighlight = (url: string) => {
    setHighlights(prev => [...prev, url]);
  };

  return (
    <StateContext.Provider value={{ 
      students, 
      teachers,
      classes,
      fees,
      events,
      activeTab,
      setActiveTab,
      toggleAttendance, 
      addStar, 
      stars, 
      recentActivities, 
      addActivity,
      highlights,
      addHighlight
    }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
}
