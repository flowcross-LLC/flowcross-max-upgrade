import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Play, Star, Users, Zap, Shield } from "lucide-react";

const FlowCrossHero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { icon: Users, value: "2.5M+", label: "Active Players" },
    { icon: Star, value: "4.9", label: "User Rating" },
    { icon: Zap, value: "50%", label: "Faster Loading" },
    { icon: Shield, value: "100%", label: "Secure" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/20"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-block">
            <div className="gradient-border p-4 rounded-full">
              <span className="text-sm font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                🚀 Новая версия v2.9.3 уже доступна!
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="neon-text bg-gradient-to-r from-primary via-pink-500 to-accent bg-clip-text text-transparent">
              Flowcross
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Минималистичный, мощный лаунчер Minecraft для современного гейминга.
            <br />
            <span className="text-primary font-semibold">
              Создан для производительности, разработан для простоты.
            </span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="premium" size="xl" className="w-full sm:w-auto">
              <Download className="w-5 h-5 mr-2" />
              Скачать v2.9.3
            </Button>
            <Button
              variant="neon"
              size="xl"
              className="w-full sm:w-auto"
              onClick={() => setIsVideoPlaying(true)}
            >
              <Play className="w-5 h-5 mr-2" />
              Смотреть демо
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300 floating-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-bounce-slow opacity-60"></div>
        <div className="absolute bottom-40 right-20 w-6 h-6 bg-accent rounded-full animate-bounce-slow opacity-40" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-10 w-3 h-3 bg-pink-500 rounded-full animate-bounce-slow opacity-50" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video bg-card rounded-xl overflow-hidden glass-effect">
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Демо видео FlowCross Launcher
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlowCrossHero;