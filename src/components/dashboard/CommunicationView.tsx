import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Info, 
  Paperclip, 
  Image as ImageIcon, 
  Smile, 
  Send,
  Check,
  CheckCheck
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const mockChats = [
  {
    id: 1,
    name: 'Kathryn Murphy',
    avatar: 'https://i.pravatar.cc/150?u=kathryn',
    lastMessage: "hey! there i'm...",
    timestamp: '12:30 PM',
    unread: 8,
    online: true,
  },
  {
    id: 2,
    name: 'James Michael',
    avatar: 'https://i.pravatar.cc/150?u=james',
    lastMessage: "hey! there i'm...",
    timestamp: '12:30 PM',
    unread: 8,
    online: true,
  },
  {
    id: 3,
    name: 'Russell Lucas',
    avatar: 'https://i.pravatar.cc/150?u=russell',
    lastMessage: "hey! there i'm...",
    timestamp: '12:30 PM',
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: 'Caleb Bradley',
    avatar: 'https://i.pravatar.cc/150?u=caleb',
    lastMessage: "hey! there i'm...",
    timestamp: '12:30 PM',
    unread: 0,
    online: true,
  },
  {
    id: 5,
    name: 'Bobby Roy',
    avatar: 'https://i.pravatar.cc/150?u=bobby',
    lastMessage: "hey! there i'm...",
    timestamp: '12:30 PM',
    unread: 2,
    online: false,
  },
  {
    id: 6,
    name: 'Vincent Liam',
    avatar: 'https://i.pravatar.cc/150?u=vincent',
    lastMessage: "hey! there i'm...",
    timestamp: '12:30 PM',
    unread: 0,
    online: false,
  },
  {
    id: 7,
    name: 'Albert Wayne',
    avatar: 'https://i.pravatar.cc/150?u=albert',
    lastMessage: "hey! there i'm...",
    timestamp: '12:30 PM',
    unread: 0,
    online: true,
  },
  {
    id: 8,
    name: 'Elijah Willie',
    avatar: 'https://i.pravatar.cc/150?u=elijah',
    lastMessage: "hey! there i'm...",
    timestamp: '12:30 PM',
    unread: 1,
    online: false,
  }
];

const mockMessages = [
  {
    id: 1,
    senderId: 'them',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    timestamp: '6:30 pm',
  },
  {
    id: 2,
    senderId: 'me',
    text: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    timestamp: '6:32 pm',
    status: 'read'
  },
  {
    id: 3,
    senderId: 'them',
    text: 'Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text.',
    timestamp: '6:35 pm',
  }
];

