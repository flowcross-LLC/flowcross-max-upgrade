import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Zap, Shield, Globe, Gamepad2, Users, Star, UserPlus, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeaturesBlock = () => {
  const { toast } = useToast();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "", confirmPassword: "" });

  const features = [
    { icon: Zap, title: "Молниеносная скорость", description: "Оптимизированная производительность" },
    { icon: Shield, title: "Максимальная защита", description: "Продвинутая система безопасности" },
    { icon: Globe, title: "Глобальные серверы", description: "Серверы по всему миру" },
    { icon: Gamepad2, title: "Игровые режимы", description: "Множество режимов для игры" },
    { icon: Users, title: "Сообщество", description: "Активное игровое сообщество" },
    { icon: Star, title: "Премиум функции", description: "Эксклюзивные возможности" }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      const userData = { username: loginData.username, loginTime: Date.now() };
      localStorage.setItem("flowcross_user", JSON.stringify(userData));
      setIsLoginOpen(false);
      toast({ 
        title: "Успешный вход!", 
        description: `Добро пожаловать, ${loginData.username}!` 
      });
      // Перезагрузка страницы для обновления состояния
      window.location.reload();
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerData.username && registerData.email && registerData.password) {
      if (registerData.password !== registerData.confirmPassword) {
        toast({
          title: "Ошибка",
          description: "Пароли не совпадают",
          variant: "destructive"
        });
        return;
      }
      
      const userData = { username: registerData.username, email: registerData.email, loginTime: Date.now() };
      localStorage.setItem("flowcross_user", JSON.stringify(userData));
      setIsRegisterOpen(false);
      toast({ 
        title: "Регистрация успешна!", 
        description: `Добро пожаловать в FlowCross, ${registerData.username}!` 
      });
      // Перезагрузка страницы для обновления состояния
      window.location.reload();
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6 max-w-md">
      {/* Logo Section */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-primary-foreground">FC</span>
        </div>
        <h3 className="text-xl font-bold neon-text">FlowCross Features</h3>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={index}
              className="bg-card/50 rounded-lg p-3 text-center hover:bg-card/70 transition-colors duration-200"
            >
              <IconComponent className="w-6 h-6 mx-auto mb-2 text-primary" />
              <h4 className="text-xs font-semibold mb-1">{feature.title}</h4>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Auth Buttons */}
      <div className="space-y-3">
        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              Войти
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect">
            <DialogHeader>
              <DialogTitle>Вход в FlowCross</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-username">Имя пользователя</Label>
                <Input 
                  id="login-username" 
                  value={loginData.username} 
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})} 
                  placeholder="Введите имя пользователя" 
                />
              </div>
              <div>
                <Label htmlFor="login-password">Пароль</Label>
                <Input 
                  id="login-password" 
                  type="password" 
                  value={loginData.password} 
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                  placeholder="Введите пароль" 
                />
              </div>
              <Button type="submit" variant="default" className="w-full">Войти</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <UserPlus className="w-4 h-4 mr-2" />
              Регистрация
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-effect">
            <DialogHeader>
              <DialogTitle>Регистрация в FlowCross</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="reg-username">Имя пользователя</Label>
                <Input 
                  id="reg-username" 
                  value={registerData.username} 
                  onChange={(e) => setRegisterData({...registerData, username: e.target.value})} 
                  placeholder="Выберите имя пользователя" 
                />
              </div>
              <div>
                <Label htmlFor="reg-email">Электронная почта</Label>
                <Input 
                  id="reg-email" 
                  type="email" 
                  value={registerData.email} 
                  onChange={(e) => setRegisterData({...registerData, email: e.target.value})} 
                  placeholder="Введите email" 
                />
              </div>
              <div>
                <Label htmlFor="reg-password">Пароль</Label>
                <Input 
                  id="reg-password" 
                  type="password" 
                  value={registerData.password} 
                  onChange={(e) => setRegisterData({...registerData, password: e.target.value})} 
                  placeholder="Создайте пароль" 
                />
              </div>
              <div>
                <Label htmlFor="reg-confirm">Подтвердите пароль</Label>
                <Input 
                  id="reg-confirm" 
                  type="password" 
                  value={registerData.confirmPassword} 
                  onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})} 
                  placeholder="Повторите пароль" 
                />
              </div>
              <Button type="submit" variant="default" className="w-full">Зарегистрироваться</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FeaturesBlock;