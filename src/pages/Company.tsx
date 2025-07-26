import { ArrowLeft, Users, Target, Award, Briefcase, FileText, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Company = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "Алексей Иванов",
      role: "CEO & Основатель",
      avatar: "",
      description: "10+ лет в разработке игровых платформ"
    },
    {
      name: "Мария Петрова", 
      role: "CTO",
      avatar: "",
      description: "Эксперт по системной архитектуре"
    },
    {
      name: "Дмитрий Сидоров",
      role: "Lead Developer", 
      avatar: "",
      description: "Специалист по оптимизации производительности"
    }
  ];

  const values = [
    {
      icon: Users,
      title: "Сообщество прежде всего",
      description: "Мы создаем продукт для игроков, слушая их потребности и предложения"
    },
    {
      icon: Target,
      title: "Фокус на качестве",
      description: "Каждая функция тщательно продумана и протестирована"
    },
    {
      icon: Award,
      title: "Инновации",
      description: "Мы внедряем передовые технологии для улучшения игрового опыта"
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Основание FlowCross",
      description: "Началось как pet-проект для оптимизации запуска Minecraft"
    },
    {
      year: "2021", 
      title: "Первая публичная версия",
      description: "Выпуск альфа-версии для ограниченной аудитории"
    },
    {
      year: "2022",
      title: "100,000 пользователей",
      description: "Достижение первых значимых показателей роста"
    },
    {
      year: "2023",
      title: "Корпоративные клиенты",
      description: "Запуск B2B решений для серверов и организаций"
    },
    {
      year: "2024",
      title: "Международная экспансия",
      description: "Локализация и поддержка множественных регионов"
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
              <h1 className="text-3xl font-bold text-foreground">О FlowCross</h1>
              <p className="text-muted-foreground">Наша миссия, команда и ценности</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* About Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Наша миссия</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            FlowCross создает современные инструменты для геймеров, делая запуск и управление играми 
            простым, быстрым и безопасным. Мы верим, что технологии должны улучшать игровой опыт, 
            а не усложнять его.
          </p>
        </section>

        {/* Values Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Наши ценности</h2>
            <p className="text-muted-foreground">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-card/50 border-border text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Наша команда</h2>
            <p className="text-muted-foreground">
              Профессионалы, создающие будущее игровых платформ
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-card/50 border-border text-center">
                <CardHeader>
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary text-lg font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium mb-2">
                    {member.role}
                  </CardDescription>
                  <CardDescription>{member.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">История развития</h2>
            <p className="text-muted-foreground">
              Ключевые моменты в развитии FlowCross
            </p>
          </div>

          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{milestone.year}</span>
                  </div>
                </div>
                <Card className="flex-1 bg-card/50 border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{milestone.title}</CardTitle>
                    <CardDescription>{milestone.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Links Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Дополнительная информация</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Briefcase className="w-6 h-6 text-primary" />
              <span>Карьера</span>
              <span className="text-xs text-muted-foreground">Присоединяйтесь к команде</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              <span>Пресс-кит</span>
              <span className="text-xs text-muted-foreground">Медиа-материалы</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Newspaper className="w-6 h-6 text-primary" />
              <span>Блог</span>
              <span className="text-xs text-muted-foreground">Новости и статьи</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              <span>Сообщество</span>
              <span className="text-xs text-muted-foreground">Discord и форумы</span>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Company;