import React from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

interface FeesViewProps {
  isAdmin?: boolean;
}

const mockFees = [
  { id: 1, name: 'Alice Johnson', amount: 1200, status: 'paid', date: 'Oct 05, 2023', id_num: 'FE-8901', avatar: 'https://i.pravatar.cc/150?u=alice' },
  { id: 2, name: 'Bob Smith', amount: 1200, status: 'pending', date: 'Oct 15, 2023', id_num: 'FE-8902', avatar: 'https://i.pravatar.cc/150?u=bob' },
  { id: 3, name: 'Charlie Brown', amount: 1200, status: 'overdue', date: 'Oct 01, 2023', id_num: 'FE-8903', avatar: 'https://i.pravatar.cc/150?u=charlie' },
  { id: 4, name: 'Diana Prince', amount: 1200, status: 'paid', date: 'Oct 08, 2023', id_num: 'FE-8904', avatar: 'https://i.pravatar.cc/150?u=diana' },
  { id: 5, name: 'Ethan Hunt', amount: 1200, status: 'paid', date: 'Oct 10, 2023', id_num: 'FE-8905', avatar: 'https://i.pravatar.cc/150?u=ethan' },
];

export default function FeesView({ isAdmin = false }: FeesViewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl shadow-sm border bg-white border-slate-100">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
            {isAdmin ? 'Capital Ledger' : 'Financial Management'}
          </h2>
          <p className="text-xs font-medium mt-1 text-slate-500">
            {isAdmin ? 'System-wide fiscal monitoring and revenue verification.' : 'Manage student fees and financial records.'}
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
             <input 
               type="text" 
               placeholder="Search..." 
               className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none transition-all focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
             />
          </div>
          <Button variant="outline" className="h-10 w-10 rounded-xl p-0 shrink-0 text-slate-400 border-slate-200 hover:bg-slate-50">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Term Revenue', value: '$124,500', icon: DollarSign, trend: '+8.4%', color: 'indigo', bg: 'bg-indigo-50' },
          { label: 'Paid-In Full', value: '85%', icon: CheckCircle2, trend: 'Optimal', color: 'emerald', bg: 'bg-emerald-50' },
          { label: 'Pending Audit', value: '12', icon: Clock, trend: 'Reviewing', color: 'blue', bg: 'bg-blue-50' },
          { label: 'Deficit Risk', value: '$4,200', icon: AlertCircle, trend: 'Priority', color: 'rose', bg: 'bg-rose-50' },
        ].map((stat, i) => (
          <Card key={i} className="p-5 rounded-2xl border border-slate-100 shadow-sm group hover:shadow-md transition-all duration-300 bg-white">
            <div className="flex items-center justify-between mb-3">
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-inner", stat.bg)}>
                <stat.icon size={18} className={`text-${stat.color}-600`} />
              </div>
              <Badge variant="outline" className="border-none px-1.5 text-[7px] font-black uppercase tracking-widest bg-slate-100 text-slate-500">
                {stat.trend}
              </Badge>
            </div>
            <h4 className="text-xl font-black tracking-tight text-slate-900 lowercase uppercase tracking-widest">{stat.value}</h4>
            <p className="text-[9px] font-bold uppercase tracking-widest mt-1 text-slate-400">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Transaction Table */}
      <Card className="rounded-2xl border border-slate-100 shadow-sm overflow-hidden bg-white">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Master Registry</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl h-9 px-3 text-[9px] font-bold uppercase tracking-widest border-slate-200 text-slate-600">
              <Download size={12} className="mr-2" /> Export
            </Button>
            <Button size="sm" className="rounded-xl h-9 px-4 text-[9px] font-bold uppercase tracking-widest shadow-sm border-none bg-indigo-600 text-white hover:bg-indigo-700">
              Dispatch
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-slate-50/20">
                <TableHead className="px-6 py-4 text-[9px] font-bold uppercase tracking-widest text-slate-400">Scholar Entity</TableHead>
                <TableHead className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Ledger Entry</TableHead>
                <TableHead className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Value</TableHead>
                <TableHead className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Status</TableHead>
                <TableHead className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Timestamp</TableHead>
                <TableHead className="px-6 text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFees.map((fee) => (
                <TableRow key={fee.id} className="group transition-all duration-200 border-slate-50 hover:bg-slate-50/50">
                  <TableCell className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 rounded-xl shadow-sm border border-slate-100">
                        <AvatarImage src={fee.avatar} referrerPolicy="no-referrer" />
                        <AvatarFallback className="bg-slate-100 text-slate-500 font-bold text-[10px]">
                          {fee.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-xs text-slate-900">{fee.name}</p>
                        <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Verified</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[10px] font-bold font-mono tracking-wider text-indigo-600">
                    {fee.id_num}
                  </TableCell>
                  <TableCell className="font-black tracking-tight text-xs text-slate-900">
                    ${fee.amount}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "rounded-full px-2 py-0.5 text-[7px] font-black tracking-widest uppercase border-none shadow-sm",
                      fee.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 
                      fee.status === 'pending' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                    )}>
                      {fee.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                    {fee.date}
                  </TableCell>
                  <TableCell className="px-6 text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg transition-all text-slate-400 hover:bg-slate-100">
                      <MoreVertical size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="px-6 py-4 flex items-center justify-between bg-slate-50/50 border-t border-slate-100">
           <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Institutional Ledger v2.4.1</p>
           <div className="flex gap-1">
             <Button variant="ghost" size="sm" className="h-7 px-3 rounded-lg font-bold text-[9px] uppercase text-slate-400 hover:text-slate-900">Prev</Button>
             <Button size="sm" className="h-7 px-3 rounded-lg font-black text-[9px] uppercase shadow-sm border-none bg-indigo-600 text-white">1</Button>
             <Button variant="ghost" size="sm" className="h-7 px-3 rounded-lg font-bold text-[9px] uppercase text-slate-400 hover:text-slate-900">Next</Button>
           </div>
        </div>
      </Card>
    </div>
  );
}
