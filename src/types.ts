export type UserRole = 'admin' | 'educator';
export type LearningLevel = 'Playgroup' | 'Pre-Nursery' | 'Nursery' | 'Kindergarten';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  name: string;
  age: string;
  level: LearningLevel;
  parentName: string;
  attendance: number;
  progress: number;
  avatar?: string;
  milestones: Milestone[];
  academicSummary?: string; // AI generated
}

export interface Milestone {
  id: string;
  title: string;
  category: 'cognitive' | 'social' | 'physical' | 'emotional';
  status: 'completed' | 'in-progress' | 'not-started';
  date?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  status: 'active' | 'on-leave';
  avatar?: string;
  experience: string;
}

export interface Class {
  id: string;
  name: string;
  teacherId: string;
  studentsCount: number;
  level: LearningLevel;
  schedule: string;
}

export interface Fee {
  id: string;
  studentId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'academic' | 'sports' | 'holiday' | 'cultural';
  description: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'game' | 'story' | 'printable';
  category: string;
  ageGroup: string;
  thumbnail: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}
