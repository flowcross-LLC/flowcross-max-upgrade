import { useEffect, useState } from "react";
import { Users, Download, Server, Trophy } from "lucide-react";

const FlowCrossStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      icon: Users,
      value: 2500000,
      suffix: "+",
      label: "Активных игроков",
      description: "по всему миру",
      color: "text-blue-400",
      gradient: "from-blue-400/20 to-cyan-400/20"
    },
    {
      icon: Download,
      value: 15000000,
      suffix: "+",
      label: "Скачиваний",
      description: "всех версий",
      color: "text-green-400",
      gradient: "from-green-400/20 to-emerald-400/20"
    },
    {
      icon: Server,
      value: 50000,
      suffix: "+",
      label: "Серверов",
      description: "в сети",
      color: "text-purple-400",
      gradient: "from-purple-400/20 to-pink-400/20"
    },
    {
      icon: Trophy,
      value: 99,
      suffix: "%",
      label: "Довольных пользователей",
      description: "рекомендуют FlowCross",
      color: "text-yellow-400",
      gradient: "from-yellow-400/20 to-orange-400/20"
    }
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const intervals = stats.map((stat, index) => {
      const increment = stat.value / 100;
      let current = 0;

      return setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          current = stat.value;
          clearInterval(intervals[index]);
        }
        setCounters(prev => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(current);
          return newCounters;
        });
      }, 20);
    });

    return () => intervals.forEach(clearInterval);
  }, [isVisible]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
  };

  return (
    <section id="stats-section" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Цифры, которые <span className="neon-text text-primary">впечатляют</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Миллионы игроков по всему миру доверяют FlowCross
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl glass-effect hover:scale-105 transition-all duration-500 floating-glow text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-block p-4 rounded-xl mb-6 ${stat.color} bg-current/10`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    {formatNumber(counters[index])}{stat.suffix}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 text-foreground">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowCrossStats;