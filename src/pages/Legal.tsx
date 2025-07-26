import { ArrowLeft, Shield, FileText, Scale, Cookie } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const Legal = () => {
  const navigate = useNavigate();

  const legalDocuments = [
    {
      id: "privacy",
      icon: Shield,
      title: "Политика конфиденциальности",
      description: "Как мы собираем, используем и защищаем ваши данные",
      lastUpdated: "15 декабря 2024"
    },
    {
      id: "terms",
      icon: FileText,
      title: "Условия использования",
      description: "Правила и условия использования FlowCross",
      lastUpdated: "10 декабря 2024"
    },
    {
      id: "license",
      icon: Scale,
      title: "Лицензионное соглашение",
      description: "Права и ограничения использования программного обеспечения",
      lastUpdated: "1 декабря 2024"
    },
    {
      id: "cookies",
      icon: Cookie,
      title: "Политика cookies",
      description: "Информация об использовании файлов cookie",
      lastUpdated: "5 декабря 2024"
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
              <h1 className="text-3xl font-bold text-foreground">Правовая информация</h1>
              <p className="text-muted-foreground">Юридические документы и политики FlowCross</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="privacy" className="space-y-6">
          {/* Navigation */}
          <div className="grid md:grid-cols-4 gap-4">
            {legalDocuments.map((doc) => (
              <TabsTrigger
                key={doc.id}
                value={doc.id}
                className="h-auto p-4 flex flex-col items-start gap-2 data-[state=active]:bg-primary/10"
              >
                <div className="flex items-center gap-3 w-full">
                  <doc.icon className="w-5 h-5 text-primary" />
                  <span className="font-medium text-left flex-1">{doc.title}</span>
                </div>
                <p className="text-xs text-muted-foreground text-left">
                  Обновлено: {doc.lastUpdated}
                </p>
              </TabsTrigger>
            ))}
          </div>

          {/* Privacy Policy */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  Политика конфиденциальности
                </CardTitle>
                <CardDescription>
                  Последнее обновление: 15 декабря 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold mb-3">1. Сбор информации</h3>
                      <p className="text-muted-foreground">
                        Мы собираем информацию, которую вы предоставляете нам напрямую, такую как:
                      </p>
                      <ul className="mt-2 space-y-1 text-muted-foreground ml-4">
                        <li>• Имя пользователя и email адрес</li>
                        <li>• Информация о системе для оптимизации производительности</li>
                        <li>• Логи игровых сессий для улучшения сервиса</li>
                        <li>• Настройки и предпочтения пользователя</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">2. Использование информации</h3>
                      <p className="text-muted-foreground">
                        Собранная информация используется для:
                      </p>
                      <ul className="mt-2 space-y-1 text-muted-foreground ml-4">
                        <li>• Предоставления и улучшения наших сервисов</li>
                        <li>• Технической поддержки пользователей</li>
                        <li>• Обеспечения безопасности платформы</li>
                        <li>• Аналитики для улучшения продукта</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">3. Защита данных</h3>
                      <p className="text-muted-foreground">
                        Мы применяем современные методы защиты для обеспечения безопасности ваших данных, 
                        включая шифрование при передаче и хранении, регулярные аудиты безопасности и 
                        ограниченный доступ к персональным данным.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">4. Ваши права</h3>
                      <p className="text-muted-foreground">
                        Вы имеете право на доступ к своим данным, их исправление, удаление или 
                        ограничение обработки. Для реализации этих прав свяжитесь с нами по адресу 
                        privacy@flowcross.space.
                      </p>
                    </section>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Terms of Service */}
          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  Условия использования
                </CardTitle>
                <CardDescription>
                  Последнее обновление: 10 декабря 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold mb-3">1. Принятие условий</h3>
                      <p className="text-muted-foreground">
                        Используя FlowCross, вы соглашаетесь с настоящими условиями использования. 
                        Если вы не согласны с какими-либо условиями, пожалуйста, не используйте наш сервис.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">2. Описание сервиса</h3>
                      <p className="text-muted-foreground">
                        FlowCross - это игровой лаунчер для Minecraft, предоставляющий:
                      </p>
                      <ul className="mt-2 space-y-1 text-muted-foreground ml-4">
                        <li>• Удобный запуск игры с различными конфигурациями</li>
                        <li>• Управление модами и ресурс-паками</li>
                        <li>• Доступ к официальным серверам</li>
                        <li>• Социальные функции и сообщество</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">3. Правила поведения</h3>
                      <p className="text-muted-foreground">
                        Пользователи обязуются:
                      </p>
                      <ul className="mt-2 space-y-1 text-muted-foreground ml-4">
                        <li>• Использовать сервис только в законных целях</li>
                        <li>• Не нарушать права интеллектуальной собственности</li>
                        <li>• Не распространять вредоносное ПО</li>
                        <li>• Соблюдать правила сообщества</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">4. Ограничение ответственности</h3>
                      <p className="text-muted-foreground">
                        FlowCross предоставляется "как есть" без каких-либо гарантий. 
                        Мы не несем ответственности за любые прямые или косвенные убытки, 
                        возникшие в результате использования нашего сервиса.
                      </p>
                    </section>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* License */}
          <TabsContent value="license">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Scale className="w-6 h-6 text-primary" />
                  Лицензионное соглашение
                </CardTitle>
                <CardDescription>
                  Последнее обновление: 1 декабря 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold mb-3">1. Предоставление лицензии</h3>
                      <p className="text-muted-foreground">
                        FlowCross LLC предоставляет вам ограниченную, неисключительную, 
                        непередаваемую лицензию на использование программного обеспечения FlowCross 
                        в соответствии с настоящим соглашением.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">2. Разрешенное использование</h3>
                      <p className="text-muted-foreground">Вы можете:</p>
                      <ul className="mt-2 space-y-1 text-muted-foreground ml-4">
                        <li>• Установить и использовать FlowCross на своих устройствах</li>
                        <li>• Создавать резервные копии для личного использования</li>
                        <li>• Использовать все функции в соответствии с документацией</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">3. Ограничения</h3>
                      <p className="text-muted-foreground">Вы не можете:</p>
                      <ul className="mt-2 space-y-1 text-muted-foreground ml-4">
                        <li>• Декомпилировать, дизассемблировать или реверсировать код</li>
                        <li>• Удалять или изменять авторские права и торговые марки</li>
                        <li>• Распространять, продавать или сдавать в аренду ПО</li>
                        <li>• Использовать ПО для создания конкурирующих продуктов</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">4. Интеллектуальная собственность</h3>
                      <p className="text-muted-foreground">
                        Все права на FlowCross, включая код, дизайн, товарные знаки и логотипы, 
                        принадлежат FlowCross LLC и защищены законами об интеллектуальной собственности.
                      </p>
                    </section>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cookies */}
          <TabsContent value="cookies">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Cookie className="w-6 h-6 text-primary" />
                  Политика cookies
                </CardTitle>
                <CardDescription>
                  Последнее обновление: 5 декабря 2024
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    <section>
                      <h3 className="text-lg font-semibold mb-3">1. Что такое cookies</h3>
                      <p className="text-muted-foreground">
                        Cookies - это небольшие текстовые файлы, которые сохраняются на вашем устройстве 
                        при посещении веб-сайтов. Они помогают сайтам запоминать информацию о вашем визите.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">2. Типы используемых cookies</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-foreground">Необходимые cookies</h4>
                          <p className="text-sm text-muted-foreground">
                            Обеспечивают основную функциональность сайта и не могут быть отключены.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Функциональные cookies</h4>
                          <p className="text-sm text-muted-foreground">
                            Запоминают ваши предпочтения и настройки для улучшения пользовательского опыта.
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Аналитические cookies</h4>
                          <p className="text-sm text-muted-foreground">
                            Помогают понять, как пользователи взаимодействуют с сайтом для его улучшения.
                          </p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">3. Управление cookies</h3>
                      <p className="text-muted-foreground">
                        Вы можете управлять настройками cookies через браузер или наши настройки приватности. 
                        Отключение некоторых cookies может повлиять на функциональность сайта.
                      </p>
                    </section>

                    <section>
                      <h3 className="text-lg font-semibold mb-3">4. Сторонние cookies</h3>
                      <p className="text-muted-foreground">
                        Мы можем использовать сторонние сервисы аналитики, которые устанавливают свои cookies. 
                        Эти сервисы имеют собственные политики конфиденциальности.
                      </p>
                    </section>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Legal;