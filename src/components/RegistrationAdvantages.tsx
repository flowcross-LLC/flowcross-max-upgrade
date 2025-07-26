import { Shield, Zap, Crown, Users, Download, Star } from "lucide-react";

const RegistrationAdvantages = () => {
  const advantages = [
    {
      icon: Shield,
      title: "Полная безопасность",
      description: "Защита аккаунта и сохранность данных"
    },
    {
      icon: Zap,
      title: "Мгновенный доступ",
      description: "Быстрая загрузка и установка модов"
    },
    {
      icon: Crown,
      title: "Премиум функции",
      description: "Эксклюзивные возможности для пользователей"
    },
    {
      icon: Users,
      title: "Сообщество",
      description: "Присоединяйтесь к миллионам игроков"
    },
    {
      icon: Download,
      title: "Неограниченные загрузки",
      description: "Скачивайте любые моды без ограничений"
    },
    {
      icon: Star,
      title: "Ранний доступ",
      description: "Первыми получайте новые функции"
    }
  ];

  return (
    <div className="glass-effect rounded-xl p-6 h-fit">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Преимущества регистрации
        </h3>
        <p className="text-muted-foreground text-sm">
          Откройте все возможности FlowCross
        </p>
      </div>

      <div className="space-y-4">
        {advantages.map((advantage, index) => (
          <div 
            key={index}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors duration-200"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <advantage.icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground text-sm">{advantage.title}</h4>
              <p className="text-muted-foreground text-xs mt-1">{advantage.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Уже зарегистрировано
          </p>
          <p className="text-lg font-bold text-primary animate-pulse">
            2,847,392 игрока
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationAdvantages;