import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Baby, 
  ShieldCheck, 
  BookOpen, 
  Users, 
  ArrowRight,
  Sparkles,
  Lock,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { UserRole } from '@/types';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('educator');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles = [
    { id: 'admin', label: 'Administrator', icon: ShieldCheck, color: 'text-secondary', bg: 'bg-secondary/5', border: 'border-secondary/20', desc: 'Manage system and users' },
    { id: 'educator', label: 'Educator', icon: BookOpen, color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/20', desc: 'Manage classes and lessons' },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, validate credentials here
    onLogin(selectedRole);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-premium-bg selection:bg-primary/10">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-2xl shadow-primary/20 transform rotate-6">
              <Baby size={32} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight text-primary">LittleSteps</h1>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-accent/80">Premium LMS Experience</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-bold leading-tight text-primary">
              Where Every Tiny Step <br /> 
              <span className="text-accent underline decoration-accent/20 underline-offset-8 italic underline-skip-none">Leads to Greatness.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-lg">
              The world's most advanced learning management system designed specifically for early childhood education and developmental tracking.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">AI Insights</p>
            </div>
            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
                <Users size={20} />
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Portal Hub</p>
            </div>
          </div>
        </div>

        <Card className="premium-card border-none bg-white p-2">
          <CardHeader className="p-10 pb-6">
            <CardTitle className="text-3xl font-bold">Secure Access</CardTitle>
            <CardDescription className="font-sans text-xs uppercase tracking-wider text-slate-400">Continue to your personalized dashboard</CardDescription>
          </CardHeader>
          <CardContent className="p-10 pt-0 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as UserRole)}
                  className={`relative flex flex-col items-start p-5 rounded-3xl border text-left transition-all duration-300 active:scale-95 group ${
                    selectedRole === role.id 
                      ? `${role.border} ${role.bg} ring-2 ring-primary/5` 
                      : 'border-slate-50 hover:bg-slate-50'
                  }`}
                >
                  <div className={`mb-3 h-10 w-10 rounded-xl flex items-center justify-center ${role.color} ${role.bg} group-hover:scale-110 transition-transform`}>
                    <role.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h4 className={`text-sm font-bold ${selectedRole === role.id ? 'text-primary' : 'text-slate-500'}`}>{role.label}</h4>
                  <p className="mt-1 text-[10px] font-medium text-slate-400 uppercase tracking-widest line-clamp-1">{role.desc}</p>
                  
                  {selectedRole === role.id && (
                    <motion.div 
                      layoutId="role-check"
                      className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary" 
                    />
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 pl-11 focus:bg-white transition-all shadow-none"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 pl-11 focus:bg-white transition-all shadow-none"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="h-16 w-full rounded-2xl bg-primary font-bold uppercase tracking-widest text-white shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95"
              >
                Access Dashboard
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="p-10 pt-0 justify-center">
            <p className="text-xs font-medium text-slate-400">
              Forgotted password? <button className="text-primary font-bold hover:underline">Reset Recovery</button>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
