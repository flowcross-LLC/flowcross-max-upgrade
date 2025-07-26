import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Palette, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  premium: boolean;
}

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

const ThemeSelector = ({ currentTheme, onThemeChange }: ThemeSelectorProps) => {
  const { toast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const themes: Theme[] = [
    {
      id: "default",
      name: "FlowCross Classic",
      description: "Стандартная черно-белая тема",
      preview: "Классический дизайн лаунчера",
      colors: {
        primary: "#ffffff",
        secondary: "#333333",
        background: "#0a0a0a"
      },
      premium: false
    },
    {
      id: "neon",
      name: "Neon Dreams",
      description: "Яркая неоновая тема с подсветкой",
      preview: "Неоновые акценты и свечение",
      colors: {
        primary: "#00ff88",
        secondary: "#ff0080",
        background: "#0d0d1a"
      },
      premium: true
    },
    {
      id: "ocean",
      name: "Ocean Blue",
      description: "Спокойная синяя тема",
      preview: "Морские оттенки и градиенты",
      colors: {
        primary: "#0088ff",
        secondary: "#004c88",
        background: "#001122"
      },
      premium: true
    },
    {
      id: "sunset",
      name: "Sunset Orange",
      description: "Теплая оранжево-красная тема",
      preview: "Закатные цвета и переливы",
      colors: {
        primary: "#ff6600",
        secondary: "#cc3300",
        background: "#1a0f0a"
      },
      premium: true
    },
    {
      id: "forest",
      name: "Forest Green",
      description: "Природная зеленая тема",
      preview: "Лесные оттенки и естественность",
      colors: {
        primary: "#00aa44",
        secondary: "#006622",
        background: "#0a1a0f"
      },
      premium: false
    },
    {
      id: "purple",
      name: "Royal Purple",
      description: "Элегантная фиолетовая тема",
      preview: "Королевские оттенки фиолетового",
      colors: {
        primary: "#8844ff",
        secondary: "#5522aa",
        background: "#1a0f2a"
      },
      premium: true
    }
  ];

  const handleThemeSelect = (theme: Theme) => {
    if (theme.premium && !isUserPremium()) {
      toast({
        title: "Премиум тема",
        description: "Эта тема доступна только для Premium пользователей",
        variant: "destructive"
      });
      return;
    }

    onThemeChange(theme.id);
    applyTheme(theme);
    
    toast({
      title: "Тема применена!",
      description: `Активирована тема "${theme.name}"`
    });
  };

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.colors.primary);
    root.style.setProperty('--theme-secondary', theme.colors.secondary);
    root.style.setProperty('--theme-background', theme.colors.background);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const isUserPremium = () => {
    // Проверяем статус пользователя (для демо всегда true)
    return true;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
          <Palette className="w-5 h-5" />
          Темы оформления
        </h3>
        <p className="text-muted-foreground text-sm">
          Выберите тему для персонализации интерфейса
        </p>
      </div>

      <div className="space-y-4">
        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm text-muted-foreground">
            {themes.length} доступных тем
          </h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={scrollLeft}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollRight}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable Themes Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`flex-shrink-0 w-64 cursor-pointer transition-all duration-300 rounded-xl border p-4 ${
                currentTheme === theme.id 
                  ? "border-primary shadow-lg shadow-primary/20 bg-card" 
                  : "border-border hover:border-primary/50 bg-card/50"
              }`}
              onClick={() => handleThemeSelect(theme)}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">{theme.name}</h3>
                  {theme.premium && (
                    <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-1 rounded-full font-bold">
                      PRO
                    </span>
                  )}
                </div>
                {currentTheme === theme.id && (
                  <Check className="w-4 h-4 text-primary" />
                )}
              </div>
              
              <p className="text-muted-foreground text-xs mb-3">
                {theme.description}
              </p>
              
              {/* Theme Preview */}
              <div 
                className="rounded-lg p-3 mb-3 border"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.background}, ${theme.colors.secondary}20)`,
                  borderColor: theme.colors.primary + "30"
                }}
              >
                <div className="flex items-center space-x-1 mb-2">
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.colors.secondary }}
                  />
                  <div className="w-2 h-2 rounded-full bg-muted" />
                </div>
                <div 
                  className="text-xs font-medium"
                  style={{ color: theme.colors.primary }}
                >
                  {theme.preview}
                </div>
              </div>

              {/* Color Palette */}
              <div className="flex justify-center space-x-2 mb-3">
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.colors.primary }}
                  title="Primary"
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.colors.secondary }}
                  title="Secondary"
                />
                <div 
                  className="w-4 h-4 rounded-full border border-white/20"
                  style={{ backgroundColor: theme.colors.background }}
                  title="Background"
                />
              </div>

              <Button
                variant={currentTheme === theme.id ? "default" : "outline"}
                size="sm"
                className="w-full"
                disabled={currentTheme === theme.id}
              >
                {currentTheme === theme.id ? (
                  <>
                    <Check className="w-3 h-3 mr-2" />
                    Активна
                  </>
                ) : theme.premium && !isUserPremium() ? (
                  <>
                    <Download className="w-3 h-3 mr-2" />
                    Получить Premium
                  </>
                ) : (
                  "Применить"
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Premium CTA */}
      <div className="glass-effect p-6 rounded-xl text-center">
        <h4 className="font-semibold mb-2">Хотите больше тем?</h4>
        <p className="text-muted-foreground text-sm mb-4">
          Получите доступ ко всем Premium темам и создавайте собственные
        </p>
        <Button variant="premium" size="sm">
          Перейти на Premium
        </Button>
      </div>
    </div>
  );
};

export default ThemeSelector;