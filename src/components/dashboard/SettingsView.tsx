import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Bell, 
  Lock, 
  Database, 
  Globe, 
  Palette, 
  Shield, 
  LogOut,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const TABS = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security & Access', icon: Lock },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'data', label: 'Data Management', icon: Database },
];

export default function SettingsView({ isAdmin = false }: { isAdmin?: boolean }) {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-5xl mx-auto w-full pb-8 animate-in fade-in duration-500">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
          {isAdmin ? 'Operation Preferences' : 'System Preferences'}
        </h2>
        <p className="text-[10px] font-bold mt-1 text-slate-400 uppercase tracking-widest">
          {isAdmin ? 'Manage institutional security protocols.' : 'Manage your account settings and preferences.'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-56 shrink-0 space-y-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all group border",
                activeTab === tab.id 
                  ? "bg-white border-slate-200 text-indigo-600 shadow-sm"
                  : "bg-transparent border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <tab.icon size={16} className={cn("transition-transform group-hover:scale-110", activeTab === tab.id ? "text-indigo-600" : "text-slate-400")} />
              {tab.label}
            </button>
          ))}
          <Separator className="my-3 bg-slate-100" />
          <button className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all group text-rose-600 hover:bg-rose-50 border border-transparent">
            <LogOut size={16} className="text-rose-400 transition-transform group-hover:scale-110" />
            Sign Out All Devices
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 rounded-xl shadow-sm border border-slate-100 p-6 md:p-8 min-h-[500px] transition-all bg-white overflow-hidden">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div>
                <h3 className="text-base font-bold mb-5 text-slate-900 uppercase tracking-tight">Profile Information</h3>
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <Avatar className="h-20 w-20 rounded-2xl shadow-lg ring-4 ring-slate-50">
                    <AvatarImage src="https://i.pravatar.cc/150?u=admin" />
                    <AvatarFallback className="font-bold text-xl bg-indigo-50 text-indigo-700">AD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="rounded-lg font-bold text-[9px] uppercase tracking-widest border-slate-100 bg-slate-50/50 hover:bg-slate-50">Change Avatar</Button>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">JPG, GIF or PNG. 1MB max.</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-50" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                  <input type="text" defaultValue="Jone Copper" className="w-full h-10 rounded-lg border border-slate-200 bg-slate-50/30 px-3.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 placeholder-slate-300" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                  <input type="email" defaultValue="admin@littlesteps.edu" className="w-full h-10 rounded-lg border border-slate-200 bg-slate-50/30 px-3.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 placeholder-slate-300" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Phone</label>
                  <input type="tel" defaultValue="+1 (555) 000-0000" className="w-full h-10 rounded-lg border border-slate-200 bg-slate-50/30 px-3.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 placeholder-slate-300" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Location</label>
                  <input type="text" defaultValue="New York, USA" className="w-full h-10 rounded-lg border border-slate-200 bg-slate-50/30 px-3.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 placeholder-slate-300" />
                </div>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button size="sm" className="rounded-lg px-6 h-9 font-bold uppercase tracking-widest text-[9px] shadow-sm transition-all bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Save size={14} className="mr-2" /> Save Changes
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h3 className="text-base font-bold mb-5 text-slate-900 uppercase tracking-tight">Notification Preferences</h3>
              
              <div className="space-y-3">
                {[
                  { title: 'Email Alerts', desc: 'Receive administrative summary reports via email.' },
                  { title: 'Push Notifications', desc: 'Real-time alerts for critical system events.' },
                  { title: 'New Event Announcements', desc: 'Notify me when staff schedules new activities.' },
                  { title: 'Weekly Analytics Digest', desc: 'A summarized overview sent every Sunday.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-lg border border-slate-50 bg-slate-50/30 transition-colors">
                    <div>
                      <p className="font-bold text-xs text-slate-900 uppercase tabular-nums tracking-tight">{item.title}</p>
                      <p className="text-[9px] font-bold mt-0.5 text-slate-400 uppercase tracking-widest">{item.desc}</p>
                    </div>
                    <Switch defaultChecked={i < 2} />
                  </div>
                ))}
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button size="sm" className="rounded-lg px-6 h-9 font-bold uppercase tracking-widest text-[9px] shadow-sm transition-all bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Save size={14} className="mr-2" /> Update Preferences
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <h3 className="text-base font-bold mb-5 text-slate-900 uppercase tracking-tight">Security Settings</h3>
              
              <div className="space-y-4">
                <div className="space-y-3 p-5 rounded-xl border border-slate-100 bg-slate-50/30">
                  <h4 className="font-bold text-xs text-slate-900 uppercase tracking-tight">Change Password</h4>
                  <div className="space-y-3">
                    <input type="password" placeholder="Current Password" className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder-slate-300" />
                    <input type="password" placeholder="New Password" className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder-slate-300" />
                    <input type="password" placeholder="Confirm New Password" className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all placeholder-slate-300" />
                  </div>
                  <Button size="sm" variant="secondary" className="mt-2 rounded-lg px-5 h-8 font-black uppercase tracking-widest text-[8px] bg-slate-900 text-white hover:bg-slate-800">Update Password</Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-rose-100 bg-rose-50/30">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg shadow-sm flex items-center justify-center bg-white text-rose-500 border border-rose-100"><Shield size={18} /></div>
                    <div>
                      <p className="font-bold text-xs text-rose-900 uppercase tracking-tight">Two-Factor Auth</p>
                      <p className="text-[9px] font-bold mt-0.5 text-rose-600/60 uppercase tracking-widest">Extra layer of security.</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 rounded-lg font-bold text-[9px] uppercase tracking-widest border-rose-200 text-rose-700 hover:bg-white bg-white/50">Enable 2FA</Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Placeholders for others */}
          {(activeTab === 'appearance' || activeTab === 'data') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center h-full opacity-50 py-16">
              {activeTab === 'appearance' ? <Palette size={48} className="mb-4 text-slate-200" /> : <Database size={48} className="mb-4 text-slate-200" />}
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Coming Soon</h3>
              <p className="text-[10px] font-bold mt-1 max-w-xs text-slate-400 uppercase tracking-widest">Settings panel currently under development.</p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
