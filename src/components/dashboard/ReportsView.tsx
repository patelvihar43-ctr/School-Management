import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Download, 
  Calendar, 
  Users, 
  Clock, 
  ArrowUpRight, 
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface ReportsViewProps {
  isAdmin?: boolean;
}

const analyticsData = [
  { day: 'Mon', attendance: 92, engagement: 85 },
  { day: 'Tue', attendance: 95, engagement: 88 },
  { day: 'Wed', attendance: 88, engagement: 92 },
  { day: 'Thu', attendance: 94, engagement: 90 },
  { day: 'Fri', attendance: 97, engagement: 95 },
];

const gradeData = [
  { name: 'Nursery', value: 88, color: '#fbbf24' },
  { name: 'Playgroup', value: 92, color: '#d97706' },
  { name: 'KG 1', value: 85, color: '#92400e' },
  { name: 'KG 2', value: 95, color: '#78350f' },
];

export default function ReportsView({ isAdmin = false }: ReportsViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 p-6 rounded-xl shadow-sm border border-slate-100 bg-white relative overflow-hidden">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
             <div className="h-10 w-10 rounded-lg flex items-center justify-center shadow-sm bg-indigo-600 text-white">
                <BarChart3 size={20} />
             </div>
             <Badge className="uppercase tracking-widest text-[8px] font-black px-3 py-1 rounded-full border-none bg-indigo-50 text-indigo-600">Analytics v4.2</Badge>
          </div>
          <h2 className="text-2xl font-black tracking-tight leading-none mb-2 text-slate-900 uppercase">
            {isAdmin ? 'Institutional Intelligence' : 'Performance Insights'}
          </h2>
          <p className="text-[11px] font-bold max-w-xl mx-auto lg:mx-0 text-slate-400 uppercase tracking-widest leading-relaxed">
            {isAdmin 
              ? 'Real-time strategic oversight of institutional engagement and performance nodes.' 
              : 'Detailed analysis of student performance patterns across all departments.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="h-10 px-6 rounded-lg font-bold uppercase tracking-widest text-[9px] border-slate-100 text-slate-600 bg-slate-50/50">
            <Calendar size={14} className="mr-2.5" /> Archive
          </Button>
          <Button size="sm" className="h-10 px-6 rounded-lg font-bold uppercase tracking-widest text-[9px] shadow-sm border-none bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download size={14} className="mr-2.5" /> Export Intelligence
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Trend Area Chart */}
        <Card className="lg:col-span-2 rounded-xl p-6 border border-slate-100 shadow-sm flex flex-col h-[320px] bg-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">Engagement Spectrum</h3>
              <p className="text-[8px] font-black uppercase tracking-widest mt-0.5 text-slate-400">Weekly Delta Performance</p>
            </div>
            <div className="flex gap-2">
               <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50/50 border border-slate-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Attendance</span>
               </div>
               <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50/50 border border-slate-100">
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Mastery</span>
               </div>
            </div>
          </div>
          <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={analyticsData}>
                 <defs>
                   <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 8, fontWeight: 900, fill: '#64748b' }} dy={10} />
                 <YAxis axisLine={false} tickLine={false} hide />
                 <Tooltip 
                   contentStyle={{ borderRadius: '10px', border: 'none', background: '#fff', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                   itemStyle={{ fontWeight: 'bold' }}
                 />
                 <Area type="monotone" dataKey="attendance" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorAdmin)" />
                 <Area type="monotone" dataKey="engagement" stroke="#f59e0b" strokeWidth={1.5} fillOpacity={0} />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </Card>

        {/* Status Vertical Bento */}
        <Card className="rounded-xl p-6 border border-slate-100 shadow-sm relative overflow-hidden group flex flex-col bg-indigo-600 text-white">
          <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
             <Zap size={160} className="text-white" />
          </div>
          <div className="relative z-10 flex-1 flex flex-col">
            <Badge className="border-none mb-3 w-fit px-2 py-0.5 text-[7px] font-black tracking-widest rounded-md bg-white/10 text-white uppercase">
              System Health
            </Badge>
            <h3 className="text-lg font-black tracking-tighter leading-tight uppercase tabular-nums">Efficiency Score</h3>
            <div className="mt-4 flex items-center gap-4">
               <div className="text-4xl font-black tracking-tighter italic">98.4%</div>
               <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-300">
                  <ArrowUpRight size={18} />
               </div>
            </div>
            
            <div className="mt-auto space-y-3 pt-6">
               {[
                 { label: 'Uptime', value: '100%' },
                 { label: 'Latency', value: '12ms' },
                 { label: 'Protocol', value: 'Active' },
               ].map(item => (
                 <div key={item.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/40">{item.label}</span>
                    <span className="text-[10px] font-black uppercase tracking-tight">{item.value}</span>
                 </div>
               ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Distribution Chart */}
         <Card className="rounded-xl p-6 border border-slate-100 shadow-sm h-[320px] flex flex-col bg-white">
           <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight mb-6">Departmental Density</h3>
           <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 9, fontWeight: 900, fill: '#64748b' }} width={80} />
                  <Tooltip cursor={{ fill: 'rgba(99,102,241,0.05)' }} contentStyle={{ borderRadius: '10px', fontSize: '10px' }} />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                    {gradeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
           </div>
         </Card>

         {/* Detailed Reports List */}
         <div className="space-y-4">
            <h3 className="text-xs font-black px-1 text-slate-900 uppercase tracking-tight">Critical Log Extraction</h3>
            <div className="space-y-2">
               {[
                 { title: 'Monthly Fiscal Audit', size: '2.4mb', date: '5m ago', type: 'PDF' },
                 { title: 'Staff Performance Matrix', size: '1.1mb', date: '1h ago', type: 'XLS' },
                 { title: 'Attendance Deviation Log', size: '4.5mb', date: '2h ago', type: 'CSV' },
                 { title: 'Pedagogical Vector Report', size: '8.2mb', date: 'Today', type: 'PDF' },
               ].map((report, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ x: 5, backgroundColor: 'rgba(99,102,241,0.02)' }}
                   className="p-3.5 rounded-lg border border-slate-50 bg-white flex items-center justify-between cursor-pointer transition-all shadow-sm"
                 >
                   <div className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600 border border-indigo-100/50">
                         <FileText size={16} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[11px] text-slate-900 uppercase tracking-tight">{report.title}</h4>
                        <p className="text-[8px] font-black uppercase tracking-widest mt-0.5 text-slate-400">{report.size} • {report.date} • {report.type}</p>
                      </div>
                   </div>
                   <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-300 hover:text-indigo-600 hover:bg-indigo-50">
                      <Download size={16} />
                   </Button>
                 </motion.div>
               ))}
            </div>
            <Button size="sm" variant="outline" className="w-full h-10 rounded-lg font-black uppercase tracking-widest text-[9px] mt-1 border-slate-100 text-slate-400 hover:text-slate-900 bg-slate-50/50">
              Intelligence Archive
            </Button>
         </div>
      </div>
    </div>
  );
}