export default function CommunicationView({ isAdmin = false }: { isAdmin?: boolean }) {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: 'me',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase(),
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  return (
    <div className="flex h-[calc(100vh-140px)] min-h-[500px] w-full gap-4 animate-in fade-in duration-500 pb-2">
      {/* Sidebar: Chats List */}
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full md:w-72 lg:w-80 rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden shrink-0 bg-white"
      >
        <div className="p-4 border-b border-slate-50 bg-slate-50/30">
          <div className="relative group">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full h-9 border border-slate-200 rounded-lg pl-9 pr-3 text-xs font-medium transition-all bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 placeholder:text-slate-400"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 px-3">
          <div className="space-y-0.5 py-3">
            <div className="px-3 mb-2 text-[8px] font-black uppercase tracking-widest text-slate-400">
              Direct Messages
            </div>
            {mockChats.map((chat) => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={cn(
                  "p-2.5 rounded-lg cursor-pointer transition-all flex items-center justify-between group border",
                  activeChat.id === chat.id 
                    ? "bg-indigo-50/50 border-indigo-100 shadow-sm" 
                    : "bg-transparent border-transparent hover:bg-slate-50"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="relative">
                    <Avatar className="h-9 w-9 rounded-lg shadow-sm border border-slate-100">
                      <AvatarImage src={chat.avatar} />
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-[10px] uppercase">{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div className="min-w-0 px-0.5">
                    <h4 className={cn(
                      "font-bold text-[11px] truncate transition-colors",
                      activeChat.id === chat.id ? "text-indigo-900" : "text-slate-900 group-hover:text-indigo-600"
                    )}>
                      {chat.name}
                    </h4>
                    <p className={cn(
                      "text-[9px] truncate mt-0.5",
                      chat.unread > 0 ? "font-bold text-slate-600" : "font-medium text-slate-400"
                    )}>
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                  <span className="text-[7px] font-bold uppercase tracking-widest text-slate-400">
                    {chat.timestamp}
                  </span>
                  {chat.unread > 0 && (
                    <div className="h-4 min-w-[16px] px-1 rounded-full flex items-center justify-center text-[8px] font-black text-white bg-indigo-600 shadow-sm">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>

      {/* Main Chat Area */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex-1 rounded-xl shadow-sm border border-slate-100 flex flex-col overflow-hidden min-w-0 bg-white"
      >
        {/* Chat Header */}
        <div className="h-14 px-4 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 rounded-lg shadow-sm border border-slate-100">
              <AvatarImage src={activeChat.avatar} />
              <AvatarFallback className="bg-slate-100 text-slate-600 font-bold text-[10px] uppercase">{activeChat.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-sm font-bold tracking-tight text-slate-900">{activeChat.name}</h2>
              <p className="text-[8px] font-bold uppercase tracking-widest text-indigo-600">
                {activeChat.online ? 'Communication Sync Active' : 'Protocol: Offline'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg">
              <Phone size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg">
              <Video size={16} />
            </Button>
            <div className="w-px h-5 mx-1 bg-slate-100"></div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg">
              <MoreVertical size={16} />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-50/20" ref={scrollRef}>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Badge variant="outline" className="border-none text-[8px] font-black uppercase tracking-widest px-3 py-0.5 shadow-sm bg-white text-slate-400">
                Timeline: Today
              </Badge>
            </div>

            <AnimatePresence initial={false}>
              {messages.map((msg) => {
                const isMe = msg.senderId === 'me';
                
                return (
                  <motion.div 
                    key={msg.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex w-full gap-3",
                      isMe ? "justify-end" : "justify-start"
                    )}
                  >
                    {!isMe && (
                      <Avatar className="h-8 w-8 rounded-lg shadow-sm border border-slate-100 shrink-0 mt-auto">
                        <AvatarImage src={activeChat.avatar} />
                        <AvatarFallback className="text-[10px] font-bold">{activeChat.name[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={cn(
                      "flex flex-col gap-1 max-w-[80%]",
                      isMe ? "items-end" : "items-start"
                    )}>
                      <div className={cn(
                        "px-4 py-2.5 shadow-sm text-xs leading-relaxed transition-all",
                        isMe 
                          ? "bg-indigo-600 text-white rounded-xl rounded-br-none font-medium" 
                          : "bg-white text-slate-800 rounded-xl rounded-bl-none border border-slate-100"
                      )}>
                        {msg.text}
                      </div>
                      <div className="flex items-center gap-1.5 px-1 mt-0.5">
                        <span className="text-[7px] font-bold tracking-widest text-slate-400 uppercase">
                          {msg.timestamp}
                        </span>
                        {isMe && (
                          <span className="text-indigo-400">
                            {msg.status === 'read' ? <CheckCheck size={10} /> : <Check size={10} />}
                          </span>
                        )}
                      </div>
                    </div>

                    {isMe && (
                      <Avatar className="h-8 w-8 rounded-lg shadow-sm border border-slate-100 shrink-0 mt-auto">
                        <AvatarFallback className="bg-slate-100 text-slate-600 font-black text-[9px] uppercase">ME</AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-3 border-t border-slate-50 bg-white shrink-0">
          <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-1.5 border border-slate-100 rounded-xl p-1 bg-slate-50/50 focus-within:ring-2 focus-within:ring-indigo-500/5 focus-within:border-indigo-500/20 focus-within:bg-white transition-all shadow-sm"
          >
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
              <Smile size={18} />
            </Button>
            
            <input 
              type="text"
              placeholder="Write message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 bg-transparent px-1.5 text-xs font-medium focus:outline-none min-w-0 text-slate-900"
            />
            
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-colors">
              <Paperclip size={16} />
            </Button>

            <Button 
              type="submit" 
              disabled={!messageText.trim()}
              size="sm"
              className={cn(
                "h-8 px-4 rounded-lg font-black uppercase tracking-widest text-[9px] transition-all shadow-sm shrink-0 border-none",
                messageText.trim() 
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                  : "bg-slate-200 text-slate-400 shadow-none"
              )}
            >
              Send <Send size={12} className="ml-1.5" />
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
