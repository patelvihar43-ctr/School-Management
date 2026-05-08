import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  MoreVertical, 
  Plus,
  Sparkles,
  Search,
  Filter,
  Play,
  Music,
  PenTool,
  Hash,
  ArrowUpRight,
  Calendar as CalendarIcon,
  MessageCircle,
  Award,
  BarChart3,
  Leaf,
  Baby,
  Heart,
  Smile,
  Star,
  Bell,
  User,
  Settings,
  Home,
  Activity,
  TrendingUp,
  Camera,
  Video,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAppState } from '@/context/StateContext';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';

// Helper for premium icon containers
const IconBox = ({ icon: Icon, color, bg, className }: { icon: any, color: string, bg: string, className?: string }) => (
  <div className={cn("rounded-2xl p-4 flex items-center justify-center shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3", bg, className)}>
    <Icon size={24} style={{ color }} strokeWidth={1.5} />
  </div>
);

// Mock Data for Kindergarten Sections
const studentsData = {
  nursery: [
    { id: 1, name: "Maya Sharma", level: "Nursery A", progress: 84, avatar: "MS", attendance: true, parentMsg: "Loves storytelling", skills: ["Phonics", "Counting"] },
    { id: 2, name: "Arjun Kapoor", level: "Nursery B", progress: 76, avatar: "AK", attendance: true, parentMsg: "Needs help with phonics", skills: ["Colors", "Shapes"] },
    { id: 3, name: "Ishita Roy", level: "Nursery A", progress: 92, avatar: "IR", attendance: false, parentMsg: "Excelling in art", skills: ["Drawing", "Rhymes"] },
    { id: 4, name: "Reyansh Nair", level: "Nursery B", progress: 68, avatar: "RN", attendance: true, parentMsg: "Great social skills", skills: ["Play", "Sharing"] }
  ],
  playgroup: [
    { id: 5, name: "Zara Khan", level: "Playgroup", progress: 79, avatar: "ZK", attendance: true, skills: ["Sensory", "Music"] },
    { id: 6, name: "Vihaan Reddy", level: "Playgroup", progress: 88, avatar: "VR", attendance: true, skills: ["Motor Skills", "Colors"] },
    { id: 7, name: "Anaya Verma", level: "Playgroup", progress: 94, avatar: "AV", attendance: false, skills: ["Social", "Language"] }
  ],
  prenursery: [
    { id: 8, name: "Aarav Singh", level: "Pre-Nursery", progress: 71, avatar: "AS", attendance: true, skills: ["Sensory", "Gross Motor"] },
    { id: 9, name: "Kiara Mehta", level: "Pre-Nursery", progress: 83, avatar: "KM", attendance: true, skills: ["Object Permanence", "Tracking"] },
    { id: 10, name: "Rohan Das", level: "Pre-Nursery", progress: 65, avatar: "RD", attendance: false, skills: ["Cause & Effect"] }
  ]
};

const performanceTrend = [
  { week: 'W1', score: 68 },
  { week: 'W2', score: 74 },
  { week: 'W3', score: 79 },
  { week: 'W4', score: 83 },
  { week: 'W5', score: 86 },
  { week: 'W6', score: 90 }
];

const attendanceWeekly = [
  { day: 'Mon', rate: 92 },
  { day: 'Tue', rate: 88 },
  { day: 'Wed', rate: 94 },
  { day: 'Thu', rate: 91 },
  { day: 'Fri', rate: 85 }
];

const activitiesList = {
  nursery: [
    { title: "Phonics Circle", time: "9:30 AM", duration: "30 min", participants: 8, type: "Language" },
    { title: "Number Hunt", time: "10:30 AM", duration: "25 min", participants: 8, type: "Math" },
    { title: "Story & Puppets", time: "11:45 AM", duration: "20 min", participants: 8, type: "Literacy" }
  ],
  playgroup: [
    { title: "Sensory Play", time: "9:45 AM", duration: "35 min", participants: 6, type: "Exploration" },
    { title: "Music & Movement", time: "10:45 AM", duration: "25 min", participants: 6, type: "Gross Motor" },
    { title: "Color Sorting", time: "11:30 AM", duration: "20 min", participants: 6, type: "Cognitive" }
  ],
  prenursery: [
    { title: "Tummy Time Songs", time: "9:30 AM", duration: "15 min", participants: 4, type: "Motor" },
    { title: "Peek-a-boo Play", time: "10:15 AM", duration: "15 min", participants: 4, type: "Social" },
    { title: "Sensory Bags", time: "11:00 AM", duration: "20 min", participants: 4, type: "Sensory" }
  ]
};

const curriculumThemes = {
  nursery: { theme: "Animals & Habitats", activity: "Build a mini habitat", focus: "Language & Science" },
  playgroup: { theme: "Sensory Exploration", activity: "Texture collage", focus: "Motor & Sensory" },
  prenursery: { theme: "Colors & Shapes", activity: "Soft block stacking", focus: "Visual & Gross Motor" }
};

