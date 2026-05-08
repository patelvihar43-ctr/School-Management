import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarIcon, MoreVertical, Search, Filter, ShieldCheck, Download } from 'lucide-react';
import { useAppState } from '@/context/StateContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AttendanceView({ isAdmin = false }: { isAdmin?: boolean }) {
  const { students, toggleAttendance } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Flatten students from the state into single array just for display
  const allStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const commitDailyRecord = () => {
    alert("Attendance snapshot committed successfully to permanent ledger!");
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-500 w-full max-w-7xl mx-auto pb-6">
      {/* Slim Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl shadow-sm border bg-white border-slate-100">
        <div>
          <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 text-slate-900">
            <ShieldCheck className="text-indigo-600" size={20} /> 
            {isAdmin ? 'Attendance Audit' : 'Pedagogical Attendance'}
          </h2>
          <p className="text-[10px] font-medium mt-0.5 text-slate-500 uppercase tracking-widest">
            {isAdmin ? 'System-wide auditing' : 'Daily scholar presence tracking'}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Search scholar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-200 bg-slate-50 text-[11px] font-medium focus:outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>
          <div className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center gap-2 whitespace-nowrap shrink-0">
            <CalendarIcon size={14} className="text-slate-400" />
            <span className="text-[10px] font-bold tracking-tight text-slate-700">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl shadow-sm border border-slate-100 overflow-hidden relative bg-white">
        
        {/* Actions Bar */}
        <div className="px-4 py-2.5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-500">
                <span className="px-2 py-1 rounded bg-white border border-slate-100 shadow-sm">
                    <span className="mr-1 text-emerald-600">{allStudents.filter(s => s.attendance_status).length}</span> Present
                </span>
                <span className="px-2 py-1 rounded bg-white border border-slate-100 shadow-sm">
                    <span className="text-slate-900 mr-1">{allStudents.length}</span> Enrolled
                </span>
            </div>
            
            <div className="flex gap-1.5">
                <Button variant="outline" size="sm" className="h-7 rounded-lg text-[9px] font-bold transition-all border-slate-200 uppercase tracking-widest px-3">
                    <Filter size={12} className="mr-1.5" /> Filter
                </Button>
                {isAdmin && (
                  <Button variant="outline" size="sm" className="h-7 rounded-lg text-[9px] font-bold transition-all border-slate-200 uppercase tracking-widest px-3">
                      <Download size={12} className="mr-1.5" /> Export
                  </Button>
                )}
            </div>
        </div>

        {/* Compact List */}
        <div className="divide-y divide-slate-50 max-h-[500px] overflow-y-auto custom-scrollbar">
          {allStudents.map(student => (
            <div 
              key={student.id} 
              className="px-4 py-2 flex items-center justify-between gap-3 group transition-colors hover:bg-slate-50/50"
            >
              <div className="flex items-center gap-3 w-[200px] sm:w-[250px]">
                <Avatar className="h-8 w-8 rounded-lg border border-white ring-2 ring-slate-50 cursor-pointer shadow-sm bg-indigo-50">
                    <AvatarFallback className="font-bold text-[10px] bg-indigo-50 text-indigo-600">{student.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-xs font-bold truncate text-slate-900 uppercase tracking-tight">{student.name}</p>
                  <p className="text-[8px] font-bold uppercase tracking-widest truncate text-slate-400">{student.level}</p>
                </div>
              </div>
              
              <div className="flex-1 min-w-[120px] hidden md:block">
                  <div className="h-1 w-full max-w-[120px] rounded-full overflow-hidden bg-slate-100">
                    <div className="h-full bg-indigo-500" style={{ width: `${student.progress}%` }} />
                  </div>
                  <p className="text-[7px] font-black mt-0.5 uppercase tracking-widest text-slate-400">Mastery</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <button 
                  onClick={() => toggleAttendance(student.id)}
                  className={cn(
                    "h-7 w-24 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all border shadow-sm flex items-center justify-center",
                    student.attendance_status 
                      ? 'bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100'
                      : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                  )}
                >
                  {student.attendance_status ? 'Verified' : 'Absent'}
                </button>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md transition-colors text-slate-300 hover:bg-slate-100">
                  <MoreVertical size={14} />
                </Button>
              </div>
            </div>
          ))}
          {allStudents.length === 0 && (
              <div className="p-6 text-center text-slate-400 text-[10px] font-medium uppercase tracking-widest">No scholars found.</div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100">
          <Button 
            onClick={commitDailyRecord} 
            className="w-full h-9 rounded-lg font-black uppercase tracking-widest text-[9px] shadow-sm transition-all bg-slate-900 text-white hover:bg-slate-800"
          >
            {isAdmin ? 'finalize audit record' : 'Commit Daily Ledger'}
          </Button>
        </div>
      </div>
    </div>
  );
}
