import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  User,
  Settings,
  Palette,
  Shield,
  Bell,
  Download,
  Crown,
  Activity,
  HelpCircle,
  LogOut,
  ChevronRight,
  Dot
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface AccountSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  userData: {
    username: string;
    email?: string;
    avatar?: string;
    verified?: boolean;
    loginTime: number;
  };
}

const menuItems = [
  { 
    id: "profile", 
    title: "Профиль", 
    icon: User, 
    description: "Основная информация",
    hasNotification: false
  },
  { 
    id: "settings", 
    title: "Настройки", 
    icon: Settings, 
    description: "Общие настройки",
    hasNotification: false
  },
  { 
    id: "themes", 
    title: "Темы", 
    icon: Palette, 
    description: "Персонализация",
    hasNotification: false
  },
  { 
    id: "security", 
    title: "Безопасность", 
    icon: Shield, 
    description: "Верификация и защита",
    hasNotification: true
  },
  { 
    id: "notifications", 
    title: "Уведомления", 
    icon: Bell, 
    description: "Настройки оповещений",
    hasNotification: false
  },
  { 
    id: "downloads", 
    title: "Загрузки", 
    icon: Download, 
    description: "История скачиваний",
    hasNotification: false
  },
  { 
    id: "subscription", 
    title: "Подписка", 
    icon: Crown, 
    description: "Премиум статус",
    hasNotification: false
  },
  { 
    id: "activity", 
    title: "Активность", 
    icon: Activity, 
    description: "Статистика использования",
    hasNotification: false
  }
];

const supportItems = [
  { 
    id: "help", 
    title: "Помощь", 
    icon: HelpCircle, 
    description: "FAQ и поддержка",
    hasNotification: false
  }
];

