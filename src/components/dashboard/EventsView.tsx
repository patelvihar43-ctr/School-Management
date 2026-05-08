import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MoreVertical,
  Calendar as CalendarIcon,
  Clock,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

// Shared mock data
const upcomingEvents = [
  { id: 1, date: '15', month: 3, year: 2026, time: '10:30 AM', title: 'Spring Festival', type: 'Event', color: 'indigo' },
  { id: 2, date: '18', month: 3, year: 2026, time: '02:00 PM', title: 'Parent-Teacher Meeting', type: 'Meeting', color: 'amber' },
  { id: 3, date: '22', month: 3, year: 2026, time: '09:00 AM', title: 'Earth Day Activities', type: 'Activity', color: 'emerald' },
  { id: 4, date: '01', month: 4, year: 2026, time: 'All Day', title: 'Labor Day', type: 'Holiday', color: 'rose' },
  { id: 5, date: '05', month: 4, year: 2026, time: '11:00 AM', title: 'Science Fair', type: 'Event', color: 'indigo' },
  { id: 6, date: '12', month: 4, year: 2026, time: '03:00 PM', title: 'Teacher Planning', type: 'Meeting', color: 'amber' },
  { id: 7, date: '25', month: 4, year: 2026, time: 'All Day', title: 'Memorial Day', type: 'Holiday', color: 'rose' },
  { id: 8, date: '28', month: 4, year: 2026, time: '09:30 AM', title: 'End of Year Picnic', type: 'Event', color: 'indigo' },
];

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface EventsViewProps {
  isAdmin?: boolean;
}

