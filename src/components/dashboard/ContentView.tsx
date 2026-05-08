import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Play, 
  PenTool, 
  Download, 
  Eye, 
  MoreVertical,
  Plus,
  FileText,
  Video,
  FileArchive,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockContent = [
  { id: 1, title: 'Early Literacy Vol 1', type: 'PDF', size: '2.4 MB', date: 'Oct 12, 2023', category: 'Language', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', views: 145 },
  { id: 2, title: 'Number Sense Basics', type: 'Video', size: '15.0 MB', date: 'Oct 14, 2023', category: 'Math', icon: Video, color: 'text-rose-600', bg: 'bg-rose-50', views: 890 },
  { id: 3, title: 'Art & Craft Guide', type: 'Doc', size: '1.1 MB', date: 'Oct 15, 2023', category: 'Creative', icon: PenTool, color: 'text-amber-600', bg: 'bg-amber-50', views: 56 },
  { id: 4, title: 'Nature Walk Activity', type: 'PDF', size: '4.2 MB', date: 'Oct 18, 2023', category: 'Science', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50', views: 234 },
  { id: 5, title: 'Phonics Compilation', type: 'Archive', size: '45.8 MB', date: 'Oct 20, 2023', category: 'Language', icon: FileArchive, color: 'text-purple-600', bg: 'bg-purple-50', views: 412 },
  { id: 6, title: 'Shapes & Patterns', type: 'Video', size: '22.1 MB', date: 'Oct 22, 2023', category: 'Math', icon: Video, color: 'text-teal-600', bg: 'bg-teal-50', views: 670 },
  { id: 7, title: 'Behavioral Strategies', type: 'Guide', size: '3.5 MB', date: 'Oct 25, 2023', category: 'Educator', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50', views: 89 },
  { id: 8, title: 'Montessori Methods', type: 'Course', size: '120 MB', date: 'Oct 28, 2023', category: 'Educator', icon: Sparkles, color: 'text-indigo-600', bg: 'bg-indigo-50', views: 120 },
];

export default function ContentView({ isAdmin = false }: { isAdmin?: boolean }) {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 w-full max-w-7xl mx-auto pb-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl shadow-sm border bg-white border-slate-100">
        <div>
          <h2 className="text-2xl font-black tracking-tight leading-tight text-slate-900 uppercase">
            {isAdmin ? 'System Repository' : 'Content Library'}
          </h2>
          <p className="text-[10px] font-bold mt-1 uppercase tracking-widest text-slate-400">
            {isAdmin ? 'Manage institutional intellectual assets.' : 'Native educational curriculum assets.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg font-bold uppercase tracking-widest text-[9px] text-slate-600 border-slate-200">
            Filter
          </Button>
          {isAdmin && (
            <Button size="sm" className="h-9 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest text-[9px] shadow-sm border-none">
              <Plus size={14} className="mr-2" /> Upload
            </Button>
          )}
        </div>
      </div>

      {/* Stats/Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         {[
           { label: 'Total Assets', value: '1,248', icon: BookOpen, color: 'blue' },
           { label: 'Video Modules', value: '342', icon: Play, color: 'rose' },
           { label: 'Engagement', value: '84.5k', icon: Eye, color: 'emerald' },
         ].map((stat, i) => (
           <div key={i} className="rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-between group cursor-pointer transition-all bg-white hover:shadow-md">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest mb-0.5 text-slate-400">{stat.label}</p>
                <h4 className="text-xl font-black text-slate-900 uppercase">{stat.value}</h4>
              </div>
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
                <stat.icon size={18} />
              </div>
           </div>
         ))}
      </div>

      {/* Grid of Materials */}
      <div>
        <div className="flex items-center justify-between mb-4 px-2">
           <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Recent Repository</h3>
           <p className="text-[9px] font-black uppercase tracking-widest cursor-pointer transition-colors text-indigo-600 hover:text-indigo-700">View All</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockContent.map((item, i) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl p-4 shadow-sm border border-slate-100 bg-white group hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center transition-all", item.bg + " " + item.color)}>
                  <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-md text-slate-300">
                  <MoreVertical size={14} />
                </Button>
              </div>
              
              <div className="space-y-1">
                <Badge className={cn("border-none px-1.5 py-0 shadow-sm uppercase tracking-widest text-[7px] font-black", item.bg + " " + item.color)}>
                  {item.category}
                </Badge>
                <h4 className="text-xs font-bold leading-tight pt-1 transition-colors line-clamp-2 min-h-[32px] text-slate-900 group-hover:text-indigo-600 uppercase">
                  {item.title}
                </h4>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-50">
                <div className="flex flex-col">
                   <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{item.type} • {item.size}</p>
                   <p className="text-[9px] font-medium mt-0.5 text-slate-500">{item.date}</p>
                </div>
                <Button variant="secondary" size="icon" className="h-8 w-8 rounded-lg bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                  <Download size={14} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
