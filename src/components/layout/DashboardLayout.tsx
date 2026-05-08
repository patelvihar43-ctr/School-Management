import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronRight,
  UserCircle,
  ShieldCheck,
  Baby,
  Bell,
  Search,
  Plus,
  CreditCard,
  Award,
  TrendingUp
} from 'lucide-react';
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

import { useAppState } from '@/context/StateContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onLogout: () => void;
}

export default function DashboardLayout({ children, role, onLogout }: DashboardLayoutProps) {
  const { activeTab, setActiveTab } = useAppState();

  const menuItems = {
    admin: [
      { icon: LayoutDashboard, label: 'Dashboard', id: 'overview' },
      { icon: Users, label: 'Students', id: 'students' },
      { icon: BookOpen, label: 'Classes', id: 'classes' },
      { icon: UserCircle, label: 'Teachers', id: 'teachers' },
      { icon: ShieldCheck, label: 'Attendance', id: 'attendance' },
      { icon: CreditCard, label: 'Fees', id: 'fees' },
      { icon: BookOpen, label: 'Content', id: 'content' },
      { icon: Award, label: 'Activities', id: 'activities' },
      { icon: TrendingUp, label: 'Reports', id: 'reports' },
      { icon: MessageSquare, label: 'Communication', id: 'communication' },
      { icon: Calendar, label: 'Events', id: 'events' },
      { icon: Settings, label: 'Settings', id: 'settings' },
    ],
    educator: [
      { icon: LayoutDashboard, label: 'Dashboard', id: 'overview' },
      { icon: Users, label: 'Students', id: 'students' },
      { icon: BookOpen, label: 'Classes', id: 'classes' },
      { icon: ShieldCheck, label: 'Attendance', id: 'attendance' },
      { icon: BookOpen, label: 'Content', id: 'content' },
      { icon: Award, label: 'Activities', id: 'activities' },
      { icon: MessageSquare, label: 'Communication', id: 'communication' },
      { icon: Calendar, label: 'Events', id: 'events' },
      { icon: Settings, label: 'Settings', id: 'settings' },
    ],
  };

  const currentMenu = menuItems[role];
  const isAdmin = role === 'admin';

  return (
    <SidebarProvider>
      <div className={cn(
        "flex min-h-screen w-full font-sans selection:bg-primary/10 transition-colors duration-500",
        isAdmin ? "bg-slate-50 text-slate-900" : "bg-premium-bg text-primary"
      )}>
        <Sidebar className={cn(
          "border-r transition-all duration-500",
          isAdmin 
            ? "border-slate-200 bg-white/95 backdrop-blur-2xl shadow-xl" 
            : "border-slate-100/50 bg-white/70 backdrop-blur-xl"
        )}>
          <SidebarHeader className="p-8">
            <div className="flex items-center gap-4">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-[1.25rem] shadow-xl transition-transform hover:rotate-3",
                isAdmin 
                  ? "bg-slate-800 text-amber-400 shadow-amber-400/10 border border-slate-700" 
                  : "bg-gradient-to-br from-primary to-primary-foreground text-white shadow-primary/20"
              )}>
                {isAdmin ? <ShieldCheck size={28} strokeWidth={1.5} className="text-indigo-600" /> : <Baby size={28} strokeWidth={1.5} />}
              </div>
              <div>
                <h2 className={cn(
                  "text-xl font-bold tracking-tight leading-none mb-1",
                  isAdmin ? "text-slate-900" : "text-primary"
                )}>
                  {isAdmin ? 'StepCommand' : 'LittleSteps'}
                </h2>
                <div className={cn(
                  "flex items-center gap-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em]",
                  isAdmin ? "text-slate-400" : "text-accent/80"
                )}>
                  <span className={cn("h-1 w-1 rounded-full animate-pulse", isAdmin ? "bg-indigo-500" : "bg-accent")} />
                  {isAdmin ? 'Institutional Intelligence' : 'Premium LMS'}
                </div>
              </div>
            </div>
 
            <div className="mt-8 relative">
              <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2", isAdmin ? "text-slate-400" : "text-slate-300")} size={14} />
              <input 
                type="text" 
                placeholder="Find anything..." 
                className={cn(
                  "h-10 w-full rounded-2xl border pl-10 pr-4 text-xs font-medium transition-all focus:outline-none",
                  isAdmin 
                    ? "border-slate-200 bg-white text-slate-900 focus:bg-white focus:ring-slate-100"
                    : "border-slate-100 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-primary/5"
                )}
              />
            </div>
          </SidebarHeader>

          <SidebarContent className="px-5 py-4">
            <div className={cn(
              "mb-4 px-3 text-[10px] font-bold uppercase tracking-widest",
              isAdmin ? "text-slate-600" : "text-slate-400"
            )}>Main Menu</div>
            <SidebarMenu className="gap-1.5">
              {currentMenu.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => setActiveTab(item.id)}
                    className={cn(
                      "group flex items-center gap-4 rounded-2xl px-4 py-7 transition-all duration-300 active:scale-95",
                      activeTab === item.id 
                        ? (isAdmin ? "bg-white text-indigo-600 border border-indigo-100 shadow-xl shadow-indigo-100/20" : "bg-primary text-white shadow-lg shadow-primary/20")
                        : (isAdmin ? "text-slate-500 hover:bg-slate-50 hover:text-slate-900" : "text-slate-500 hover:bg-slate-50 hover:text-primary")
                    )}
                  >
                    <item.icon size={20} strokeWidth={activeTab === item.id ? 2 : 1.5} className={cn(
                      "transition-transform duration-300 group-hover:scale-110", 
                      activeTab === item.id 
                        ? (isAdmin ? "text-indigo-600" : "text-white") 
                        : (isAdmin ? "text-slate-400" : "text-slate-400")
                    )} />
                    <span className="text-sm font-semibold tracking-wide">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <Separator className={cn("my-8", isAdmin ? "bg-slate-800" : "bg-slate-100/50")} />
            
            <div className={cn(
              "mb-4 px-3 text-[10px] font-bold uppercase tracking-widest",
              isAdmin ? "text-slate-600" : "text-slate-400"
            )}>{isAdmin ? 'Secure Operations' : 'System Insights'}</div>
            <div className="space-y-4 px-3">
              <div className={cn(
                "rounded-[1.5rem] p-4 border",
                isAdmin ? "bg-slate-50 border-slate-100" : "bg-accent/5 border-accent/10"
              )}>
                <div className="flex items-center justify-between mb-2">
                  <p className={cn("text-[10px] font-bold uppercase tracking-widest", isAdmin ? "text-slate-400" : "text-accent")}>Vault Sync</p>
                  <span className="h-2 w-2 rounded-full bg-green-500 shadow-sm" />
                </div>
                <div className={cn("h-1.5 w-full rounded-full overflow-hidden", isAdmin ? "bg-slate-200" : "bg-accent/10")}>
                  <div className={cn("h-full rounded-full", isAdmin ? "bg-indigo-500 w-[92%]" : "bg-accent w-[78%]")} />
                </div>
                <p className={cn("mt-2 text-[10px] font-medium uppercase tracking-wider tabular-nums", isAdmin ? "text-slate-400" : "text-slate-500")}>
                  {isAdmin ? 'Encrypted Connection Active' : '1.2GB/2GB Utilized'}
                </p>
              </div>
            </div>
          </SidebarContent>

          <SidebarFooter className="p-8">
            <div className={cn(
              "group flex items-center gap-4 cursor-pointer rounded-2xl p-2 transition-colors",
              isAdmin ? "hover:bg-slate-50" : "hover:bg-slate-50/50"
            )}>
              <div className="relative">
                <Avatar className={cn(
                  "h-12 w-12 border-2 shadow-xl",
                  isAdmin ? "border-slate-100" : "border-white"
                )}>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`} />
                  <AvatarFallback className="bg-slate-100">US</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 shadow-md" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className={cn(
                  "truncate text-sm font-bold transition-colors",
                  isAdmin ? "text-slate-900 group-hover:text-indigo-600" : "text-primary group-hover:text-accent"
                )}>
                  {role.charAt(0).toUpperCase() + role.slice(1)} Mode
                </p>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={10} className={isAdmin ? "text-indigo-500" : "text-green-500"} />
                  <p className={cn("truncate text-[10px] font-bold uppercase tracking-wider", isAdmin ? "text-slate-400" : "text-slate-400")}>Authenticated</p>
                </div>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 overflow-auto">
          <header className={cn(
            "sticky top-0 z-20 flex h-20 items-center justify-between px-10 transition-all duration-300 border-b backdrop-blur-md",
            isAdmin 
              ? "border-slate-100 bg-white/80 shadow-sm" 
              : "border-white/40 bg-white/40"
          )}>
            <div className="flex items-center gap-6">
              <SidebarTrigger className={cn(
                "h-11 w-11 rounded-full border shadow-sm transition-all",
                isAdmin 
                  ? "border-slate-100 bg-white text-slate-400 hover:bg-indigo-600 hover:text-white"
                  : "border-slate-100/50 bg-white/50 text-slate-400 hover:bg-primary hover:text-white"
              )} />
              <div className={cn("h-6 w-[1px]", isAdmin ? "bg-slate-100" : "bg-slate-200")} />
              <div className="space-y-0.5">
                <h1 className={cn(
                  "text-2xl font-bold tracking-tight",
                  isAdmin ? "text-slate-900" : "text-primary"
                )}>
                  {isAdmin ? 'Strategic Command' : 'Academic Hub'}
                </h1>
                <p className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.25em] leading-none",
                  isAdmin ? "text-slate-400" : "text-slate-400"
                )}>Perspective: {activeTab}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden xl:block">
                <Search className={cn("absolute left-4 top-1/2 -translate-y-1/2", isAdmin ? "text-slate-400" : "text-slate-300")} size={16} />
                <input 
                  type="text" 
                  placeholder="Universal search..." 
                  className={cn(
                    "h-11 w-72 rounded-full border pl-11 font-sans text-xs transition-all shadow-sm focus:outline-none",
                    isAdmin 
                      ? "border-slate-100 bg-white text-slate-900 focus:bg-white focus:ring-slate-50"
                      : "border-slate-100 bg-white/50 text-slate-900 focus:bg-white focus:ring-primary/5"
                  )}
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Button variant="outline" size="icon" className={cn(
                    "h-11 w-11 rounded-full shadow-sm transition-all",
                    isAdmin 
                      ? "border-slate-100 bg-white hover:bg-slate-50 hover:shadow-md"
                      : "border-white/50 bg-white/50 hover:bg-white hover:shadow-md"
                  )}>
                    <Bell size={18} strokeWidth={1.5} className={isAdmin ? "text-slate-500" : "text-slate-500"} />
                  </Button>
                  <span className={cn(
                    "absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold shadow-md border-2 ring-offset-2",
                    isAdmin ? "bg-indigo-600 text-white border-white" : "bg-secondary text-white border-white"
                  )}>4</span>
                </div>
                
                <Separator orientation="vertical" className={cn("mx-2 h-6", isAdmin ? "bg-slate-100" : "bg-slate-200")} />
 
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={onLogout}
                  className={cn(
                    "h-11 w-11 rounded-full shadow-sm transition-all group",
                    isAdmin 
                      ? "border-slate-100 bg-white hover:bg-rose-50 hover:text-rose-600"
                      : "border-white/50 bg-white/50 hover:bg-secondary/10 hover:border-secondary/20 hover:text-secondary"
                  )}
                  title="Secure Logout"
                >
                  <LogOut size={18} strokeWidth={1.5} className="group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          </header>

          <div className={cn(
            "p-10 animate-in fade-in slide-in-from-bottom-4 duration-700",
            isAdmin ? "bg-slate-50" : ""
          )}>
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