export default function EventsView({ isAdmin = false }: EventsViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 17)); // Starting at April 2026 for consistency with data
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'list'>('month');

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Calendar Math
  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

  const daysInCurrentMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  const goToToday = () => setCurrentDate(new Date());

  // Flatten calendar grid cells
  const calendarCells = [];
  
  // Padding for previous month
  const daysInPrevMonth = getDaysInMonth(currentMonth - 1, currentYear);
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push({
      date: daysInPrevMonth - firstDay + i + 1,
      isCurrentMonth: false,
      monthOffset: -1
    });
  }

  // Current month days
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarCells.push({
      date: i,
      isCurrentMonth: true,
      monthOffset: 0
    });
  }

  // Padding for next month to complete the grid (usually 6 rows of 7 days = 42)
  const remainingCells = 42 - calendarCells.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarCells.push({
      date: i,
      isCurrentMonth: false,
      monthOffset: 1
    });
  }

  return (
    <div className="flex flex-col h-full gap-4 pb-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">
            {isAdmin ? 'Strategic Planner' : 'Events Planner'}
          </h2>
          <p className="text-[10px] uppercase tracking-widest font-bold mt-1 text-slate-400">
            {isAdmin ? 'Institutional chronological planning' : 'Institutional activities calendar'}
          </p>
        </div>
        {isAdmin && (
          <Button size="sm" className="rounded-lg px-4 h-9 bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-sm border-none transition-all group">
            <Plus className="mr-2 group-hover:scale-110 transition-transform" size={14} /> Strategic Event
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 h-full">
        {/* Left Sidebar: Upcoming Events */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full lg:w-72 flex-shrink-0 rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden h-auto lg:min-h-[500px] bg-white"
        >
          <div className="p-4 pb-2 border-b border-slate-50">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Upcoming</h3>
            <p className="text-[8px] uppercase tracking-widest mt-0.5 font-black text-slate-400">Chronological Protocol</p>
          </div>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-2">
              {upcomingEvents.map((evt) => (
                <div key={evt.id} className="p-3 rounded-lg border border-slate-50 bg-slate-50/30 hover:bg-slate-50 transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full", 
                        evt.type === 'Holiday' ? "bg-rose-500" : 
                        evt.type === 'Meeting' ? "bg-amber-500" : "bg-indigo-500"
                      )} />
                      <span className="text-[8px] font-black tracking-wider uppercase text-slate-400">
                        {MONTHS[evt.month].substring(0, 3)} {evt.date}, {evt.year}
                      </span>
                    </div>
                  </div>
                  <h4 className="font-bold text-xs mb-1 transition-colors text-slate-900 group-hover:text-indigo-600 uppercase tabular-nums">{evt.title}</h4>
                  <div className="flex items-center gap-3 text-[8px] font-bold uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-1.5"><Clock size={10} /> {evt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </motion.div>

        {/* Right Main Panel: Calendar Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex-1 rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden bg-white"
        >
          {/* Calendar Toolbar */}
          <div className="p-4 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-3 bg-white">
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg p-0.5 border border-slate-100 bg-slate-50/50">
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm text-slate-500 hover:bg-white hover:shadow-sm" onClick={prevMonth}>
                  <ChevronLeft size={14} />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-sm text-slate-500 hover:bg-white hover:shadow-sm" onClick={nextMonth}>
                  <ChevronRight size={14} />
                </Button>
              </div>
              <Button onClick={goToToday} variant="outline" size="sm" className="h-8 rounded-lg text-[8px] font-black uppercase tracking-widest border-slate-200">
                Today
              </Button>
            </div>

            <h3 className="text-base font-black tracking-tighter tabular-nums text-slate-900">
              {MONTHS[currentMonth].toUpperCase()} <span className="text-indigo-600">{currentYear}</span>
            </h3>

            <div className="flex rounded-lg p-0.5 border border-slate-100 bg-slate-50/50">
              {['month', 'week', 'list'].map((mode) => (
                <Button 
                  key={mode}
                  variant="ghost" 
                  size="sm"
                  onClick={() => setViewMode(mode as any)}
                  className={cn(
                    "h-7 px-3 rounded-sm text-[8px] font-black uppercase tracking-widest transition-all",
                    viewMode === mode 
                      ? "bg-white shadow-sm text-indigo-600" 
                      : "text-slate-500 hover:text-slate-900"
                  )}
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>

          {/* Calendar Framework */}
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/10">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-slate-50 bg-white">
              {DAYS_OF_WEEK.map(day => (
                <div key={day} className="py-2.5 text-center text-[8px] font-black tracking-widest uppercase text-slate-400">
                  {day}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex-1 grid grid-cols-7 auto-rows-fr">
              {calendarCells.map((cell, idx) => {
                const cellDate = new Date(currentYear, currentMonth + cell.monthOffset, cell.date);
                const isToday = new Date().toDateString() === cellDate.toDateString();
                
                // Find events for this cell
                const dayEvents = upcomingEvents.filter(e => 
                  e.year === cellDate.getFullYear() && 
                  e.month === cellDate.getMonth() && 
                  parseInt(e.date) === cellDate.getDate()
                );

                return (
                  <div 
                    key={idx} 
                    className={cn(
                      "min-h-[80px] border-b border-r border-slate-50 p-1.5 group transition-all flex flex-col",
                      !cell.isCurrentMonth ? "bg-slate-50/30" : "bg-white hover:bg-slate-50/50",
                      idx % 7 === 6 && "border-r-0"
                    )}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={cn(
                        "w-5 h-5 flex items-center justify-center rounded-lg text-[10px] font-black transition-all",
                        isToday 
                          ? "bg-indigo-600 text-white shadow-sm" 
                          : cell.isCurrentMonth ? "text-slate-700" : "text-slate-300"
                      )}>
                        {cell.date}
                      </span>
                    </div>
                    
                    <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                      {dayEvents.map(evt => (
                        <div 
                          key={evt.id}
                          className={cn(
                            "px-1.5 py-0.5 text-[7px] font-black uppercase tracking-tighter rounded-md truncate transition-all flex items-center",
                            evt.type === 'Holiday' ? "bg-rose-50 text-rose-700" : 
                            evt.type === 'Meeting' ? "bg-amber-50 text-amber-800" : "bg-indigo-50 text-indigo-700"
                          )}
                          title={evt.title}
                        >
                          {evt.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
