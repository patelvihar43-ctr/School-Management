import React from 'react';
import { motion } from 'motion/react';
import { Plus, Users, Clock, BookOpen, ArrowUpRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ClassesViewProps {
  isAdmin?: boolean;
}

const mockClasses = [
  { id: 1, name: 'Sunflowers 1A', level: 'Nursery', studentsCount: 22, schedule: 'M-F, 8:00-12:00', teacher: 'Theresa Webb', avatar: 'https://i.pravatar.cc/150?u=theresa', color: 'indigo' },
  { id: 2, name: 'Butterflies 2B', level: 'Playgroup', studentsCount: 18, schedule: 'M-F, 9:00-11:30', teacher: 'Courtney Henry', avatar: 'https://i.pravatar.cc/150?u=courtney', color: 'emerald' },
  { id: 3, name: 'Little Stars', level: 'Pre-Nursery', studentsCount: 15, schedule: 'M,W,F, 9:00-11:00', teacher: 'Albert Flores', avatar: 'https://i.pravatar.cc/150?u=albert', color: 'amber' },
  { id: 4, name: 'Smart Kids 1', level: 'Kindergarten', studentsCount: 25, schedule: 'M-F, 8:30-1:30', teacher: 'Theresa Webb', avatar: 'https://i.pravatar.cc/150?u=theresa', color: 'rose' },
];

export default function ClassesView({ isAdmin = false }: ClassesViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isAdmin ? 'Operation Sectors' : 'Classes & Sections'}
          </h2>
          <div className="flex items-center gap-2 mt-1 font-medium text-[10px] text-slate-500 uppercase tracking-widest">
            <span className="text-indigo-600">Infrastructure</span>
            <span className="text-slate-300">/</span>
            <span>{isAdmin ? 'Resource Allocation' : 'Class List'}</span>
          </div>
        </div>
        
        {isAdmin && (
          <Button className="rounded-xl px-5 h-10 bg-indigo-600 text-white font-bold shadow-sm border-none hover:bg-indigo-700 transition-all group">
            <Plus size={16} className="mr-2 group-hover:scale-110 transition-transform" />
            Initialize Section
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockClasses.map((cls) => (
          <Card key={cls.id} className="rounded-2xl border border-slate-100 bg-white shadow-sm p-6 transition-all relative overflow-hidden group hover:shadow-md cursor-pointer">
            {/* Background Graphic */}
            <div className="absolute top-0 right-0 p-6 transition-all duration-700 opacity-5 group-hover:opacity-10 group-hover:scale-110 group-hover:-rotate-12 text-indigo-600">
              <BookOpen size={100} />
            </div>

            <div className="relative z-10 space-y-4">
              <div>
                <Badge className="border-none px-2 py-0.5 font-black uppercase tracking-widest text-[8px] mb-3 bg-indigo-50 text-indigo-600 shadow-sm">
                  {cls.level} Department
                </Badge>
                <h3 className="text-xl font-bold tracking-tight mb-0.5 text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {cls.name}
                </h3>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Active Operation Vector</p>
              </div>

              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl flex items-center justify-center transition-colors shadow-inner bg-slate-50 text-slate-400">
                    <Users size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700">{cls.studentsCount} Registered Scholars</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Enrolled capacity</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-xl flex items-center justify-center transition-colors shadow-inner bg-slate-50 text-slate-400">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-tight text-slate-700">{cls.schedule}</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Operation Window</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-50" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-9 w-9 rounded-xl shadow-sm border border-white">
                      <AvatarImage src={cls.avatar} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 text-[10px] font-bold">{cls.teacher[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Project Lead</p>
                    <p className="text-[10px] font-bold text-slate-900">{cls.teacher}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-lg transition-all hover:bg-slate-50 text-slate-400 hover:text-indigo-600"
                >
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {isAdmin && (
           <motion.div 
             whileHover={{ scale: 1.01 }}
             className="rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center p-6 text-center cursor-pointer group transition-all hover:bg-slate-50 hover:border-indigo-300 bg-white shadow-sm"
           >
              <div className="h-12 w-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors mb-3">
                <Plus size={24} />
              </div>
              <h4 className="text-sm font-bold text-slate-600 group-hover:text-slate-900 uppercase tracking-tight">New Department</h4>
              <p className="text-[10px] font-medium text-slate-400 mt-1 max-w-[160px]">Create a new operational sector.</p>
           </motion.div>
        )}
      </div>
    </div>
  );
}
