import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Mail, Crown, Rocket, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionHandlerProps {
  planName: string;
  planPrice: string;
  planFeatures: string[];
  buttonText: string;
  variant: "glow" | "premium" | "outline";
}

const SubscriptionHandler = ({ planName, planPrice, planFeatures, buttonText, variant }: SubscriptionHandlerProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "invoice" | null>(null);

  const isLoggedIn = () => {
    return localStorage.getItem("flowcross_user") !== null;
  };

  const getUserData = () => {
    const stored = localStorage.getItem("flowcross_user");
    return stored ? JSON.parse(stored) : null;
  };

  const handleSubscribe = () => {
    if (!isLoggedIn()) {
      toast({
        title: "Требуется авторизация",
        description: "Пожалуйста, войдите в систему для оформления подписки",
        variant: "destructive"
      });
      return;
    }
    setIsOpen(true);
  };

  const handlePaymentMethodSelect = (method: "card" | "invoice") => {
    setPaymentMethod(method);
    const userData = getUserData();
    
    if (method === "card") {
      // Симуляция перенаправления на платежную страницу
      toast({
        title: "Перенаправление на оплату",
        description: "Открывается страница оплаты картой..."
      });
      
      // Симуляция успешной оплаты
      setTimeout(() => {
        toast({
          title: "Платеж успешен! 🎉",
          description: `Добро пожаловать в ${planName}! Подписка активирована.`
        });
        setIsOpen(false);
        setPaymentMethod(null);
      }, 2000);
      
    } else if (method === "invoice") {
      // Симуляция отправки счета на email
      const email = userData?.email || "user@example.com";
      toast({
        title: "Счет отправлен! 📧",
        description: `Счет на оплату отправлен на ${email}`
      });
      setIsOpen(false);
      setPaymentMethod(null);
    }
  };

  const getPlanIcon = () => {
    if (planName.includes("Flow+")) return Crown;
    if (planName.includes("v4")) return Rocket;
    return CreditCard;
  };

  const PlanIcon = getPlanIcon();

  return (
    <>
      <Button
        variant={variant}
        size="lg"
        className="w-full"
        onClick={handleSubscribe}
      >
        {buttonText}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-effect max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <PlanIcon className="w-6 h-6 text-primary" />
              Оформление подписки {planName}
            </DialogTitle>
          </DialogHeader>

          {!isLoggedIn() ? (
            <Card className="border-destructive/50">
              <CardContent className="text-center p-6">
                <LogIn className="w-12 h-12 mx-auto mb-4 text-destructive" />
                <h3 className="text-lg font-semibold mb-2">Необходима авторизация</h3>
                <p className="text-muted-foreground mb-4">
                  Для оформления подписки необходимо войти в систему
                </p>
                <Button onClick={() => setIsOpen(false)}>
                  Войти в систему
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Plan Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{planName}</span>
                    <Badge variant="secondary">{planPrice}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {planFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Выберите способ оплаты:</h3>
                
                <div className="grid gap-4">
                  <Card 
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handlePaymentMethodSelect("card")}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <CreditCard className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">Оплата картой</h4>
                        <p className="text-sm text-muted-foreground">
                          Мгновенная активация подписки
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handlePaymentMethodSelect("invoice")}
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <Mail className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">Счет на email</h4>
                        <p className="text-sm text-muted-foreground">
                          Получить счет для оплаты по реквизитам
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* User Info */}
              <Card className="bg-muted/20">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Пользователь: <span className="font-medium text-foreground">
                      {getUserData()?.username}
                    </span>
                  </p>
                  {getUserData()?.email && (
                    <p className="text-sm text-muted-foreground">
                      Email: <span className="font-medium text-foreground">
                        {getUserData()?.email}
                      </span>
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionHandler;