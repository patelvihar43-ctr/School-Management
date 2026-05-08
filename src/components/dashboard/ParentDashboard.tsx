import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Calendar, 
  Star, 
  Image as ImageIcon,
  Play,
  Download,
  ChevronRight,
  Clock,
  BrainCircuit,
  Sparkles
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { motion } from 'motion/react';
import { useAppState } from '@/context/StateContext';
import { generateChildInsights } from '@/services/geminiService';

export default function ParentDashboard() {
  const { stars, recentActivities, highlights } = useAppState();
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiInsight, setAiInsight] = useState<any>(null);

  const milestones = [
    { label: 'Social Integration', value: 80, color: 'bg-primary' },
    { label: 'Cognitive Synthesis', value: 65, color: 'bg-accent' },
    { label: 'Physical Coordination', value: 90, color: 'bg-green-600' },
    { label: 'Linguistic Mastery', value: 75, color: 'bg-primary/60' },
  ];

  const handleGenerateInsight = async () => {
    setIsGenerating(true);
    try {
      const insight = await generateChildInsights('Alice Johnson', recentActivities.map(a => a.event));
      setAiInsight(insight);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 space-y-10">
          <Card className="premium-card border-none bg-primary text-white">
            <CardContent className="flex items-center gap-10 p-12">
              <Avatar className="oval-mask h-28 w-28 overflow-hidden border-4 border-white/20 bg-white/10 shadow-2xl">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alice" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-4xl font-bold text-white">Welcome back, Vihar</h2>
                <p className="mt-2 text-xl font-medium text-white/70">Alice is flourishing in her academic environment today.</p>
                <div className="mt-6 flex gap-3">
                  <Badge className="rounded-full bg-white/10 px-4 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20">Kindergarten Excellence</Badge>
                  <Badge className="rounded-full bg-accent px-4 py-1 font-sans text-[10px] font-bold uppercase tracking-widest text-white">On Campus</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highlights Feed */}
          {highlights.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary">Academy Highlights</h3>
              <div className="grid grid-cols-2 gap-6">
                {highlights.map((url, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="overflow-hidden rounded-[2.5rem] border-4 border-white shadow-xl"
                  >
                    <img src={url} alt="Highlight" className="h-64 w-full object-cover" referrerPolicy="no-referrer" />
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Daily Timeline */}
          <Card className="premium-card">
            <CardHeader className="p-10 pb-6">
              <CardTitle className="text-2xl font-bold">Alice's Daily Narrative</CardTitle>
              <CardDescription className="font-sans text-xs uppercase tracking-wider text-slate-400">Real-time updates from the academy</CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-0">
              <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2">
                <div className="rounded-3xl bg-blue-50 p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-blue-500 shadow-sm transition-transform hover:scale-110">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Restorative Sleep</p>
                    <p className="text-lg font-bold text-blue-900">1h 45m today</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-orange-50 p-6 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-orange-500 shadow-sm transition-transform hover:scale-110">
                    <Heart size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Nutritional Intake</p>
                    <p className="text-lg font-bold text-orange-900">3 Meals consumed</p>
                  </div>
                </div>
              </div>

              <div className="relative space-y-12 before:absolute before:left-[23px] before:top-2 before:h-[calc(100%-16px)] before:w-[1px] before:bg-slate-100">
                {recentActivities.map((item, i) => (
                  <motion.div 
                    key={i} 
                    className="relative flex gap-10 pl-14"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className={`absolute left-0 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-md bg-accent/10 text-accent`}>
                      <Star size={18} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">{item.time}</p>
                        <Button variant="ghost" size="sm" className="h-8 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest text-primary">View Report</Button>
                      </div>
                      <h4 className="text-xl font-semibold text-primary">{item.event}</h4>
                      {item.photo && (
                        <div className="overflow-hidden rounded-[2rem] border border-slate-50 shadow-sm">
                          <img src={item.photo} alt="Activity" className="h-48 w-full object-cover transition-transform duration-700 hover:scale-105" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="premium-card border-none bg-accent/5 overflow-hidden">
            <CardHeader className="p-10 pb-6 relative">
              <div className="absolute -right-6 -top-6 opacity-5 rotate-12">
                <BrainCircuit size={120} />
              </div>
              <CardTitle className="flex items-center gap-3 text-2xl font-bold text-accent">
                <BrainCircuit size={28} />
                AI Growth Insights
              </CardTitle>
              <CardDescription className="font-sans text-xs uppercase tracking-wider text-accent/60">Predictive Development Analysis</CardDescription>
            </CardHeader>
            <CardContent className="p-10 pt-0 space-y-8">
              <div className="rounded-3xl bg-white p-8 shadow-sm border border-accent/10">
                {isGenerating ? (
                   <div className="flex flex-col items-center justify-center py-6 gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                    <p className="text-sm font-bold text-accent uppercase tracking-widest">Consulting Development AI...</p>
                  </div>
                ) : aiInsight ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <p className="text-xl font-medium text-slate-600 leading-relaxed italic">
                      "{aiInsight.insight}"
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Badge className="bg-accent text-white py-2 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest">Top Talent: {aiInsight.topTalent}</Badge>
                      <Badge variant="outline" className="border-accent/20 text-accent py-2 px-4 rounded-full text-[10px] font-bold uppercase tracking-widest">Next Milestone: {aiInsight.nextMilestone}</Badge>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-slate-400 font-medium mb-6">Receive personalized AI insights based on Alice's recent school activity.</p>
                    <Button onClick={handleGenerateInsight} className="rounded-full bg-accent text-white px-8 h-12">
                      <Sparkles className="mr-2" size={18} />
                      Generate Insights
                    </Button>
                  </div>
                )}
              </div>
              <Button variant="ghost" className="w-full rounded-full py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-accent hover:bg-accent/5">
                Download Detailed Developmental Report (PDF)
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="w-full space-y-10 lg:w-96">
          <Card className="premium-card bg-primary text-white border-none overflow-hidden">
            <CardContent className="p-8 text-center relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star size={80} fill="white" />
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest text-accent">Stars Collection</h3>
              <div className="flex justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={24} className={s <= (stars % 5 || 5) ? "fill-accent text-accent" : "text-white/20"} />
                ))}
              </div>
              <p className="text-xs font-medium text-white/70">{stars} Stars Total | Milestone Goal: {Math.ceil(stars/10)*10}</p>
              <Button className="mt-6 w-full rounded-full bg-accent text-white font-bold uppercase text-[10px] tracking-widest hover:bg-accent/90">View Rewards</Button>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold">Developmental Index</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 p-8 pt-0">
              {milestones.map((m) => (
                <div key={m.label} className="space-y-3">
                  <div className="flex justify-between font-sans text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-slate-400">{m.label}</span>
                    <span className="text-primary">{m.value}%</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-slate-50">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${m.value}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full ${m.color}`} 
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" className="mt-4 w-full rounded-full py-6 font-sans text-[10px] font-bold uppercase tracking-widest">Download Full Portfolio</Button>
            </CardContent>
          </Card>

          <Card className="premium-card">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-xl font-bold">Educational Resources</CardTitle>
              <CardDescription className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400">Curated for home enrichment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-8 pt-0">
              {[
                { title: 'Linguistic Foundations', type: 'Digital Media', icon: Play },
                { title: 'Numerical Exploration', type: 'Printable Asset', icon: Download },
              ].map((res) => (
                <div key={res.title} className="group flex items-center gap-5 rounded-2xl border border-slate-50 p-4 transition-all duration-300 hover:bg-slate-50">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400 transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <res.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-primary">{res.title}</p>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400">{res.type}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-200 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="premium-card border-none bg-accent/5">
            <CardContent className="p-10 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-accent shadow-lg">
                <MessageSquare size={28} strokeWidth={1.5} />
              </div>
              <h4 className="text-xl font-bold text-primary">Academic Liaison</h4>
              <p className="mt-2 font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400">Direct communication with lead educators</p>
              <Button className="mt-8 w-full rounded-full bg-primary py-6 font-sans text-[10px] font-bold uppercase tracking-widest text-white shadow-xl shadow-primary/20">Initiate Dialogue</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
