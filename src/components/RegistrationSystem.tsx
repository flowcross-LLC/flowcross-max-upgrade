import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Mail, Lock, User } from "lucide-react";

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationSystemProps {
  onRegistrationComplete: (userData: { username: string; email: string }) => void;
}

const RegistrationSystem = ({ onRegistrationComplete }: RegistrationSystemProps) => {
  const { toast } = useToast();
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!registrationData.username || !registrationData.email || !registrationData.password) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, заполните все поля",
        variant: "destructive"
      });
      return;
    }

    if (registrationData.password !== registrationData.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive"
      });
      return;
    }

    if (registrationData.password.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен содержать минимум 6 символов",
        variant: "destructive"
      });
      return;
    }

    // Сохраняем зарегистрированного пользователя
    const registeredUsers = JSON.parse(localStorage.getItem("flowcross_registered_users") || "[]");
    
    // Проверяем, не существует ли уже такой пользователь
    const existingUser = registeredUsers.find((user: any) => 
      user.username === registrationData.username || user.email === registrationData.email
    );

    if (existingUser) {
      toast({
        title: "Ошибка",
        description: "Пользователь с таким именем или email уже существует",
        variant: "destructive"
      });
      return;
    }

    const newUser = {
      username: registrationData.username,
      email: registrationData.email,
      password: registrationData.password, // В реальном приложении пароль должен быть захеширован
      registrationTime: Date.now()
    };

    registeredUsers.push(newUser);
    localStorage.setItem("flowcross_registered_users", JSON.stringify(registeredUsers));

    toast({
      title: "Регистрация успешна!",
      description: `Добро пожаловать, ${registrationData.username}!`
    });

    onRegistrationComplete({
      username: registrationData.username,
      email: registrationData.email
    });

    // Очищаем форму
    setRegistrationData({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Регистрация аккаунта</h3>
        <p className="text-muted-foreground text-sm mt-2">
          Создайте аккаунт для доступа к FlowCross
        </p>
      </div>

      <form onSubmit={handleRegistration} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="reg-username" className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Имя пользователя</span>
          </Label>
          <Input
            id="reg-username"
            value={registrationData.username}
            onChange={(e) => setRegistrationData({...registrationData, username: e.target.value})}
            placeholder="Введите имя пользователя"
            className="glass-effect"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-email" className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </Label>
          <Input
            id="reg-email"
            type="email"
            value={registrationData.email}
            onChange={(e) => setRegistrationData({...registrationData, email: e.target.value})}
            placeholder="Введите email"
            className="glass-effect"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-password" className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Пароль</span>
          </Label>
          <Input
            id="reg-password"
            type="password"
            value={registrationData.password}
            onChange={(e) => setRegistrationData({...registrationData, password: e.target.value})}
            placeholder="Введите пароль"
            className="glass-effect"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reg-confirm-password" className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Подтвердите пароль</span>
          </Label>
          <Input
            id="reg-confirm-password"
            type="password"
            value={registrationData.confirmPassword}
            onChange={(e) => setRegistrationData({...registrationData, confirmPassword: e.target.value})}
            placeholder="Подтвердите пароль"
            className="glass-effect"
          />
        </div>

        <Button type="submit" variant="default" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <UserPlus className="w-4 h-4 mr-2" />
          Зарегистрироваться
        </Button>
      </form>
    </div>
  );
};

export default RegistrationSystem;