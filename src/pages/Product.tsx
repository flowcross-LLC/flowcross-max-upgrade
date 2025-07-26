import { ArrowLeft, Zap, Server, Users, DollarSign, Download, Shield, Rocket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Product = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: "Молниеносная скорость",
      description: "Запуск игры за секунды благодаря оптимизированному коду и кэшированию"
    },
    {
      icon: Shield,
      title: "Безопасность",
      description: "Встроенная защита от вредоносных модов и проверка целостности файлов"
    },
    {
      icon: Rocket,
      title: "Модульность",
      description: "Гибкая система модов и плагинов для персонализации игрового опыта"
    }
  ];

  const servers = [
    {
      name: "FlowCross Main",
      players: "1,247",
      status: "online",
      ping: "12ms"
    },
    {
      name: "Creative Build",
      players: "892",
      status: "online", 
      ping: "18ms"
    },
    {
      name: "Survival Hard",
      players: "634",
      status: "online",
      ping: "25ms"
    }
  ];

  const pricing = [
    {
      name: "Free",
      price: "0₽",
      period: "навсегда",
      features: ["Базовый лаунчер", "Доступ к серверам", "Стандартная поддержка"]
    },
    {
      name: "Pro",
      price: "299₽",
      period: "в месяц",
      features: ["Все возможности Free", "Премиум моды", "Приоритетная поддержка", "Эксклюзивные серверы"],
      popular: true
    },
    {
      name: "Team",
      price: "999₽",
      period: "в месяц",
      features: ["Все возможности Pro", "Управление командой", "Корпоративная поддержка", "Белый лейбл"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Продукт FlowCross</h1>
              <p className="text-muted-foreground">Все о возможностях нашего лаунчера</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Features Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Основные возможности</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              FlowCross предлагает современный подход к запуску Minecraft с упором на производительность и удобство
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border hover:bg-card/80 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Servers Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Наши серверы</h2>
            <p className="text-muted-foreground">
              Подключайтесь к официальным серверам FlowCross для лучшего игрового опыта
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {servers.map((server, index) => (
              <Card key={index} className="bg-card/50 border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{server.name}</CardTitle>
                    <Badge variant="default" className="bg-green-500/20 text-green-400">
                      {server.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center justify-between mt-2">
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {server.players} игроков
                      </span>
                      <span className="text-primary font-medium">{server.ping}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Тарифные планы</h2>
            <p className="text-muted-foreground">
              Выберите подходящий план для ваших потребностей
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((plan, index) => (
              <Card key={index} className={`bg-card/50 border-border relative ${plan.popular ? 'border-primary' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Популярный
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                    <span className="text-sm text-muted-foreground font-normal">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6" 
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {plan.name === "Free" ? "Скачать" : "Выбрать план"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;