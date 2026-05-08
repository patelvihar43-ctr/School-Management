import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const mockStudents = [
  {
    id: 'AD52365',
    rollNo: '12',
    name: 'Kathryn Murphy',
    avatar: 'https://i.pravatar.cc/150?u=kathryn',
    class: 'Class 1 (A)',
    dob: '05 May 2012',
    gender: 'Male',
    mobile: '209.555.0104',
    category: 'General',
    status: 'Active',
  },
  {
    id: 'AD52366',
    rollNo: '1',
    name: 'Floyd Miles',
    avatar: 'https://i.pravatar.cc/150?u=floyd',
    class: 'Class 2 (B)',
    dob: '05 May 2012',
    gender: 'Female',
    mobile: '209.555.0104',
    category: 'Special',
    status: 'Inactive',
  },
  {
    id: 'AD52367',
    rollNo: '15',
    name: 'Eleanor Pena',
    avatar: 'https://i.pravatar.cc/150?u=eleanor',
    class: 'Class 1 (A)',
    dob: '12 Jun 2012',
    gender: 'Female',
    mobile: '209.555.0105',
    category: 'General',
    status: 'Active',
  },
  {
    id: 'AD52368',
    rollNo: '8',
    name: 'Darrell Steward',
    avatar: 'https://i.pravatar.cc/150?u=darrell',
    class: 'Nursery (A)',
    dob: '23 Aug 2014',
    gender: 'Male',
    mobile: '209.555.0106',
    category: 'General',
    status: 'Active',
  },
  {
    id: 'AD52369',
    rollNo: '24',
    name: 'Courtney Henry',
    avatar: 'https://i.pravatar.cc/150?u=courtney',
    class: 'Class 3 (C)',
    dob: '01 Jan 2011',
    gender: 'Female',
    mobile: '209.555.0107',
    category: 'Special',
    status: 'Active',
  },
  {
    id: 'AD52370',
    rollNo: '5',
    name: 'Cameron Williamson',
    avatar: 'https://i.pravatar.cc/150?u=cameron',
    class: 'Class 2 (A)',
    dob: '14 Feb 2013',
    gender: 'Male',
    mobile: '209.555.0108',
    category: 'General',
    status: 'Suspended',
  },
];

