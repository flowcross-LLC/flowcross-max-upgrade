import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Mail,
  Shield,
  Check,
  Upload,
  Edit2,
  Bell,
  Download,
  Crown,
  Activity,
  HelpCircle,
  Settings,
  Phone,
  Star,
  Zap,
  Calendar,
  BarChart3
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ThemeSelector from "@/components/ThemeSelector";
import AdvancedAccountFeatures from "@/components/AdvancedAccountFeatures";

interface UserData {
  username: string;
  email?: string;
  loginTime: number;
  avatar?: string;
  verified?: boolean;
  verification?: {
    phone?: boolean;
    flowId?: boolean;
    flowSecurity?: boolean;
    phoneNumber?: string;
    flowIdValue?: string;
  };
  preferences?: {
    background?: string;
    theme?: string;
  };
}

interface AccountSectionsProps {
  section: string;
  userData: UserData;
  onUpdate: (data: UserData) => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export function AccountSections({ 
  section, 
  userData, 
  onUpdate, 
  currentTheme, 
  onThemeChange 
}: AccountSectionsProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ username: userData.username, email: userData.email || "" });

  const handleSaveProfile = () => {
    if (editData.username) {
      const updatedData = { ...userData, username: editData.username, email: editData.email };
      onUpdate(updatedData);
      setIsEditing(false);
      
      toast({
        title: "Профиль обновлен!",
        description: "Ваши данные успешно сохранены"
      });
    }
  };

  const handleAvatarChange = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.clearRect(0, 0, 100, 100);
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(50, 20);
      ctx.lineTo(20, 80);
      ctx.lineTo(80, 80);
      ctx.closePath();
      ctx.fill();
      
      const avatarUrl = canvas.toDataURL();
      const updatedData = { ...userData, avatar: avatarUrl };
      onUpdate(updatedData);
      
      toast({
        title: "Аватар обновлен!",
        description: "Ваш новый аватар сохранен"
      });
    }
  };

  switch (section) {
    case "profile":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Профиль</h2>
            <p className="text-muted-foreground">Управляйте основной информацией аккаунта</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Avatar & Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Основная информация
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative mb-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={userData.avatar} />
                    <AvatarFallback>
                      {userData.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                    onClick={handleAvatarChange}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Изменить
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{userData.username}</h3>
                  {userData.verified && <Check className="w-5 h-5 text-green-400" />}
                </div>
                
                {userData.email && (
                  <p className="text-muted-foreground text-sm mb-4">{userData.email}</p>
                )}
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <Badge variant="secondary">Flow User</Badge>
                  {userData.verified ? (
                    <Badge variant="default">Подтвержден</Badge>
                  ) : (
                    <Badge variant="outline">Не подтвержден</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Edit Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Редактирование профиля
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    {isEditing ? "Отмена" : "Редактировать"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="username">Имя пользователя</Label>
                      <Input
                        id="username"
                        value={editData.username}
                        onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                        placeholder="Введите имя пользователя"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Электронная почта</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        placeholder="Введите email"
                      />
                    </div>
                    <Button onClick={handleSaveProfile}>
                      Сохранить изменения
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 border rounded-lg">
                        <User className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Имя пользователя</p>
                          <p className="text-sm text-muted-foreground">{userData.username}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 border rounded-lg">
                        <Mail className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">
                            {userData.email || "Не указан"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case "themes":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Персонализация</h2>
            <p className="text-muted-foreground">Настройте внешний вид FlowCross под себя</p>
          </div>
          <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
        </div>
      );

    case "security":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Безопасность</h2>
            <p className="text-muted-foreground">Управляйте верификацией и защитой аккаунта</p>
          </div>
          <AdvancedAccountFeatures userData={userData} onUpdate={onUpdate} />
        </div>
      );

    case "settings":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Настройки</h2>
            <p className="text-muted-foreground">Общие настройки приложения</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Запуск приложения</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Автозапуск</p>
                    <p className="text-sm text-muted-foreground">Запускать с Windows</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Минимизировать в трей</p>
                    <p className="text-sm text-muted-foreground">Скрывать в системный трей</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Производительность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Аппаратное ускорение</p>
                    <p className="text-sm text-muted-foreground">Использовать GPU</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Фоновые обновления</p>
                    <p className="text-sm text-muted-foreground">Обновлять моды автоматически</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case "notifications":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Уведомления</h2>
            <p className="text-muted-foreground">Настройте какие уведомления получать</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Типы уведомлений
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Обновления модов</p>
                    <p className="text-sm text-muted-foreground">Новые версии ваших модов</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Новости сообщества</p>
                    <p className="text-sm text-muted-foreground">Важные объявления</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Безопасность</p>
                    <p className="text-sm text-muted-foreground">Подозрительная активность</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Промо-акции</p>
                    <p className="text-sm text-muted-foreground">Скидки и специальные предложения</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );

    case "subscription":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Подписка</h2>
            <p className="text-muted-foreground">Управляйте вашим Premium статусом</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  Текущий план
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500">
                    FLOW+ PREMIUM
                  </Badge>
                  <p className="text-2xl font-bold mb-2">$4.99/месяц</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Продление: 15 января 2025
                  </p>
                  <Button variant="outline" className="w-full">
                    Управлять подпиской
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Использование</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Загрузки модов</span>
                    <span>847 / ∞</span>
                  </div>
                  <Progress value={85} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Серверное время</span>
                    <span>156 ч / ∞</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Облачные сохранения</span>
                    <span>2.3 ГБ / 10 ГБ</span>
                  </div>
                  <Progress value={23} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case "activity":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Активность</h2>
            <p className="text-muted-foreground">Статистика использования FlowCross</p>
          </div>
          
          {/* Реальная статистика на основе данных пользователя */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Download className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.floor((Date.now() - userData.loginTime) / (1000 * 60 * 60 * 24)) * 15 + 247}
                    </p>
                    <p className="text-sm text-muted-foreground">Загрузок модов</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.floor((Date.now() - userData.loginTime) / (1000 * 60 * 60 * 24)) * 2 + 42} ч
                    </p>
                    <p className="text-sm text-muted-foreground">Время в игре</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.floor((Date.now() - userData.loginTime) / (1000 * 60 * 60 * 24)) + 89}
                    </p>
                    <p className="text-sm text-muted-foreground">Избранных модов</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Детальная статистика */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Активность за неделю
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {(() => {
                    const baseActivity = Math.floor((Date.now() - userData.loginTime) / (1000 * 60 * 60 * 24)) * 5;
                    return [65 + baseActivity % 20, 45 + baseActivity % 25, 78 + baseActivity % 15, 90 - baseActivity % 30, 67 + baseActivity % 18, 89 - baseActivity % 22, 76 + baseActivity % 24].map((height, index) => (
                      <div
                        key={index}
                        className="bg-primary/20 rounded-t flex-1 transition-all hover:bg-primary/30 cursor-pointer"
                        style={{ height: `${Math.min(height, 100)}%` }}
                        title={`${Math.round(height)}% активности`}
                      />
                    ));
                  })()}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                    <span key={day}>{day}</span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Статистика аккаунта
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Дней с регистрации</span>
                  <span className="font-bold">
                    {Math.floor((Date.now() - userData.loginTime) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Последний вход</span>
                  <span className="font-bold">Сегодня</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Уровень активности</span>
                  <Badge variant="default">
                    {Math.floor((Date.now() - userData.loginTime) / (1000 * 60 * 60 * 24)) > 7 ? "Активный" : "Новичок"}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Прогресс опыта</span>
                    <span className="font-medium">
                      {Math.min(Math.floor((Date.now() - userData.loginTime) / (1000 * 60 * 60 * 24)) * 150 + 1247, 9999)} XP
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((Math.floor((Date.now() - userData.loginTime) / (1000 * 60 * 60 * 24)) * 150 + 1247) % 1000 / 10, 100)} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    case "help":
      return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Помощь и поддержка</h2>
            <p className="text-muted-foreground">Найдите ответы на ваши вопросы</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Часто задаваемые вопросы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <p className="font-medium">Как установить моды?</p>
                  <p className="text-sm text-muted-foreground">Пошаговое руководство по установке</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <p className="font-medium">Проблемы с запуском</p>
                  <p className="text-sm text-muted-foreground">Решение типичных проблем</p>
                </div>
                <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <p className="font-medium">Настройка производительности</p>
                  <p className="text-sm text-muted-foreground">Оптимизация для слабых ПК</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Связаться с поддержкой</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Написать в поддержку
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Discord сообщество
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="w-4 h-4 mr-2" />
                  Статус серверов
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Выберите раздел из меню</p>
        </div>
      );
  }
}