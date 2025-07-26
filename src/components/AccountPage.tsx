import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, Check, Upload, LogOut, Edit2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  username: string;
  email?: string;
  loginTime: number;
  avatar?: string;
  verified?: boolean;
}

const AccountPage = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ username: "", email: "" });

  useEffect(() => {
    const stored = localStorage.getItem("flowcross_user");
    if (stored) {
      const data = JSON.parse(stored);
      setUserData(data);
      setEditData({ username: data.username, email: data.email || "" });
    }
  }, []);

  const handleAvatarChange = () => {
    // Создаем белый треугольник как аватар
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Прозрачный фон
      ctx.clearRect(0, 0, 100, 100);
      
      // Рисуем белый треугольник
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(50, 20); // верхняя точка
      ctx.lineTo(20, 80); // левая нижняя точка
      ctx.lineTo(80, 80); // правая нижняя точка
      ctx.closePath();
      ctx.fill();
      
      const avatarUrl = canvas.toDataURL();
      
      if (userData) {
        const updatedData = { ...userData, avatar: avatarUrl };
        setUserData(updatedData);
        localStorage.setItem("flowcross_user", JSON.stringify(updatedData));
        
        toast({
          title: "Аватар обновлен!",
          description: "Ваш новый аватар сохранен"
        });
      }
    }
  };

  const handleSaveProfile = () => {
    if (userData && editData.username) {
      const updatedData = { ...userData, username: editData.username, email: editData.email };
      setUserData(updatedData);
      localStorage.setItem("flowcross_user", JSON.stringify(updatedData));
      setIsEditing(false);
      
      toast({
        title: "Профиль обновлен!",
        description: "Ваши данные успешно сохранены"
      });
    }
  };

  const handleVerifyAccount = () => {
    if (userData) {
      const updatedData = { ...userData, verified: true };
      setUserData(updatedData);
      localStorage.setItem("flowcross_user", JSON.stringify(updatedData));
      
      toast({
        title: "Аккаунт подтвержден!",
        description: "Ваш аккаунт теперь верифицирован"
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("flowcross_user");
    toast({
      title: "Выход выполнен",
      description: "До свидания!"
    });
    window.location.reload();
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="glass-effect p-8">
          <CardContent className="text-center">
            <h2 className="text-2xl font-bold mb-4">Аккаунт не найден</h2>
            <p className="text-muted-foreground mb-6">Пожалуйста, войдите в систему</p>
            <Button onClick={() => window.location.href = "/"}>
              Вернуться на главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = "/"}
            className="mb-4"
          >
            ← Вернуться на главную
          </Button>
          <h1 className="text-3xl font-bold neon-text">Мой аккаунт</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="glass-effect">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Профиль
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
                {userData.verified && (
                  <Check className="w-5 h-5 text-green-400" />
                )}
              </div>
              
              {userData.email && (
                <p className="text-muted-foreground text-sm mb-4">{userData.email}</p>
              )}
              
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Badge variant="secondary">Flow Basic</Badge>
                {userData.verified ? (
                  <Badge variant="default">Подтвержден</Badge>
                ) : (
                  <Badge variant="outline">Не подтвержден</Badge>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Редактировать профиль
              </Button>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="glass-effect md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Настройки аккаунта
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
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
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile}>
                      Сохранить
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Отмена
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Имя пользователя</p>
                        <p className="text-sm text-muted-foreground">{userData.username}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Электронная почта</p>
                        <p className="text-sm text-muted-foreground">
                          {userData.email || "Не указана"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Статус верификации</p>
                        <p className="text-sm text-muted-foreground">
                          {userData.verified ? "Аккаунт подтвержден" : "Требуется подтверждение"}
                        </p>
                      </div>
                    </div>
                    {!userData.verified && (
                      <Button variant="outline" size="sm" onClick={handleVerifyAccount}>
                        Подтвердить
                      </Button>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-border">
                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти из аккаунта
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;