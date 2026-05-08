import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  AlertCircle, 
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  ShieldCheck,
  CreditCard,
  Award,
  BookOpen,
  Clock,
  Play,
  PenTool,
  Sparkles,
  LayoutDashboard,
  Calendar,
  Settings,
  Bell,
  Activity,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '@/context/StateContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell
} from 'recharts';
import EventsView from './EventsView';
import StudentsView from './StudentsView';
import CommunicationView from './CommunicationView';
import SettingsView from './SettingsView';
import AttendanceView from './AttendanceView';
import ContentView from './ContentView';
import ActivitiesView from './ActivitiesView';
import TeachersView from './TeachersView';
import ClassesView from './ClassesView';
import FeesView from './FeesView';
import ReportsView from './ReportsView';

export default function AdminDashboard() {
  const { students, teachers, classes, fees, events, activeTab } = useAppState();

  if (activeTab === 'events') {
    return <EventsView isAdmin={true} />;
  }
  if (activeTab === 'students') {
    return <StudentsView isAdmin={true} />;
  }
  if (activeTab === 'communication') {
    return <CommunicationView isAdmin={true} />;
  }
  if (activeTab === 'settings') {
    return <SettingsView isAdmin={true} />;
  }
  if (activeTab === 'attendance' || activeTab === 'dashboard-attendance') {
    return <AttendanceView isAdmin={true} />;
  }
  if (activeTab === 'content') {
    return <ContentView isAdmin={true} />;
  }
  if (activeTab === 'activities' || activeTab === 'dashboard-activities') {
    return <ActivitiesView isAdmin={true} />;
  }

  // Helper for premium icon containers
  const IconBox = ({ icon: Icon, color, bg, className }: { icon: any, color: string, bg: string, className?: string }) => (
    <div className={cn("rounded-2xl p-4 flex items-center justify-center shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3", bg, className)}>
      <Icon size={24} style={{ color }} strokeWidth={1.5} />
    </div>
  );
  
  // High-performance Mock Data for Analytics
  const revenueData = [
    { month: 'Jan', amount: 32000 },
    { month: 'Feb', amount: 35000 },
    { month: 'Mar', amount: 38000 },
    { month: 'Apr', amount: 42500 },
    { month: 'May', amount: 45000 },
    { month: 'Jun', amount: 48000 },
  ];

  const enrollmentData = [
    { level: 'Playgroup', count: 45, fill: '#6366f1' },
    { level: 'Nursery', count: 62, fill: '#818cf8' },
    { level: 'KG 1', count: 58, fill: '#a5b4fc' },
    { level: 'KG 2', count: 75, fill: '#c7d2fe' },
  ];
  const [apps, setApps] = useState([
    { name: 'Oliver Green', level: 'Playgroup', date: 'Today', id: 'a1' },
    { name: 'Sophia Lane', level: 'Kindergarten', date: 'Yesterday', id: 'a2' },
  ]);

  const [systemOnline, setSystemOnline] = useState(true);

  const approveAdmissions = (id: string) => {
    setApps(prev => prev.filter(a => a.id !== id));
    alert('Application approved and student registry updated!');
  };

  const stats = [
    { label: 'Enrolled Scholars', value: String(students.length + 150), change: '+12%', trend: 'up', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Academic Staff', value: String(teachers.length), change: '0%', trend: 'neutral', icon: UserCheck, color: 'text-slate-600', bg: 'bg-slate-100' },
    { label: 'Quarterly Revenue', value: '$42,500', change: '+8%', trend: 'up', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'System Health', value: 'OPTIMAL', change: '100%', trend: 'up', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
  ];

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Dynamic Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Executive Intelligence</h2>
          <p className="text-slate-500 text-xs font-medium mt-1 max-w-lg">Advanced metrics and strategic operational insights.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 px-6 rounded-xl border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-[9px] hover:bg-slate-50 transition-all">Audit Ledger</Button>
          <Button className="h-10 px-6 rounded-xl bg-indigo-600 text-white font-bold uppercase tracking-widest text-[9px] hover:bg-indigo-700 shadow-md transition-all border-none">Security Protocol</Button>
        </div>
      </div>

      {/* Bento Grid Header */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <div className="group relative bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon size={60} className={stat.color} />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className={cn("rounded-2xl p-3 flex items-center justify-center shadow-inner transition-all duration-300 group-hover:scale-110 mb-4 h-12 w-12", stat.bg)}>
                  <stat.icon size={20} className={stat.color} strokeWidth={1.5} />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight tabular-nums">{stat.value}</span>
                  <Badge className={cn(
                    "border-none px-1.5 py-0.5 text-[7px] font-bold tracking-widest rounded-lg",
                    stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  )}>
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Bento Core */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Analytics - Large Bento Item */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Capital Velocity</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Revenue Analytics</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" className="rounded-xl h-8 px-3 text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50">Yearly</Button>
              <Button variant="ghost" className="rounded-xl h-8 px-3 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-600">Quarterly</Button>
            </div>
          </div>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                />
                <ReTooltip 
                  contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', background: '#fff', fontWeight: 'bold', fontSize: '12px' }}
                  itemStyle={{ color: '#6366f1' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enrollment Stats - Vertical Bento Item */}
        <div className="bg-indigo-600 rounded-3xl p-8 shadow-sm text-white relative overflow-hidden group flex flex-col border border-indigo-500">
          <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
            <ShieldCheck size={180} className="text-white" />
          </div>
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-xl font-bold tracking-tight text-white">Institutional Density</h3>
            <p className="text-indigo-200 text-[10px] uppercase font-bold tracking-widest mt-1">Enrollment distribution</p>
            
            <div className="mt-8 flex-1 min-h-0">
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={enrollmentData}>
                  <XAxis dataKey="level" hide />
                  <Bar dataKey="count" radius={[8, 8, 8, 8]} barSize={28}>
                    {enrollmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#ffffff" fillOpacity={0.2 + (index * 0.2)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-6 space-y-3">
                {enrollmentData.map((item, idx) => (
                  <div key={item.level} className="flex items-center justify-between group cursor-pointer border-b border-white/10 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-white/40" />
                      <span className="text-xs font-bold text-indigo-100 group-hover:text-white group-hover:translate-x-1 transition-all">{item.level}</span>
                    </div>
                    <span className="text-xs font-black text-white tabular-nums">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Staff Table - Wide Bento Item */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8 px-2">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Staff Roster</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Personnel Management</p>
            </div>
            <Button variant="ghost" className="h-8 px-4 rounded-xl text-[9px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50">View Registry</Button>
          </div>
          <div className="space-y-3">
            {teachers.slice(0, 4).map((staff) => (
              <motion.div 
                key={staff.id}
                whileHover={{ x: 5, backgroundColor: 'rgba(0,0,0,0.02)' }}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:shadow-sm transition-all duration-300 cursor-pointer border border-slate-100 hover:border-slate-200 group"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10 rounded-xl border border-white transition-all shadow-sm">
                    <AvatarImage src={staff.avatar} className="object-cover" referrerPolicy="no-referrer" />
                    <AvatarFallback className="font-bold text-slate-400">{staff.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{staff.name}</p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">{staff.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="hidden sm:block text-right">
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Experience</p>
                    <p className="text-[10px] font-bold text-slate-600">{staff.experience}</p>
                  </div>
                  <Badge className={cn(
                    "rounded-full px-3 py-1 text-[8px] font-bold uppercase tracking-widest shadow-sm",
                    staff.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                  )}>
                    {staff.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Admission Queue - Small Sidebar Bento Item */}
        <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-8 shadow-sm text-slate-900 relative overflow-hidden group flex flex-col border border-slate-200">
          <ShieldAlert size={100} className="absolute -bottom-8 -right-8 opacity-5 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-xl font-bold tracking-tight">Admissions</h3>
            <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mt-1">Pending approval</p>
            
            <div className="mt-8 space-y-3 flex-1">
              {apps.length > 0 ? apps.map(app => (
                <motion.div 
                  key={app.id} 
                  whileHover={{ scale: 1.02 }}
                  className="group flex flex-col p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 transition-all shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{app.level}</p>
                      <p className="text-sm font-bold text-slate-900">{app.name}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => approveAdmissions(app.id)} 
                    className="rounded-lg h-8 w-full bg-slate-900 text-white border-none px-4 text-[9px] font-bold uppercase hover:bg-slate-800 transition-all shadow-md"
                  >
                    Approve Entry
                  </Button>
                </motion.div>
              )) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 py-10">
                  <Activity size={48} className="mb-4 text-slate-400" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Queue Empty</p>
                </div>
              )}
            </div>
            <Button variant="ghost" className="mt-6 h-10 w-full rounded-xl bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all text-[9px] font-bold uppercase tracking-widest border border-slate-200">Full Audit Log</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderView = () => {
    return (
      <div className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 5 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -5 }}
            transition={{ duration: 0.2 }}
          >
            {(() => {
              switch (activeTab) {
                case 'overview': return renderOverview();
                case 'students': return <StudentsView isAdmin={true} />;
                case 'classes': return <ClassesView isAdmin={true} />;
                case 'teachers': return <TeachersView isAdmin={true} />;
                case 'attendance': return <AttendanceView isAdmin={true} />;
                case 'fees': return <FeesView isAdmin={true} />;
                case 'content': return <ContentView isAdmin={true} />;
                case 'activities': return <ActivitiesView isAdmin={true} />;
                case 'reports': return <ReportsView isAdmin={true} />;
                case 'communication': return <CommunicationView isAdmin={true} />;
                case 'events': return <EventsView isAdmin={true} />;
                case 'settings': return <SettingsView isAdmin={true} />;
                default: return renderOverview();
              }
            })()}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  return renderView();
}
