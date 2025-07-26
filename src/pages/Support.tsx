import { ArrowLeft, HelpCircle, FileText, Code, Activity, MessageCircle, Mail, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Support = () => {
  const navigate = useNavigate();

  const faqItems = [
    {
      question: "Как установить FlowCross?",
      answer: "Скачайте установщик с официального сайта, запустите его и следуйте инструкциям. Процесс установки займет несколько минут."
    },
    {
      question: "FlowCross бесплатный?",
      answer: "Да, базовая версия FlowCross полностью бесплатна. Премиум-функции доступны по подписке."
    },
    {
      question: "Как добавить моды?",
      answer: "Откройте вкладку 'Моды' в лаунчере, нажмите 'Добавить мод' и выберите файл .jar или найдите мод в встроенном каталоге."
    },
    {
      question: "Что делать если игра не запускается?",
      answer: "Проверьте системные требования, обновите Java, очистите кэш лаунчера через настройки или обратитесь в поддержку."
    },
    {
      question: "Как сменить версию Java?",
      answer: "В настройках лаунчера найдите раздел 'Java', нажмите 'Автоматический поиск' или укажите путь к JRE вручную."
    },
    {
      question: "Безопасно ли использовать FlowCross?",
      answer: "Да, FlowCross проходит регулярные проверки безопасности и не содержит вредоносного кода. Все моды проверяются перед добавлением в каталог."
    }
  ];

  const supportOptions = [
    {
      icon: HelpCircle,
      title: "Центр помощи",
      description: "Ответы на часто задаваемые вопросы",
      action: "Перейти к FAQ",
      status: "Доступно 24/7"
    },
    {
      icon: FileText,
      title: "Документация",
      description: "Подробные руководства и инструкции",
      action: "Открыть документацию",
      status: "Обновлена сегодня"
    },
    {
      icon: Code,
      title: "API Documentation",
      description: "Техническая документация для разработчиков",
      action: "Изучить API",
      status: "v2.9.3"
    },
    {
      icon: Activity,
      title: "Статус системы",
      description: "Мониторинг работоспособности сервисов",
      action: "Проверить статус",
      status: "Все системы работают"
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Discord сообщество",
      description: "Общайтесь с другими пользователями и получайте помощь от сообщества",
      action: "Присоединиться",
      time: "Отвечаем обычно в течение 15 минут"
    },
    {
      icon: Mail,
      title: "Email поддержка",
      description: "Отправьте детальное описание проблемы на email",
      action: "support@flowcross.space",
      time: "Отвечаем в течение 24 часов"
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
              <h1 className="text-3xl font-bold text-foreground">Поддержка</h1>
              <p className="text-muted-foreground">Помощь и ресурсы для пользователей FlowCross</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Quick Help Options */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Быстрая помощь</h2>
            <p className="text-muted-foreground">
              Выберите подходящий способ получения помощи
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card key={index} className="bg-card/50 border-border hover:bg-card/80 transition-colors">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  <CardDescription>{option.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge variant="secondary" className="w-full justify-center">
                    {option.status}
                  </Badge>
                  <Button variant="outline" className="w-full">
                    {option.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Часто задаваемые вопросы</h2>
            <p className="text-muted-foreground">
              Ответы на самые популярные вопросы пользователей
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card/50 border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-medium text-foreground">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact Methods */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Связаться с нами</h2>
            <p className="text-muted-foreground">
              Если вы не нашли ответ на свой вопрос, мы всегда готовы помочь
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-card/50 border-border">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{method.title}</CardTitle>
                      <CardDescription className="mb-4">{method.description}</CardDescription>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Clock className="w-4 h-4" />
                        {method.time}
                      </div>
                      <Button variant="outline" className="w-full">
                        {method.action}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Resources */}
        <section className="bg-card/30 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-4">Дополнительные ресурсы</h3>
          <p className="text-muted-foreground mb-6">
            Изучите дополнительные материалы для более глубокого понимания FlowCross
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Руководство пользователя
            </Button>
            <Button variant="outline">
              <Code className="w-4 h-4 mr-2" />
              Документация API
            </Button>
            <Button variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              Форум сообщества
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;