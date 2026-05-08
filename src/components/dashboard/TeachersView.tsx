import React from 'react';
import { motion } from 'motion/react';
import { Plus, MoreVertical, Award, ArrowUpRight, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface TeachersViewProps {
  isAdmin?: boolean;
}

const teachers = [
  { id: 1, name: 'Theresa Webb', subject: 'Mathematics', experience: '8 Years', status: 'active', avatar: 'https://i.pravatar.cc/150?u=theresa' },
  { id: 2, name: 'Courtney Henry', subject: 'Science', experience: '5 Years', status: 'active', avatar: 'https://i.pravatar.cc/150?u=courtney' },
  { id: 3, name: 'Albert Flores', subject: 'History', experience: '12 Years', status: 'active', avatar: 'https://i.pravatar.cc/150?u=albert' },
  { id: 4, name: 'Marvin McKinney', subject: 'English', experience: '4 Years', status: 'inactive', avatar: 'https://i.pravatar.cc/150?u=marvin' },
];

export default function TeachersView({ isAdmin = false }: TeachersViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isAdmin ? 'Pedagogical Personnel' : 'Teacher Registry'}
          </h2>
          <div className="flex items-center gap-2 mt-1 font-medium text-[10px] text-slate-500 uppercase tracking-widest">
            <span className="text-indigo-600">Institutional</span>
            <span className="text-slate-300">/</span>
            <span>{isAdmin ? 'Operation Roster' : 'Staff List'}</span>
          </div>
        </div>
        
        {isAdmin && (
          <Button className="rounded-xl px-5 h-10 bg-indigo-600 text-white font-bold shadow-sm border-none hover:bg-indigo-700 transition-all group">
            <Plus size={16} className="mr-2 group-hover:scale-110 transition-transform" />
            Authenticate Personnel
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {teachers.map((teacher, i) => (
          <motion.div
            key={teacher.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden text-center p-6 flex flex-col items-center hover:shadow-md transition-all duration-300 group relative cursor-pointer">
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                 <Badge className={cn(
                   "rounded-full px-2 py-0.5 text-[8px] font-black uppercase tracking-widest border-none",
                   teacher.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                 )}>
                   {teacher.status}
                 </Badge>
              </div>

              <div className="relative mb-6">
                <Avatar className="h-20 w-20 rounded-2xl shadow-md transition-all ring-2 ring-slate-50">
                  <AvatarImage src={teacher.avatar} className="object-cover" referrerPolicy="no-referrer" />
                  <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold">{teacher.name[0]}</AvatarFallback>
                </Avatar>
                {isAdmin && (
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
                    <ShieldCheck size={12} />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors uppercase">{teacher.name}</h3>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] mt-1 text-slate-400">{teacher.subject}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-2 w-full border-t border-slate-50 pt-6">
                <div className="rounded-xl p-2 bg-slate-50">
                  <p className="text-[8px] font-bold uppercase tracking-widest mb-0.5 text-slate-400">Exp</p>
                  <p className="text-xs font-bold text-slate-900">{teacher.experience}</p>
                </div>
                <div className="rounded-xl p-2 bg-slate-50">
                  <p className="text-[8px] font-bold uppercase tracking-widest mb-0.5 text-slate-400">ID</p>
                  <p className="text-xs font-bold text-indigo-600">#TS-00{teacher.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-5">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg transition-all bg-slate-50 text-slate-400 hover:bg-white hover:shadow-sm">
                  <Mail size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg transition-all bg-slate-50 text-slate-400 hover:bg-white hover:shadow-sm">
                  <MapPin size={16} />
                </Button>
                <Button 
                  className="h-8 px-3 rounded-lg font-bold uppercase tracking-widest text-[9px] flex-1 transition-all border-none bg-slate-900 text-white hover:bg-slate-800"
                >
                  View Profile
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
