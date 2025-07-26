import { useState } from "react";
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
  LogOut
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

interface AccountSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { 
    id: "profile", 
    title: "Профиль", 
    icon: User, 
    description: "Основная информация" 
  },
  { 
    id: "settings", 
    title: "Настройки", 
    icon: Settings, 
    description: "Общие настройки" 
  },
  { 
    id: "themes", 
    title: "Темы", 
    icon: Palette, 
    description: "Персонализация" 
  },
  { 
    id: "security", 
    title: "Безопасность", 
    icon: Shield, 
    description: "Верификация и защита" 
  },
  { 
    id: "notifications", 
    title: "Уведомления", 
    icon: Bell, 
    description: "Настройки оповещений" 
  },
  { 
    id: "downloads", 
    title: "Загрузки", 
    icon: Download, 
    description: "История скачиваний" 
  },
  { 
    id: "subscription", 
    title: "Подписка", 
    icon: Crown, 
    description: "Премиум статус" 
  },
  { 
    id: "activity", 
    title: "Активность", 
    icon: Activity, 
    description: "Статистика использования" 
  }
];

const supportItems = [
  { 
    id: "help", 
    title: "Помощь", 
    icon: HelpCircle, 
    description: "FAQ и поддержка" 
  }
];

export function AccountSidebar({ currentSection, onSectionChange, onLogout }: AccountSidebarProps) {
  const { state } = useSidebar();

  const isActive = (section: string) => currentSection === section;

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
  };

  return (
    <Sidebar
      className={state === "collapsed" ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Аккаунт</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleSectionClick(item.id)}
                    className={`cursor-pointer ${
                      isActive(item.id) 
                        ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!state || state !== "collapsed" && (
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{item.title}</span>
                          {item.id === "subscription" && (
                            <Badge variant="secondary" className="text-xs">
                              PRO
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Support */}
        <SidebarGroup>
          <SidebarGroupLabel>Поддержка</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => handleSectionClick(item.id)}
                    className={`cursor-pointer ${
                      isActive(item.id) 
                        ? "bg-primary/10 text-primary font-medium" 
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!state || state !== "collapsed" && (
                      <div>
                        <div>{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto p-4 border-t">
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full justify-start"
            size={state === "collapsed" ? "sm" : "default"}
          >
            <LogOut className="h-4 w-4" />
            {!state || state !== "collapsed" && <span className="ml-2">Выйти</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}