export default function StudentsView({ isAdmin = false }: { isAdmin?: boolean }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(mockStudents.map(s => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-4 pb-4 animate-in fade-in duration-500">
      {/* Header section matching reference but with premium styling */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {isAdmin ? 'Scholar Registry' : 'Student List'}
          </h2>
          <div className="flex items-center gap-2 mt-1 font-medium text-[10px] text-slate-500 uppercase tracking-widest">
            <span className="text-indigo-600">Dashboard</span>
            <span className="text-slate-300">/</span>
            <span>{isAdmin ? 'Institutional Registry' : 'Student List'}</span>
          </div>
        </div>
        
        <Button className="rounded-xl px-5 h-10 text-white font-bold shadow-sm transition-all group border-none bg-indigo-600 hover:bg-indigo-700">
          <Plus size={16} className="mr-2 group-hover:scale-110 transition-transform" />
          {isAdmin ? 'Authenticate Scholar' : 'Add Student'}
        </Button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl shadow-sm border flex flex-col overflow-hidden bg-white border-slate-100"
      >
        {/* Table Toolbar */}
        <div className="p-4 border-b flex flex-col lg:flex-row justify-between lg:items-center gap-3 transition-colors border-slate-100 bg-slate-50/30">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="h-9 rounded-xl px-3 font-semibold border border-slate-200 shadow-sm transition-colors text-slate-600 hover:bg-white bg-white text-xs">
              <Download size={14} className="mr-2 text-slate-400" /> Export <span className="ml-1 text-[9px]">▼</span>
            </Button>
            
            <div className="relative group">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors text-slate-400 group-focus-within:text-indigo-500" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 rounded-xl border border-slate-200 bg-white text-slate-900 pl-9 pr-3 text-xs font-medium transition-all w-full sm:w-56 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
              />
            </div>
            
            <Button variant="outline" className="h-9 rounded-xl px-3 font-semibold border border-slate-200 shadow-sm transition-colors text-slate-600 hover:bg-white bg-white text-xs">
              <Filter size={14} className="mr-2 text-slate-400" /> Filter <span className="ml-1 text-[9px]">▼</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span>Rows per page:</span>
            <Button variant="outline" className="h-9 rounded-xl px-3 font-bold border border-slate-200 shadow-sm transition-colors text-slate-700 hover:bg-white bg-white text-xs">
              10 <span className="ml-2 text-[9px] text-slate-400">▼</span>
            </Button>
          </div>
        </div>

        {/* Table Data */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="border-b transition-colors border-slate-100 bg-white">
                <th className="py-3 px-5 font-bold text-[10px] uppercase tracking-widest w-[40px]">
                  <Checkbox 
                    checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0} 
                    onCheckedChange={handleSelectAll}
                    id="selectAll"
                    className="rounded-md border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white"
                  />
                </th>
                <th className="py-3 px-3 font-bold text-[10px] uppercase tracking-widest w-[50px] text-slate-900">S.L</th>
                <th className="py-3 px-3 font-bold text-[10px] uppercase tracking-widest text-slate-900">Admission No</th>
                <th className="py-3 px-3 font-bold text-[10px] uppercase tracking-widest min-w-[180px] text-slate-900">Name</th>
                <th className="py-3 px-3 font-bold text-[10px] uppercase tracking-widest text-slate-900">Class</th>
                <th className="py-3 px-3 font-bold text-[10px] uppercase tracking-widest text-slate-900">DOB</th>
                <th className="py-3 px-3 font-bold text-[10px] uppercase tracking-widest text-slate-900">Gender</th>
                <th className="py-3 px-3 font-bold text-[10px] uppercase tracking-widest text-slate-900">Mobile</th>
                <th className="py-3 px-3 font-bold text-[10px] uppercase tracking-widest text-slate-900">Category</th>
                <th className="py-3 px-3 font-bold text-[10px] uppercase tracking-widest text-slate-900">Status</th>
                <th className="py-3 px-5 font-bold text-[10px] uppercase tracking-widest text-right text-slate-900">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student, index) => {
                const isSelected = selectedIds.includes(student.id);
                const isSuspended = student.status === 'Suspended';
                const isInactive = student.status === 'Inactive';
                const isActive = student.status === 'Active';

                return (
                  <tr 
                    key={student.id} 
                    className={cn(
                      "group transition-all hover:bg-slate-50/80",
                      isSelected && "bg-indigo-50/50 hover:bg-indigo-50/80"
                    )}
                  >
                    <td className="py-3 px-5">
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={(checked) => handleSelect(student.id, checked as boolean)}
                        className="rounded-md border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:text-white"
                      />
                    </td>
                    <td className="py-3 px-3 text-[11px] font-bold text-slate-400">
                      {(index + 1).toString().padStart(2, '0')}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-xs tracking-wide text-indigo-600">{student.id}</span>
                    </td>
                    <td className="py-1.5 px-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 rounded-xl shadow-sm border border-slate-100 transition-colors">
                          <AvatarImage src={student.avatar} alt={student.name} />
                          <AvatarFallback className="font-bold text-[10px] bg-indigo-50 text-indigo-700">
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-xs transition-colors cursor-pointer text-slate-900 group-hover:text-indigo-600">{student.name}</p>
                          <p className="text-[9px] font-bold uppercase tracking-widest mt-0.5 text-slate-500">Roll No: <span className="text-slate-700">{student.rollNo}</span></p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-xs font-semibold text-slate-600">{student.class}</td>
                    <td className="py-3 px-3 text-xs font-semibold text-slate-600">{student.dob}</td>
                    <td className="py-3 px-3 text-xs font-semibold text-slate-600">{student.gender}</td>
                    <td className="py-3 px-3 text-xs font-semibold text-slate-600">{student.mobile}</td>
                    <td className="py-3 px-3 text-xs font-semibold text-slate-600">{student.category}</td>
                    <td className="py-3 px-3">
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "uppercase tracking-wider font-bold text-[8px] px-2 py-0.5 border-none transition-colors",
                          isActive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        )}
                      >
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg transition-colors text-slate-400 hover:text-slate-900 hover:bg-slate-100">
                        <MoreVertical size={14} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
              
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search size={32} className="text-slate-200 mb-3" />
                      <p className="text-sm font-bold text-slate-500">No students found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className={cn(
          "p-4 border-t flex items-center justify-between transition-colors",
          isAdmin ? "border-slate-800 bg-slate-900/50" : "border-slate-100 bg-slate-50/50"
        )}>
          <p className={cn("text-xs font-semibold", isAdmin ? "text-slate-600" : "text-slate-500")}>
            Showing <span className={cn("font-bold", isAdmin ? "text-slate-400" : "text-slate-900")}>{filteredStudents.length > 0 ? 1 : 0}</span> to <span className={cn("font-bold", isAdmin ? "text-slate-400" : "text-slate-900")}>{filteredStudents.length}</span> of <span className={cn("font-bold", isAdmin ? "text-slate-400" : "text-slate-900")}>{filteredStudents.length}</span> entries
          </p>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className={cn(
              "h-8 w-8 rounded-lg shadow-sm border transition-all",
              isAdmin ? "bg-slate-800 border-slate-700 text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-900 bg-white border-slate-200"
            )}>
              <ChevronLeft size={16} />
            </Button>
            <Button className={cn(
              "h-8 w-8 rounded-lg text-sm font-bold shadow-sm transition-all border-none",
              isAdmin ? "bg-amber-500 text-black hover:bg-amber-400" : "bg-teal-500 hover:bg-teal-600 text-white"
            )}>
              1
            </Button>
            <Button variant="ghost" size="icon" className={cn(
              "h-8 w-8 rounded-lg shadow-sm border transition-all",
              isAdmin ? "bg-slate-800 border-slate-700 text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-900 bg-white border-slate-200"
            )}>
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
