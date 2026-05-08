import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Clock, 
  Users, 
  MessageCircle, 
  Hash, 
  Activity, 
  Baby, 
  Heart, 
  Leaf,
  Plus,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface DayActivity {
  title: string;
  time: string;
  duration: string;
  participants: number;
  type: string;
  id?: string;
  status?: 'completed' | 'ongoing' | 'upcoming';
}

const ALL_ACTIVITIES: Record<string, DayActivity[]> = {
  nursery: [
    { id: 'n1', title: "Phonics Circle", time: "9:30 AM", duration: "30 min", participants: 18, type: "Language", status: 'completed' },
    { id: 'n2', title: "Number Hunt", time: "10:30 AM", duration: "25 min", participants: 18, type: "Math", status: 'completed' },
    { id: 'n3', title: "Story & Puppets", time: "11:45 AM", duration: "20 min", participants: 18, type: "Literacy", status: 'ongoing' },
    { id: 'n4', title: "Garden Exploration", time: "1:30 PM", duration: "45 min", participants: 18, type: "Science", status: 'upcoming' }
  ],
  playgroup: [
    { id: 'p1', title: "Sensory Play", time: "9:45 AM", duration: "35 min", participants: 12, type: "Exploration", status: 'completed' },
    { id: 'p2', title: "Music & Movement", time: "10:45 AM", duration: "25 min", participants: 12, type: "Gross Motor", status: 'completed' },
    { id: 'p3', title: "Color Sorting", time: "11:30 AM", duration: "20 min", participants: 12, type: "Cognitive", status: 'ongoing' },
    { id: 'p4', title: "Nap Time Prep", time: "1:00 PM", duration: "15 min", participants: 12, type: "Habits", status: 'upcoming' }
  ],
  prenursery: [
    { id: 'pr1', title: "Soft Block Play", time: "9:15 AM", duration: "30 min", participants: 10, type: "Motor", status: 'completed' },
    { id: 'pr2', title: "Bubble Fun", time: "10:15 AM", duration: "20 min", participants: 10, type: "Sensory", status: 'completed' },
    { id: 'pr3', title: "Finger Painting", time: "11:00 AM", duration: "30 min", participants: 10, type: "Creative", status: 'ongoing' },
    { id: 'pr4', title: "Lullaby Session", time: "12:30 PM", duration: "20 min", participants: 10, type: "Social", status: 'upcoming' }
  ]
};

export default function ActivitiesView({ isAdmin = false }: { isAdmin?: boolean }) {
  const sections = [
    { id: 'nursery', title: 'Nursery', icon: Leaf, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
    { id: 'playgroup', title: 'Playgroup', icon: Baby, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    { id: 'prenursery', title: 'Pre-Nursery', icon: Heart, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-7xl mx-auto pb-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl shadow-sm border bg-white border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-6 w-6 rounded-lg flex items-center justify-center bg-indigo-50 text-indigo-600">
              <Activity size={14} />
            </div>
            <Badge variant="outline" className="uppercase tracking-widest text-[7px] font-bold border-indigo-100 text-indigo-600">Real-time Pulse</Badge>
          </div>
          <h2 className="text-2xl font-black tracking-tight leading-tight text-slate-900 uppercase">Institutional Pulse</h2>
          <p className="text-[10px] font-medium mt-1 uppercase tracking-widest text-slate-400">
            {isAdmin ? 'Monitoring pedagogical delivery across tiers.' : 'Kindergarten activities monitoring.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg font-bold uppercase tracking-widest text-[9px] text-slate-600 border-slate-200">
            Export
          </Button>
          {isAdmin && (
            <Button size="sm" className="h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest text-[9px] shadow-sm border-none">
              <Plus size={14} className="mr-2" /> Global Activity
            </Button>
          )}
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 gap-6">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-xl flex items-center justify-center",
                  section.bg + " " + section.color
                )}>
                  <section.icon size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-slate-900">{section.title}</h3>
                  <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400">Active Cohort Engagement</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="font-bold text-[9px] uppercase tracking-widest group transition-colors text-indigo-600 hover:bg-indigo-50">
                View logs <ArrowRight size={12} className="ml-1.5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ALL_ACTIVITIES[section.id].map((activity) => (
                <motion.div 
                  key={activity.id}
                  whileHover={{ y: -2 }}
                  className="rounded-xl p-4 shadow-sm border border-slate-100 bg-white group transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full"
                >
                  <div className={cn(
                    "absolute top-0 left-0 right-0 h-1",
                    activity.status === 'completed' ? 'bg-emerald-500' : 
                    activity.status === 'ongoing' ? 'bg-amber-500 animate-pulse' : 'bg-slate-100'
                  )} />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 text-slate-400">
                        <Clock size={10} /> {activity.time}
                      </span>
                      <Badge className={cn(
                        "text-[7px] font-black uppercase tracking-widest border-none px-1.5 py-0",
                        activity.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 
                        activity.status === 'ongoing' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-400'
                      )}>
                        {activity.status}
                      </Badge>
                    </div>

                    <h4 className="text-xs font-bold leading-tight transition-colors line-clamp-2 text-slate-900 group-hover:text-indigo-600 uppercase tracking-tight">
                      {activity.title}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-50 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Duration</p>
                      <p className="text-[9px] font-bold text-slate-900">{activity.duration}</p>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Users size={12} />
                        <span className="text-[9px] font-bold">{activity.participants} Kids</span>
                      </div>
                      <div className="h-5 w-5 rounded-lg flex items-center justify-center bg-slate-50 group-hover:bg-indigo-50 transition-colors">
                        {activity.type === 'Language' ? <MessageCircle size={10} /> : 
                         activity.type === 'Math' ? <Hash size={10} /> : 
                         <Sparkles size={10} />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
