import { useState } from "react";
import { Zap, Palette, Shield, Cloud, Gamepad2, Cpu, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const FlowCrossFeatures = () => {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const features = [
    {
      icon: Zap,
      title: "Молниеносная скорость",
      description: "Оптимизированное время запуска и минимальное использование ресурсов. Попадайте в игру быстрее, чем когда-либо.",
      details: "FlowCross использует революционную технологию кэширования и предзагрузки модов. Наш движок на 300% быстрее конкурентов благодаря оптимизации на уровне JVM и умному управлению памятью.",
      color: "text-yellow-400",
      bgColor: "from-yellow-400/20 to-orange-500/20"
    },
    {
      icon: Palette,
      title: "Полная кастомизация",
      description: "Настройте свой опыт с темами, модами и настройками. Сделайте лаунчер по-настоящему своим.",
      color: "text-pink-400",
      bgColor: "from-pink-400/20 to-purple-500/20"
    },
    {
      icon: Shield,
      title: "Военная безопасность",
      description: "Построен с учетом безопасности. Ваш аккаунт и данные всегда защищены.",
      color: "text-green-400",
      bgColor: "from-green-400/20 to-emerald-500/20"
    },
    {
      icon: Cloud,
      title: "Облачная синхронизация",
      description: "Ваши настройки и моды синхронизируются на всех устройствах. Играйте где угодно, когда угодно.",
      color: "text-blue-400",
      bgColor: "from-blue-400/20 to-cyan-500/20"
    }
  ];

  const additionalFeatures = [
    {
      icon: Gamepad2,
      title: "Бесшовная интеграция",
      description: "Все моды работают вместе без конфликтов. Наша интеллектуальная система зависимостей обеспечивает идеальную совместимость."
    },
    {
      icon: Download,
      title: "Установка в один клик",
      description: "Устанавливайте любой мод одним кликом. Никаких ручных загрузок или управления файлами."
    },
    {
      icon: Cpu,
      title: "Автообновления",
      description: "Моды остаются обновленными автоматически. Никогда не беспокойтесь об устаревших версиях, ломающих игру."
    },
    {
      icon: Star,
      title: "Проверенная безопасность",
      description: "Каждый мод сканируется на вредоносное ПО перед появлением в нашем магазине."
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden section-block mx-4 md:mx-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5"></div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full">
              Почему выбирают нас
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Почему <span className="neon-text text-primary">FlowCross</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Испытайте гейминг как никогда раньше с нашими передовыми технологиями лаунчера
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl glass-effect hover:scale-105 transition-all duration-500 floating-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`inline-block p-4 rounded-xl mb-6 ${feature.color} bg-current/10`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-4 text-primary hover:text-primary-foreground"
                  onClick={() => setSelectedFeature(feature)}
                >
                  Узнать больше →
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Modular Experience Section */}
        <div className="section-block section-block-rounded p-8 md:p-12 glass-effect">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Модульный <span className="text-primary">опыт</span>
            </h3>
            <p className="text-xl text-muted-foreground">
              Полная экосистема для максимального игрового удовольствия
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background/50 hover:bg-background/80 transition-all duration-300 group"
              >
                <div className="inline-block p-3 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2 text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="glow" size="lg">
              Сравнить все функции →
            </Button>
          </div>
        </div>

        {/* Feature Details Modal */}
        <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="glass-effect max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                {selectedFeature?.icon && <selectedFeature.icon className={`w-8 h-8 ${selectedFeature.color}`} />}
                {selectedFeature?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-foreground">{selectedFeature?.description}</p>
              <p className="text-muted-foreground">{selectedFeature?.details}</p>
              <div className="pt-4">
                <Button variant="glow" onClick={() => setSelectedFeature(null)}>
                  Понятно, круто! 🚀
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default FlowCrossFeatures;