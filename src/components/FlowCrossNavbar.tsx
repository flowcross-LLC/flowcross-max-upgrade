import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Menu, X, Download, LogIn, User, Settings, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FeaturesBlock from "@/components/FeaturesBlock";
import PhoneVerification from "@/components/PhoneVerification";

const FlowCrossNavbar = () => {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    // Проверяем сохраненные данные
    const savedUser = localStorage.getItem("flowcross_user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setIsLoggedIn(true);
      setUsername(userData.username);
    }
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username && loginData.password) {
      const userData = { username: loginData.username, loginTime: Date.now() };
      localStorage.setItem("flowcross_user", JSON.stringify(userData));
      setIsLoggedIn(true);
      setUsername(loginData.username);
      setIsLoginOpen(false);
      toast({ title: "Успешный вход!", description: `Добро пожаловать, ${loginData.username}!` });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("flowcross_user");
    setIsLoggedIn(false);
    setUsername("");
    toast({ title: "Выход выполнен", description: "До свидания!" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-effect backdrop-blur-xl shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold">
              <span className="neon-text">FlowCross</span>
              <span className="text-muted-foreground ml-1">LLC</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors duration-200">Features</a>
            <a href="#servers" className="text-foreground hover:text-primary transition-colors duration-200">Servers</a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors duration-200">Community</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors duration-200">Pricing</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 glass-effect" />
            </div>
            <Button variant="glow" size="sm"><Download className="w-4 h-4 mr-2" />Download</Button>
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={() => window.location.href = "/account"}>
                  <Settings className="w-4 h-4 mr-2" />Аккаунт
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />Выйти
                </Button>
              </div>
            ) : (
              <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm"><LogIn className="w-4 h-4 mr-2" />Log In</Button>
                </DialogTrigger>
                <DialogContent className="glass-effect max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>Добро пожаловать в FlowCross</DialogTitle>
                  </DialogHeader>
                  <div className="flex gap-6">
                    {/* Features Block */}
                    <div className="flex-1">
                      <FeaturesBlock />
                    </div>
                    
                    {/* Login Form with Phone Verification */}
                    <div className="flex-1 space-y-6">
                      <div className="glass-effect rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4 text-center">Вход в аккаунт</h3>
                        <form onSubmit={handleLogin} className="space-y-4">
                          <div>
                            <Label htmlFor="username">Имя пользователя</Label>
                            <Input 
                              id="username" 
                              value={loginData.username} 
                              onChange={(e) => setLoginData({...loginData, username: e.target.value})} 
                              placeholder="Введите имя пользователя" 
                            />
                          </div>
                          <div>
                            <Label htmlFor="password">Пароль</Label>
                            <Input 
                              id="password" 
                              type="password" 
                              value={loginData.password} 
                              onChange={(e) => setLoginData({...loginData, password: e.target.value})} 
                              placeholder="Введите пароль" 
                            />
                          </div>
                          <Button type="submit" variant="default" className="w-full">Войти</Button>
                          <div className="text-center text-sm text-muted-foreground">
                            Нет аккаунта? Используйте кнопку "Регистрация" слева
                          </div>
                        </form>
                      </div>
                      
                      {/* Phone Verification */}
                      <PhoneVerification 
                        onVerificationComplete={(phone) => {
                          toast({
                            title: "Телефон подтвержден!",
                            description: `Номер ${phone} успешно верифицирован`
                          });
                        }}
                      />
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border glass-effect">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#features" className="text-foreground hover:text-primary">Features</a>
              <a href="#servers" className="text-foreground hover:text-primary">Servers</a>
              <a href="#community" className="text-foreground hover:text-primary">Community</a>
              <a href="#pricing" className="text-foreground hover:text-primary">Pricing</a>
              <div className="flex space-x-2 pt-4">
                <Button variant="glow" size="sm" className="flex-1">Download</Button>
                {!isLoggedIn && <Button variant="outline" size="sm" className="flex-1" onClick={() => setIsLoginOpen(true)}>Log In</Button>}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default FlowCrossNavbar;