const currentYear = new Date().getFullYear();
const monthMap: Record<string, number> = { 'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11 };

const upcomingEvents = [
  { date: '15', month: 'Apr', title: 'Spring Festival', type: 'Event', color: 'indigo' },
  { date: '18', month: 'Apr', title: 'Parent-Teacher Meeting', type: 'Meeting', color: 'amber' },
  { date: '22', month: 'Apr', title: 'Earth Day Activities', type: 'Activity', color: 'emerald' },
  { date: '01', month: 'May', title: 'Labor Day', type: 'Holiday', color: 'rose' },
  { date: '05', month: 'May', title: 'Science Fair', type: 'Event', color: 'indigo' },
  { date: '12', month: 'May', title: 'Teacher Planning', type: 'Meeting', color: 'amber' },
  { date: '25', month: 'May', title: 'Memorial Day', type: 'Holiday', color: 'rose' },
  { date: '28', month: 'May', title: 'End of Year Picnic', type: 'Event', color: 'indigo' },
];

const eventDates = upcomingEvents.map(event => new Date(currentYear, monthMap[event.month], parseInt(event.date)));
const holidayDates = upcomingEvents.filter(e => e.type === 'Holiday').map(event => new Date(currentYear, monthMap[event.month], parseInt(event.date)));
const meetingDates = upcomingEvents.filter(e => e.type === 'Meeting').map(event => new Date(currentYear, monthMap[event.month], parseInt(event.date)));

import EventsView from './EventsView';
import StudentsView from './StudentsView';
import CommunicationView from './CommunicationView';
import SettingsView from './SettingsView';
import AttendanceView from './AttendanceView';
import ContentView from './ContentView';
import ActivitiesView from './ActivitiesView';

export default function KindergartenDashboard() {
  const { activeTab, setActiveTab } = useAppState();
  
  if (activeTab === 'events') {
    return <EventsView />;
  }

  if (activeTab === 'students') {
    return <StudentsView />;
  }

  if (activeTab === 'communication' || activeTab === 'dashboard-communication') {
    return <CommunicationView />;
  }

  if (activeTab === 'settings') {
    return <SettingsView />;
  }
  
  if (activeTab === 'attendance' || activeTab === 'dashboard-attendance') {
    return <AttendanceView />;
  }

  if (activeTab === 'content') {
    return <ContentView />;
  }

  if (activeTab === 'activities' || activeTab === 'dashboard-activities') {
    return <ActivitiesView />;
  }

  const [date, setDate] = useState<Date | undefined>();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<string | null>(null);
  const [attendanceStatus, setAttendanceStatus] = useState(studentsData);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  
  const [activitiesState, setActivitiesState] = useState(activitiesList);
  const [messages, setMessages] = useState([
    { parent: "Mrs. Mehra", child: "Aarav", msg: "Will you provide lunch tomorrow for the farm visit?", time: "10 mins ago" },
    { parent: "Dr. Kapoor", child: "Sara", msg: "Sara has a slight cough, please check her temperature at 1 PM.", time: "45 mins ago" },
    { parent: "Mr. Reddy", child: "Vihaan", msg: "He forgot his water bottle in the playground yesterday.", time: "1 hour ago" },
  ]);
  const [broadcasts, setBroadcasts] = useState([
    { sender: 'Academic Office', subject: 'End of Term Assessment Protocols', time: '2 hours ago', status: 'Delivered', priority: 'High' },
    { sender: 'Pedagogical Lead', subject: 'Revised Montessori Integration', time: '5 hours ago', status: 'Read', priority: 'Medium' },
    { sender: 'Finance Vertical', subject: 'Fee Increment Narrative 2024', time: 'Yesterday', status: 'Delivered', priority: 'Standard' },
    { sender: 'Facility Management', subject: 'Summer Renovation Timeline', time: '2 days ago', status: 'Scheduled', priority: 'Low' },
  ]);
  
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const totalStudents = Object.values(studentsData).flat().length;
  const avgAttendance = Math.round(
    Object.values(attendanceStatus).flat().filter(s => s.attendance).length / totalStudents * 100
  );

  const toggleAttendance = (section: keyof typeof attendanceStatus, studentId: number) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [section]: prev[section].map(s => 
        s.id === studentId ? { ...s, attendance: !s.attendance } : s
      )
    }));
  };

  const commitDailyRecord = () => {
    showToast("📋 Daily attendance record committed successfully.");
  };

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const theme = activeTab !== 'overview' && activeTab in curriculumThemes 
      ? curriculumThemes[activeTab as keyof typeof curriculumThemes] 
      : { theme: "Seasons & Nature", focus: "Holistic Development", activity: "Nature Walk" };
      setLessonPlan(`
### 🌟 ${activeTab !== 'overview' ? activeTab.toUpperCase() : 'Kindergarten'} Lesson Plan: ${theme.theme}

**Learning Focus:** ${theme.focus}

**Morning Circle (15 min)**
- Welcome song: "Hello, Dear Friends"
- Weather and calendar discussion
- Introduce theme with picture cards

**Main Activity (25 min)**
- ${activeTab === 'nursery' ? 'Animal habitat sorting with toy figures' : activeTab === 'playgroup' ? 'Sensory bins with rice and scoops' : 'Soft shape exploration with pillows'}

**Creative Time (20 min)**
- Art: ${theme.activity}

**Story & Closing (15 min)**
- Related storybook reading
- Reflection and goodbye song

**Assessment:** Observation checklist for engagement and skill demonstration
      `);
      setIsGenerating(false);
    }, 1500);
  };

  const handleShareHighlight = (type: 'photo' | 'video') => {
    showToast(`✨ ${type === 'photo' ? 'Photo' : 'Video'} shared with parents! A special moment captured.`);
  };

  const handleReply = (parent: string) => {
    showToast(`Drafting reply to ${parent}...`);
  };

  const handleArchive = (parent: string) => {
    setMessages(prev => prev.filter(m => m.parent !== parent));
    showToast(`Message from ${parent} archived.`);
  };

  const handleAddActivity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const time = formData.get('time') as string;
    const type = formData.get('type') as string;
    const duration = formData.get('duration') as string;

    let targetSection: 'nursery' | 'playgroup' | 'prenursery' = 'nursery';
    if (activeTab === 'playgroup' || activeTab === 'prenursery') {
      targetSection = activeTab;
    }
    
    setActivitiesState(prev => ({
      ...prev,
      [targetSection]: [
        ...prev[targetSection],
        { title, time, duration, participants: 8, type }
      ]
    }));
    
    setIsActivityModalOpen(false);
    showToast(`✅ Scheduled: ${title}`);
  };

  const handleBroadcast = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const subject = formData.get('subject') as string;
    
    setBroadcasts(prev => [
      { sender: 'You (Educator)', subject, time: 'Just now', status: 'Sent', priority: 'High' },
      ...prev
    ]);
    
    setIsBroadcastModalOpen(false);
    showToast(`📢 Broadcast sent: ${subject}`);
  };

  // Stats cards data
  const stats = [
    { label: 'Total Children', value: totalStudents, icon: Users, color: '#6366f1', bg: 'bg-indigo-50/50' },
    { label: 'Daily Attendance', value: `${avgAttendance}%`, icon: CheckCircle2, color: '#10b981', bg: 'bg-emerald-50/50' },
    { label: 'Active Classes', value: '3', icon: BookOpen, color: '#f59e0b', bg: 'bg-amber-50/50' },
    { label: 'Parent Messages', value: '8', icon: MessageCircle, color: '#8b5cf6', bg: 'bg-purple-50/50' },
  ];

  // Simple bar chart component
  const SimpleBarChart = ({ data, color }: { data: typeof performanceTrend, color: string }) => (
    <div className="flex items-end gap-2 h-40 mt-4">
      {data.map((item, idx) => (
        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-indigo-100 rounded-full overflow-hidden" style={{ height: `${item.score * 0.8}px`, maxHeight: '100px' }}>
            <div className="h-full rounded-full" style={{ width: '100%', height: `${item.score * 0.8}px`, maxHeight: '100px', backgroundColor: color }} />
          </div>
          <span className="text-[10px] font-medium text-slate-500">{item.week}</span>
          <span className="text-[11px] font-semibold text-indigo-600">{item.score}%</span>
        </div>
      ))}
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-10 animate-fadeIn">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-sm border border-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={80} style={{ color: stat.color }} />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <IconBox icon={stat.icon} color={stat.color} bg={stat.bg} className="mb-6 h-16 w-16" />
                <span className="text-4xl font-bold text-slate-900 tracking-tight tabular-nums">{stat.value}</span>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Primary Analytics Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          className="lg:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 h-[400px]"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex-[0.8] flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <CalendarIcon size={16} />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Schedule Hub</h3>
                 <p className="text-[10px] font-medium text-slate-400 mt-1">Events & Holidays Tracker</p>
              </div>
            </div>
            <div className="flex-1 bg-slate-50/50 rounded-[1.5rem] p-2 flex items-center justify-center border border-slate-100 min-h-0">
               <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  onMonthChange={setCurrentMonth}
                  month={currentMonth}
                  className="rounded-md border-0 bg-transparent text-slate-800 scale-90"
                  modifiers={{
                    event: eventDates,
                    holiday: holidayDates,
                    meeting: meetingDates,
                  }}
                  modifiersClassNames={{
                    event: "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-indigo-500 after:rounded-full relative",
                    holiday: "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-rose-500 after:rounded-full relative font-bold text-rose-600",
                    meeting: "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-amber-500 after:rounded-full relative",
                  }}
                  classNames={{
                    day_selected: "bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white focus:bg-indigo-600 focus:text-white after:bg-white",
                    day_today: "bg-slate-100 text-slate-900",
                  }}
                />
            </div>
          </div>
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="mb-4 flex justify-between items-center shrink-0">
              <h4 className="text-sm font-bold text-slate-900">
                {date ? `Events on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : `${currentMonth.toLocaleString('default', { month: 'long' })} Events`}
              </h4>
              <Badge variant="outline" className="text-[9px] px-2 py-0 h-5">
                {date ? 'Selected Date' : 'This Month'}
              </Badge>
            </div>
            <ScrollArea className="flex-1 -mx-2 px-2">
              <div className="space-y-2 pb-4">
                {(() => {
                  let filteredEvents = [];
                  
                  if (date) {
                    // Show only selected day's events
                    filteredEvents = upcomingEvents.filter(e => {
                      const eventDate = new Date(currentYear, monthMap[e.month], parseInt(e.date));
                      return eventDate.getDate() === date.getDate() && eventDate.getMonth() === date.getMonth();
                    });
                  } else {
                    // Display all events for the current month shown in the calendar
                    filteredEvents = upcomingEvents.filter(e => {
                      const eventDate = new Date(currentYear, monthMap[e.month], parseInt(e.date));
                      return eventDate.getMonth() === currentMonth.getMonth();
                    });
                  }
                    
                  if (filteredEvents.length === 0) {
                    return (
                      <div className="flex flex-col items-center justify-center p-6 text-center h-40">
                        <CalendarIcon size={24} className="text-slate-200 mb-2" />
                        <p className="text-xs font-medium text-slate-500">
                          {date ? "No events scheduled for this day" : "No events scheduled this month"}
                        </p>
                      </div>
                    );
                  }

                  return filteredEvents.map((event, i) => (
                    <div key={i} className="flex gap-3 items-center p-2 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                      <div className={cn("h-10 w-10 rounded-xl flex flex-col items-center justify-center shrink-0 border border-slate-100 bg-white shadow-sm group-hover:scale-105 transition-transform", `text-${event.color}-600`)}>
                        <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{event.month}</span>
                        <span className="text-sm font-black leading-none mt-0.5">{event.date}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-xs">{event.title}</p>
                        <span className={cn("text-[9px] font-bold uppercase tracking-widest mt-0.5 block", `text-${event.color}-500`)}>{event.type}</span>
                      </div>
                      {date && (
                        <div className="h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowUpRight size={12} />
                        </div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </ScrollArea>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden group h-[400px] flex flex-col"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="absolute -bottom-20 -right-20 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <CheckCircle2 size={240} className="text-indigo-600" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold tracking-tight text-slate-900">Active Presence</h3>
            <p className="text-slate-400 text-sm mt-1">Weekly attendance heartbeat</p>
            
            <div className="mt-12 space-y-6">
              {attendanceWeekly.map((day) => (
                <div key={day.day} className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 w-8">{day.day}</span>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.3)]" 
                      initial={{ width: 0 }}
                      animate={{ width: `${day.rate}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-[10px] font-black tabular-nums text-slate-600">{day.rate}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Student & Curriculum Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Spotlight</h3>
            <Button variant="ghost" className="h-10 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-indigo-600">Full Roster</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {Object.values(studentsData).flat().slice(0, 4).map((student) => (
              <motion.div 
                key={student.id} 
                whileHover={{ y: -4 }}
                className="group flex items-center gap-6 p-4 rounded-[2rem] bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer border border-transparent hover:border-slate-100"
              >
                <div className="h-16 w-16 rounded-2xl bg-white shadow-sm flex items-center justify-center ring-4 ring-slate-100 group-hover:ring-indigo-50 transition-all">
                  <span className="text-indigo-600 font-bold text-xl">{student.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-slate-800 truncate">{student.name}</span>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">{student.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-indigo-500 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${student.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 bg-indigo-600 rounded-[3rem] p-10 shadow-xl text-white relative overflow-hidden">
          <Music size={120} className="absolute -bottom-10 -right-10 opacity-10" />
          <h3 className="text-2xl font-bold tracking-tight">Essential Assets</h3>
          <p className="text-indigo-100/70 text-sm mt-1">Interactive classroom tools</p>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { icon: Music, label: 'Rhymes', bg: 'bg-white/10' },
              { icon: PenTool, label: 'Art', bg: 'bg-white/10' },
              { icon: Hash, label: 'Math', bg: 'bg-white/10' },
              { icon: Sparkles, label: 'Stories', bg: 'bg-white/10' },
            ].map((item) => (
              <motion.div 
                key={item.label} 
                whileHover={{ scale: 1.05 }}
                className={cn("flex flex-col items-center gap-3 p-6 rounded-[2rem] cursor-pointer transition-all hover:bg-white/20", item.bg)}
              >
                <item.icon size={24} strokeWidth={1.5} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div whileHover={{ y: -8 }}>
          <div className="bg-gradient-to-br from-indigo-700 to-indigo-500 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden group cursor-pointer">
            <Sparkles size={200} className="absolute -bottom-20 -right-20 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            <div className="relative z-10">
              <h3 className="text-4xl font-bold tracking-tight">AI Lesson Architect</h3>
              <p className="text-lg text-indigo-100/90 mt-4 max-w-sm">Synthesize pedagogically structured plans optimized for early age learning.</p>
              <Button 
                onClick={() => setIsPlannerOpen(true)}
                className="mt-10 bg-white text-indigo-600 hover:bg-slate-50 h-16 px-10 rounded-2xl font-bold uppercase tracking-widest shadow-xl transition-all"
              >
                Construct Intelligence
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -8 }}>
          <div className="bg-amber-50 rounded-[3rem] p-12 border border-amber-100 shadow-sm relative overflow-hidden group cursor-pointer">
            <Heart size={200} className="absolute -bottom-20 -right-20 text-amber-500/10 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Behavioral Pulse</h3>
              <p className="text-lg text-slate-500 mt-4 max-w-sm">Capture and broadcast student milestones directly to parent ecosystems.</p>
              <div className="flex gap-4 mt-10">
                <Button 
                  onClick={() => handleShareHighlight('photo')}
                  className="flex-1 bg-white border-2 border-slate-100 text-slate-800 hover:bg-slate-50 h-16 rounded-2xl font-bold uppercase tracking-widest shadow-sm"
                >
                  <Camera size={18} className="mr-2" /> Highlight
                </Button>
                <Button 
                  onClick={() => handleShareHighlight('video')}
                  className="flex-1 bg-white border-2 border-slate-100 text-slate-800 hover:bg-slate-50 h-16 rounded-2xl font-bold uppercase tracking-widest shadow-sm"
                >
                  <Video size={18} className="mr-2" /> Record
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderClassSection = (type: 'nursery' | 'playgroup' | 'prenursery') => {
    const students = attendanceStatus[type];
    const presentCount = students.filter(s => s.attendance).length;
    let totalProgress = 0;
    students.forEach(s => { totalProgress += s.progress; });
    const avgProgress = students.length > 0 ? Math.round(totalProgress / students.length) : 0;
    const theme = curriculumThemes[type];
    const activities = activitiesState[type];
    
    const sectionTitles = {
      nursery: { title: 'Nursery', icon: Leaf, color: 'indigo', gradient: 'from-indigo-50 to-white' },
      playgroup: { title: 'Playgroup', icon: Baby, color: 'emerald', gradient: 'from-emerald-50 to-white' },
      prenursery: { title: 'Pre-Nursery', icon: Heart, color: 'amber', gradient: 'from-amber-50 to-white' }
    };
    
    const info = sectionTitles[type];
    
    return (
      <div className="space-y-6 animate-fadeIn">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-xl bg-${info.color}-100`}>
                <info.icon size={20} className={`text-${info.color}-600`} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">{info.title} Class</h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">Age {type === 'prenursery' ? '1.5-2.5 years' : type === 'playgroup' ? '2.5-3.5 years' : '3.5-4.5 years'}</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
              <span className="text-xs font-medium text-slate-500">Present Today</span>
              <span className="ml-2 text-lg font-bold text-slate-800">{presentCount}/{students.length}</span>
            </div>
            <button 
              onClick={() => setIsActivityModalOpen(true)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition"
            >
              + Add Activity
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg"><Award size={18} className="text-emerald-500" /></div>
              <div><span className="text-2xl font-bold text-slate-800">{avgProgress}%</span><p className="text-xs text-slate-500">Avg. Mastery</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 rounded-lg"><CalendarIcon size={18} className="text-amber-500" /></div>
              <div><span className="text-sm font-bold text-slate-800">{theme.theme}</span><p className="text-xs text-slate-500">Weekly Theme</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg"><Star size={18} className="text-purple-500" /></div>
              <div><span className="text-sm font-bold text-slate-800">{theme.focus}</span><p className="text-xs text-slate-500">Learning Focus</p></div>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">👧🏽 Student Roster</h3>
          <div className="divide-y divide-slate-100">
            {students.map(student => (
              <div key={student.id} className="group py-6 flex flex-wrap items-center justify-between gap-4 transition-all hover:px-2 rounded-2xl hover:bg-slate-50">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 rounded-2xl bg-white shadow-sm ring-4 ring-slate-100 group-hover:ring-indigo-50 transition-all">
                    <AvatarFallback className="font-bold text-indigo-600">{student.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{student.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="hidden sm:block w-32">
                    <div className="flex justify-between text-[10px] font-bold mb-2">
                      <span className="text-slate-400 uppercase tracking-widest">Mastery</span>
                      <span className="text-indigo-600">{student.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${student.progress}%` }}
                        className="h-full bg-indigo-500 rounded-full" 
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleAttendance(type, student.id)}
                    className={cn(
                      "px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-sm active:scale-95",
                      student.attendance 
                        ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                        : 'bg-white border border-slate-200 text-slate-400'
                    )}
                  >
                    {student.attendance ? 'Present' : 'Absent'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Activities */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">📋 Today's Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activities.map((act, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">{act.type}</span>
                  <span className="text-xs text-slate-500">{act.duration}</span>
                </div>
                <p className="font-semibold text-slate-800">{act.title}</p>
                <p className="text-xs text-slate-500 mt-2">🕐 {act.time} • 👥 {act.participants} kids</p>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum Plan */}
        <div className="bg-gradient-to-r from-indigo-50 to-white rounded-2xl p-6 border border-indigo-100">
          <h3 className="font-semibold text-slate-800">📖 Weekly Curriculum Plan</h3>
          <p className="text-sm text-slate-600 mt-2">
            <strong>Theme:</strong> {theme.theme} • <strong>Main Activity:</strong> {theme.activity}
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-slate-200">📚 Story: Related book</span>
            <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-slate-200">🎵 Song: Theme song</span>
            <span className="text-xs bg-white px-3 py-1.5 rounded-full border border-slate-200">🎨 Art: {theme.activity}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderAttendance = () => {
    const allStudents = Object.entries(attendanceStatus).flatMap(([section, students]) => 
      students.map(s => ({ ...s, section }))
    );
    
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Pedagogical Attendance</h2>
            <p className="text-sm font-medium text-slate-400 mt-1">Audit daily presence across all kindergarten sections</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
            <CalendarIcon size={18} className="text-indigo-600" />
            <span className="text-sm font-bold text-slate-700 tracking-tight">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>

        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="divide-y divide-slate-50">
            {allStudents.map(student => (
              <motion.div 
                key={student.id} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 flex flex-wrap items-center justify-between gap-6 group hover:bg-slate-50 transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className="h-16 w-16 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center ring-4 ring-white shadow-xl">
                    <span className="text-indigo-600 font-bold text-xl">{student.avatar}</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900 tracking-tight">{student.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{student.section} • {student.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <button 
                    onClick={() => toggleAttendance(student.section as keyof typeof attendanceStatus, student.id)}
                    className={cn(
                      "px-10 py-4 rounded-[1.25rem] text-xs font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95",
                      student.attendance 
                        ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                        : 'bg-white border border-slate-200 text-slate-400 shadow-sm'
                    )}
                  >
                    {student.attendance ? 'Verified Present' : 'Mark Absent'}
                  </button>
                  <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl text-slate-300"><MoreVertical size={20} /></Button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-10 bg-slate-50 border-t border-slate-100">
            <Button onClick={commitDailyRecord} className="w-full bg-indigo-600 text-white h-16 rounded-2xl font-bold uppercase tracking-widest hover:bg-indigo-700 shadow-2xl shadow-indigo-500/20">
              Commit Daily Record
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderActivities = () => {
    let currentSectionKey: 'nursery' | 'playgroup' | 'prenursery' = 'nursery';
    if (activeTab === 'playgroup' || activeTab === 'prenursery') {
      currentSectionKey = activeTab;
    }
    const dailyActivities = activitiesState[currentSectionKey];
    
    return (
      <div className="space-y-10 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Active Learning Pulse</h2>
            <p className="text-sm font-medium text-slate-400 mt-1">High-engagement activities for development blocks</p>
          </div>
          <Button onClick={() => setIsActivityModalOpen(true)} className="bg-indigo-600 rounded-2xl h-12 px-6 flex items-center gap-2 shadow-lg shadow-indigo-600/20">
            <Plus size={18} /> Schedule Activity
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[3rem] p-10 text-slate-900 shadow-sm border border-slate-100 relative overflow-hidden">
              <Clock size={120} className="absolute -bottom-10 -right-10 opacity-5 text-indigo-600" />
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Current Interval</h3>
              <div className="mt-8 space-y-2">
                <p className="text-4xl font-bold tabular-nums text-indigo-600">11:15 <span className="text-slate-400 text-2xl">AM</span></p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none">Post-Brunch Exploration</p>
              </div>
              <div className="mt-12 p-6 rounded-[2rem] bg-indigo-50/50 border border-indigo-100 shadow-inner">
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">Next Transition</p>
                <p className="text-sm font-black text-slate-900">11:45 AM • Nap Prep</p>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-8 shadow-sm border border-slate-100 italic text-slate-500 text-sm leading-relaxed">
              "Play is often talked about as if it were a relief from serious learning. But for children, play is serious learning."
              <p className="mt-4 font-bold tracking-widest text-slate-900 uppercase text-[10px]">— Fred Rogers</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">Daily Schedule Flow</h3>
              <div className="space-y-4">
                {dailyActivities.map((activity, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 p-6 rounded-[2rem] bg-slate-50 border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all duration-500 cursor-pointer group"
                  >
                    <div className="h-14 w-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                      {activity.type === 'Language' ? <MessageCircle size={24} /> : activity.type === 'Math' ? <Hash size={24} /> : <Sparkles size={24} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 truncate">{activity.title}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{activity.time} • {activity.duration}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(n => (
                          <div key={n} className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">👶</div>
                        ))}
                        <div className="h-8 w-8 rounded-full bg-indigo-50 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-600">+{activity.participants - 3}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCommunication = () => (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Parent Ecosystem</h2>
          <p className="text-sm font-medium text-slate-400 mt-1">Real-time engagement and feedback loops</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <Button variant="ghost" className="rounded-xl h-10 px-4 text-xs font-bold uppercase tracking-widest">Inbox</Button>
          <Button variant="ghost" className="rounded-xl h-10 px-4 text-xs font-bold uppercase tracking-widest text-slate-400">Broadcast</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-8 tracking-tight">Recent Inquiries</h3>
            <div className="space-y-6">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-slate-400">All caught up! No recent inquiries.</div>
              ) : messages.map((m, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex gap-6 p-8 rounded-[2.5rem] bg-slate-50/50 hover:bg-white hover:shadow-2xl transition-all duration-500 cursor-pointer border border-transparent hover:border-slate-100"
                >
                  <Avatar className="h-14 w-14 rounded-2xl ring-4 ring-white group-hover:ring-indigo-50 transition-all">
                    <AvatarFallback className="bg-amber-100 text-amber-700 font-bold">{m.parent[5] || m.parent[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-slate-900">{m.parent} <span className="text-slate-400 font-medium ml-2">• {m.child}'s Parent</span></p>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest tabular-nums">{m.time}</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">{m.msg}</p>
                    <div className="flex gap-4 mt-6">
                      <Button onClick={() => handleReply(m.parent)} variant="ghost" className="h-9 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50/50">Reply</Button>
                      <Button onClick={() => handleArchive(m.parent)} variant="ghost" className="h-9 px-4 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400">Archive</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-indigo-600 rounded-[3rem] p-10 text-white shadow-xl relative overflow-hidden group">
            <Sparkles size={120} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold tracking-tight">Global Bulletin</h3>
            <p className="text-indigo-100/70 text-sm mt-2">Broadcast to all parents</p>
            
            <div className="mt-8 space-y-4">
              {broadcasts.slice(0, 2).map((b, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white/10 backdrop-blur-sm border border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200">{b.sender} • {b.priority}</p>
                  <p className="font-bold mt-2 leading-tight text-white">{b.subject}</p>
                  <p className="text-[10px] font-medium text-indigo-100/70 mt-1">{b.time}</p>
                </div>
              ))}
              <Button onClick={() => setIsBroadcastModalOpen(true)} className="w-full bg-white text-indigo-600 h-14 rounded-2xl font-bold uppercase tracking-widest hover:bg-indigo-50 shadow-lg">New Bulletin</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudents = () => {
    const allStudents = Object.entries(attendanceStatus).flatMap(([section, students]) => 
      students.map(s => ({ ...s, section }))
    );
    
    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Student Directory</h2>
            <p className="text-sm font-medium text-slate-400 mt-1">Holistic overview of all assigned scholars</p>
          </div>
          <Button className="bg-indigo-600 text-white rounded-2xl h-12 px-6 font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20">
            <Plus size={18} className="mr-2 inline" /> Add Student
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allStudents.map(student => (
            <motion.div key={student.id} whileHover={{ y: -5 }} className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center cursor-pointer group hover:shadow-xl transition-all">
              <Avatar className="h-24 w-24 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center ring-4 ring-white shadow-xl mb-4 group-hover:scale-105 transition-transform">
                <AvatarFallback className="text-indigo-600 font-bold text-2xl">{student.avatar}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-slate-900">{student.name}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{student.section} • {student.level}</p>
              
              <div className="w-full mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mastery</p>
                  <p className="text-lg font-bold text-indigo-600">{student.progress}%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                  <Badge className={cn("mt-1 border-none shadow-sm text-[9px] font-bold uppercase tracking-widest rounded-lg px-2", student.attendance ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400')}>{student.attendance ? 'Present' : 'Absent'}</Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderClasses = () => {
    const classSections = [
      { id: 'nursery', title: 'Nursery', icon: Leaf, color: 'indigo', textClass: 'text-indigo-600', bgClass: 'bg-indigo-50', age: '3.5-4.5', students: attendanceStatus.nursery.length },
      { id: 'playgroup', title: 'Playgroup', icon: Baby, color: 'emerald', textClass: 'text-emerald-600', bgClass: 'bg-emerald-50', age: '2.5-3.5', students: attendanceStatus.playgroup.length },
      { id: 'prenursery', title: 'Pre-Nursery', icon: Heart, color: 'amber', textClass: 'text-amber-500', bgClass: 'bg-amber-50', age: '1.5-2.5', students: attendanceStatus.prenursery.length }
    ];

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Active Classes</h2>
            <p className="text-sm font-medium text-slate-400 mt-1">Manage cohorts and learning blocks</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classSections.map(cls => (
            <motion.div key={cls.id} onClick={() => setActiveTab(cls.id)} whileHover={{ y: -8 }} className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 cursor-pointer group hover:shadow-xl transition-all relative overflow-hidden">
              <div className={cn("absolute -right-6 -top-6 opacity-5 group-hover:scale-110 transition-transform", cls.textClass)}>
                <cls.icon size={120} />
              </div>
              <div className={cn("h-16 w-16 rounded-2xl flex items-center justify-center mb-6", cls.bgClass)}>
                <cls.icon size={28} className={cls.textClass} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{cls.title}</h3>
              <p className="text-xs font-semibold text-slate-500 mt-2">Age {cls.age} years</p>
              
              <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-600">{cls.students} Scholars</span>
                </div>
                <ArrowUpRight size={20} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview();
      case 'nursery': return renderClassSection('nursery');
      case 'playgroup': return renderClassSection('playgroup');
      case 'prenursery': return renderClassSection('prenursery');
      case 'students': return renderStudents();
      case 'classes': return renderClasses();
      case 'dashboard-attendance':
      case 'attendance': 
        return <AttendanceView />;
      case 'dashboard-activities':
      case 'activities': 
        return <ActivitiesView />;
      case 'dashboard-communication':
      case 'communication': 
        return renderCommunication();
      // Added placeholders for common sidebar routes
      case 'content':
        return <ContentView />;
      case 'events':
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="h-24 w-24 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6 border border-slate-100">
              <Sparkles size={40} className="text-indigo-600 opacity-20" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight capitalize">{activeTab} Module Active</h3>
            <p className="text-sm font-medium text-slate-400 mt-2">This pedagogic system is currently receiving structural upgrades.</p>
          </div>
        );
      default: return renderOverview();
    }
  };

  // Tab buttons configuration
  // The 'dashboard-' prefix separates them from sidebar IDs so the tabs stay open when rendering internal views.
  const tabs: { id: string; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Command Hub', icon: Home },
    { id: 'nursery', label: 'Nursery', icon: Leaf },
    { id: 'playgroup', label: 'Playgroup', icon: Baby },
    { id: 'prenursery', label: 'Nesting', icon: Heart },
    { id: 'dashboard-attendance', label: 'Registry', icon: CheckCircle2 },
    { id: 'dashboard-activities', label: 'Engagement', icon: Activity },
    { id: 'dashboard-communication', label: 'Nexus', icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Top Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-600/20">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Little Minds</h1>
              <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">Educator Command</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-2xl px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Pedagogical Core Online</span>
            </div>
            <button className="h-12 w-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors shadow-sm relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-accent" />
            </button>
            <div className="h-12 w-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl cursor-pointer">
              <User size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Tab Navigation - Only visible when in the dashboard group */}
        {tabs.some(t => t.id === activeTab) && (
          <div className="flex flex-wrap gap-3 mb-12">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-[11px] font-bold uppercase tracking-widest transition-all shadow-sm",
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20'
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100'
                )}
              >
                <tab.icon size={16} strokeWidth={2.5} />
                {tab.label}
              </motion.button>
            ))}
          </div>
        )}

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* AI Lesson Planner Modal */}
      <AnimatePresence>
        {isPlannerOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" 
              onClick={() => setIsPlannerOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-4xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-10 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-xl shadow-indigo-600/20">
                    <Sparkles size={28} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Lesson Architect</h2>
                    <p className="text-sm font-medium text-slate-400 mt-1 italic">Pedagogically optimized plans via Artificial Intelligence</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsPlannerOpen(false)} className="h-12 w-12 rounded-2xl hover:bg-slate-50">
                  <X size={24} className="text-slate-400" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Thematic Focus</label>
                    <div className="relative group">
                      <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                      <input 
                        type="text" 
                        placeholder="e.g. Life Under the Sea" 
                        className="w-full pl-16 pr-6 h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all text-sm font-bold placeholder:font-normal"
                        id="topicInput"
                        defaultValue={activeTab !== 'overview' ? curriculumThemes[activeTab as keyof typeof curriculumThemes]?.theme : "Seasons & Nature"}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Age Tier</label>
                    <div className="relative group">
                      <Users className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                      <input 
                        type="text" 
                        placeholder="Nursery / Playgroup" 
                        className="w-full pl-16 pr-6 h-16 rounded-2xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all text-sm font-bold placeholder:font-normal"
                        id="classInput"
                        defaultValue={activeTab !== 'overview' ? activeTab : "Kindergarten"}
                      />
                    </div>
                  </div>
                </div>
                
                {lessonPlan ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-inner"
                  >
                    <div className="prose prose-slate max-w-none">
                      <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium font-mono text-sm leading-8">{lessonPlan}</div>
                    </div>
                    <div className="mt-10 h-px bg-slate-200" />
                    <div className="mt-8 flex justify-between items-center">
                      <Button 
                        variant="ghost"
                        onClick={() => setLessonPlan(null)}
                        className="px-6 h-12 rounded-xl text-[10px] font-bold uppercase tracking-widest text-indigo-600"
                      >
                        Recalibrate Focus
                      </Button>
                      <Button className="h-12 px-8 rounded-xl bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px]">Save to Curriculum</Button>
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-slate-50 rounded-[3rem] p-24 text-center border-2 border-dashed border-slate-200 group">
                    {isGenerating ? (
                      <div className="flex flex-col items-center gap-6">
                        <div className="h-16 w-16 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin shadow-2xl" />
                        <div className="space-y-2">
                          <p className="text-xl font-bold text-slate-900 tracking-tight">Synthesizing Syllabus</p>
                          <p className="text-sm font-medium text-slate-400 italic">Consulting cognitive development frameworks...</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="h-24 w-24 bg-white rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                          <Sparkles size={40} className="text-indigo-600 opacity-20" />
                        </div>
                        <p className="text-xl font-bold text-slate-900 tracking-tight">Blueprint Initialization</p>
                        <p className="text-sm font-medium text-slate-400 mt-2">Enter parameters above to construct your curriculum</p>
                      </>
                    )}
                  </div>
                )}
              </div>
              
              <div className="p-10 bg-slate-50 border-t border-slate-100 flex gap-4">
                <Button 
                  variant="outline"
                  onClick={() => setIsPlannerOpen(false)}
                  className="flex-1 h-16 rounded-2xl text-[11px] font-bold uppercase tracking-widest border-2 border-slate-200 hover:bg-slate-100"
                >
                  Dismiss
                </Button>
                <Button 
                  onClick={handleGeneratePlan}
                  disabled={isGenerating}
                  className="flex-2 bg-indigo-600 text-white h-16 rounded-2xl text-[11px] font-bold uppercase tracking-widest hover:bg-indigo-700 shadow-2xl shadow-indigo-600/20 disabled:opacity-70"
                >
                  Construct Lesson Plan
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Activity Modal */}
      <AnimatePresence>
        {isActivityModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" 
              onClick={() => setIsActivityModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
                    <Activity size={24} className="text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Schedule Activity</h2>
                    <p className="text-xs font-medium text-slate-400 mt-1">Add to daily learning pulse</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsActivityModalOpen(false)} className="h-10 w-10 text-slate-400 hover:bg-slate-50 rounded-xl">
                  <X size={20} />
                </Button>
              </div>

              <form onSubmit={handleAddActivity} className="flex flex-col">
                <div className="p-8 space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Activity Title</label>
                    <input name="title" required type="text" placeholder="e.g. Sensory Bin Exploration" className="w-full mt-2 h-14 rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all text-sm font-semibold" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Time</label>
                      <input name="time" required type="text" placeholder="e.g. 10:00 AM" className="w-full mt-2 h-14 rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all text-sm font-semibold" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Duration</label>
                      <input name="duration" required type="text" placeholder="e.g. 30 min" className="w-full mt-2 h-14 rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all text-sm font-semibold" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Learning Type</label>
                    <select name="type" className="w-full mt-2 h-14 rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all text-sm font-semibold text-slate-700">
                      <option>Language</option>
                      <option>Math</option>
                      <option>Science</option>
                      <option>Motor</option>
                      <option>Sensory</option>
                      <option>Cognitive</option>
                    </select>
                  </div>
                </div>
                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsActivityModalOpen(false)} className="flex-1 h-14 rounded-xl text-xs font-bold uppercase tracking-widest border-2">Cancel</Button>
                  <Button type="submit" className="flex-1 bg-indigo-600 text-white h-14 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-600/20 hover:bg-indigo-700">Schedule</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Broadcast Modal */}
      <AnimatePresence>
        {isBroadcastModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" 
              onClick={() => setIsBroadcastModalOpen(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-lg shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                    <MessageCircle size={24} className="text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Global Bulletin</h2>
                    <p className="text-xs font-medium text-slate-400 mt-1">Broadcast to Parent Ecosystem</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsBroadcastModalOpen(false)} className="h-10 w-10 text-slate-400 hover:bg-slate-50 rounded-xl">
                  <X size={20} />
                </Button>
              </div>

              <form onSubmit={handleBroadcast} className="flex flex-col">
                <div className="p-8 space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Subject / Headline</label>
                    <input name="subject" required type="text" placeholder="e.g. Early Dismissal Tomorrow" className="w-full mt-2 h-14 rounded-2xl border-2 border-slate-100 bg-slate-50 px-4 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all text-sm font-semibold" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Detailed Message</label>
                    <textarea name="message" required placeholder="Type your parent update here..." className="w-full mt-2 h-32 rounded-2xl border-2 border-slate-100 bg-slate-50 p-4 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all text-sm font-medium resize-none" />
                  </div>
                </div>
                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setIsBroadcastModalOpen(false)} className="flex-1 h-14 rounded-xl text-xs font-bold uppercase tracking-widest border-2">Cancel</Button>
                  <Button type="submit" className="flex-1 bg-emerald-600 text-white h-14 rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">Dispatch</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Overlay */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] max-w-sm w-full px-4"
          >
            <div className="bg-slate-900 text-white shadow-2xl rounded-2xl p-4 flex items-center justify-between border border-slate-700">
              <p className="text-sm font-semibold">{toastMessage}</p>
              <button onClick={() => setToastMessage(null)} className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <X size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}