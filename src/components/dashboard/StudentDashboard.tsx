import React, { useState } from 'react';
import { 
  Gamepad2, 
  Play, 
  BookOpen, 
  Palette, 
  Star,
  Music,
  Type,
  Hash,
  PenTool,
  BrainCircuit,
  Volume2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';

import { useAppState } from '@/context/StateContext';

export default function StudentDashboard() {
  const { stars, addStar } = useAppState();
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'Everything' },
    { id: 'play', label: 'Playgroup' },
    { id: 'pre', label: 'Pre-Nursery' },
    { id: 'nursery', label: 'Nursery' },
    { id: 'kg', label: 'Kindergarten' },
  ];

  const activities = [
    { title: 'Fun Songs', icon: Music, color: 'bg-indigo-400', border: 'border-indigo-500', level: 'play' },
    { title: 'Watch Rhymes', icon: Play, color: 'bg-blue-400', border: 'border-blue-500', level: 'play' },
    { title: 'ABC Learning', icon: Type, color: 'bg-green-400', border: 'border-green-500', level: 'pre' },
    { title: 'Numbers 1-10', icon: Hash, color: 'bg-yellow-400', border: 'border-yellow-500', level: 'pre' },
    { title: 'Trace Letters', icon: PenTool, color: 'bg-pink-400', border: 'border-pink-500', level: 'nursery' },
    { title: 'Listen Phonics', icon: Volume2, color: 'bg-purple-400', border: 'border-purple-500', level: 'nursery' },
    { title: 'Read Sentences', icon: BookOpen, color: 'bg-orange-400', border: 'border-orange-500', level: 'kg' },
    { title: 'Simple Math', icon: BrainCircuit, color: 'bg-red-400', border: 'border-red-500', level: 'kg' },
  ];

  const filteredActivities = activeTab === 'all' 
    ? activities 
    : activities.filter(a => a.level === activeTab);

  const handleActivityClick = (title: string) => {
    alert(`Starting activity: ${title}. Have fun!`);
  };

  return (
    <div className="space-y-10">
      <div className="text-center">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl font-black tracking-tight text-primary"
        >
          Hi, Alice! 🌈
        </motion.h1>
        <p className="mt-4 text-xl font-medium text-slate-400 italic">"Explore, Play, and Learn Today!"</p>
      </div>

      {/* Level Selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={activeTab === cat.id ? 'default' : 'outline'}
            onClick={() => setActiveTab(cat.id)}
            className={`rounded-full px-8 py-6 text-sm font-black uppercase tracking-widest transition-all duration-300 ${
              activeTab === cat.id ? 'bg-primary text-white scale-110 shadow-xl' : 'text-slate-500 border-slate-200'
            }`}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((activity, i) => (
            <motion.div
              layout
              key={activity.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -10 }}
              onClick={() => handleActivityClick(activity.title)}
            >
              <Card className={`premium-card h-56 border-b-8 ${activity.border} cursor-pointer overflow-hidden pb-0 bg-white group`}>
                <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
                  <div className={`rounded-3xl ${activity.color} p-5 text-white shadow-lg transition-transform group-hover:rotate-12`}>
                    <activity.icon size={36} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-primary uppercase tracking-tight">{activity.title}</h3>
                    <Badge variant="outline" className="text-[8px] font-bold uppercase tracking-widest border-slate-100 text-slate-400">
                      {activity.level === 'play' ? 'Tots' : activity.level === 'pre' ? 'Early' : activity.level === 'nursery' ? 'Foundation' : 'Ready'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Rewards Section */}
      <Card className="premium-card bg-gradient-to-r from-primary to-primary/90 border-none mt-12 overflow-hidden text-white shadow-2xl">
        <CardContent className="p-12 relative">
          <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
            <Star size={120} fill="white" />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6 text-center md:text-left z-10">
              <h2 className="text-4xl font-black uppercase tracking-tight">Alice's Treasure Chest ⭐</h2>
              <div className="flex justify-center md:justify-start gap-3">
                {Array.from({ length: Math.min(stars, 8) }).map((_, s) => (
                  <motion.div
                    key={s}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: s * 0.5 }}
                  >
                    <Star size={40} className="fill-accent text-accent drop-shadow-lg" />
                  </motion.div>
                ))}
                {stars > 8 && <span className="text-4xl font-black self-center">+{stars - 8}</span>}
              </div>
              <p className="text-xl font-medium text-white/80">You have {stars} stars! You're doing amazing!</p>
            </div>
            <Button 
              size="lg" 
              onClick={() => addStar(1)}
              className="h-20 px-12 rounded-full text-2xl font-black uppercase tracking-widest bg-accent text-white shadow-2xl hover:bg-accent/90 transition-all hover:scale-105 active:scale-95"
            >
              Earn Star
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