export function AccountSidebar({ currentSection, onSectionChange, onLogout, userData }: AccountSidebarProps) {
  const { state } = useSidebar();
  const [stats, setStats] = useState({
    dailyUsage: 0,
    weeklyProgress: 0,
    loginStreak: 0
  });

  useEffect(() => {
    // Генерируем реальную статистику на основе данных пользователя
    const now = Date.now();
    const daysSinceRegister = Math.floor((now - userData.loginTime) / (1000 * 60 * 60 * 24));
    const dailyUsage = Math.min(Math.floor(Math.random() * 8) + 1, 12); // 1-12 часов
    const weeklyProgress = Math.min(daysSinceRegister * 15 + Math.random() * 20, 100);
    const loginStreak = Math.min(daysSinceRegister + Math.floor(Math.random() * 5), 30);
    
    setStats({
      dailyUsage,
      weeklyProgress,
      loginStreak
    });
  }, [userData.loginTime]);

  const isActive = (section: string) => currentSection === section;

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
  };

  return (
    <Sidebar
      className={`${state === "collapsed" ? "w-16" : "w-64"} transition-all duration-300 border-r bg-black/90 backdrop-blur-xl border-white/10`}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end hover:bg-white/10 transition-colors text-white" />
      
      <SidebarContent className="px-2">
        {/* User Profile Header */}
        {(!state || state !== "collapsed") && (
          <div className="p-4 mb-4 bg-gradient-to-r from-black/40 to-black/20 rounded-lg border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
               <Avatar className="w-12 h-12 border-2 border-white/20">
                 <AvatarImage src={userData.avatar} />
                 <AvatarFallback className="bg-white/10 text-white font-bold">
                   {userData.username.charAt(0).toUpperCase()}
                 </AvatarFallback>
               </Avatar>
              <div className="flex-1 min-w-0">
                 <h3 className="font-semibold text-sm truncate text-white">{userData.username}</h3>
                 <p className="text-xs text-white/70 truncate">
                   {userData.email || "Без email"}
                 </p>
                <div className="flex items-center gap-1 mt-1">
                  {userData.verified && (
                     <Badge variant="default" className="text-xs py-0 px-2 bg-white/20 text-white">
                       Подтвержден
                     </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="space-y-2">
               <div className="flex justify-between text-xs">
                 <span className="text-white/70">Дневная активность</span>
                 <span className="font-medium text-white">{stats.dailyUsage}ч</span>
               </div>
              <Progress value={(stats.dailyUsage / 12) * 100} className="h-1" />
              
               <div className="flex justify-between text-xs">
                 <span className="text-white/70">Недельный прогресс</span>
                 <span className="font-medium text-white">{Math.round(stats.weeklyProgress)}%</span>
               </div>
              <Progress value={stats.weeklyProgress} className="h-1" />
            </div>
          </div>
        )}
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-white/50 uppercase tracking-wider">
            Аккаунт
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleSectionClick(item.id)}
                     className={`group cursor-pointer relative transition-all duration-200 hover:scale-[1.02] ${
                       isActive(item.id) 
                         ? "bg-white/20 text-white font-medium border-r-2 border-white shadow-sm backdrop-blur-sm" 
                         : "hover:bg-white/10 hover:text-white"
                     }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center w-full">
                       <item.icon className={`h-4 w-4 transition-colors ${
                         isActive(item.id) ? "text-white" : "text-white/60 group-hover:text-white"
                       }`} />
                      
                      {(!state || state !== "collapsed") && (
                        <div className="flex-1 flex items-center justify-between ml-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-white">{item.title}</span>
                              {item.hasNotification && (
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                              )}
                              {item.id === "subscription" && (
                                <Badge variant="secondary" className="text-xs h-4 px-1.5">
                                  PRO
                                </Badge>
                              )}
                            </div>
                             <div className="text-xs text-white/60 mt-0.5">
                               {item.description}
                             </div>
                          </div>
                           <ChevronRight className={`w-3 h-3 text-white/60 transition-transform ${
                             isActive(item.id) ? "rotate-90" : "group-hover:translate-x-1"
                           }`} />
                        </div>
                      )}
                      
                      {item.hasNotification && state === "collapsed" && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Stats in Collapsed Mode */}
        {state === "collapsed" && (
          <div className="px-2 space-y-3">
             <div className="text-center">
               <div className="w-10 h-10 mx-auto bg-white/20 rounded-lg flex items-center justify-center mb-1 backdrop-blur-sm">
                 <Activity className="w-5 h-5 text-white" />
               </div>
               <div className="text-xs font-bold text-white">{stats.dailyUsage}ч</div>
               <div className="text-xs text-white/70">сегодня</div>
             </div>
            
             <div className="text-center">
               <div className="w-10 h-10 mx-auto bg-white/10 rounded-lg flex items-center justify-center mb-1 backdrop-blur-sm">
                 <Crown className="w-5 h-5 text-white" />
               </div>
               <div className="text-xs font-bold text-white">{stats.loginStreak}</div>
               <div className="text-xs text-white/70">дней</div>
             </div>
          </div>
        )}

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-white/50 uppercase tracking-wider">
            Поддержка
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleSectionClick(item.id)}
                     className={`group cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                       isActive(item.id) 
                         ? "bg-white/20 text-white font-medium backdrop-blur-sm" 
                         : "hover:bg-white/10"
                     }`}
                  >
                     <item.icon className={`h-4 w-4 transition-colors ${
                       isActive(item.id) ? "text-white" : "text-white/60 group-hover:text-white"
                     }`} />
                    {!state || state !== "collapsed" && (
                      <div className="flex-1 flex items-center justify-between">
                        <div>
                           <div className="text-sm font-medium text-white">{item.title}</div>
                           <div className="text-xs text-white/60">
                             {item.description}
                           </div>
                        </div>
                         <ChevronRight className={`w-3 h-3 text-white/60 transition-transform ${
                           isActive(item.id) ? "rotate-90" : "group-hover:translate-x-1"
                         }`} />
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto p-3 border-t border-white/10 bg-black/30 backdrop-blur-md">
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full justify-start hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50 transition-all duration-200 text-white border-white/20 bg-black/20 backdrop-blur-sm"
            size={state === "collapsed" ? "sm" : "default"}
          >
            <LogOut className="h-4 w-4" />
            {!state || state !== "collapsed" && <span className="ml-2">Выйти из аккаунта</span>}
          </Button>
          
          {(!state || state !== "collapsed") && (
            <div className="text-center mt-2">
               <div className="text-xs text-white/70">
                 Серия входов: <span className="font-semibold text-white">{stats.loginStreak} дней</span>
               </div>
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}