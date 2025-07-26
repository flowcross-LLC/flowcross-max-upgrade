import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PhoneVerificationProps {
  onVerificationComplete: (phoneNumber: string) => void;
}

const PhoneVerification = ({ onVerificationComplete }: PhoneVerificationProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'phone' | 'code' | 'verified'>('phone');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Ошибка",
        description: "Введите корректный номер телефона",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Имитация отправки SMS
    setTimeout(() => {
      setIsLoading(false);
      setStep('code');
      toast({
        title: "Код отправлен!",
        description: "SMS с кодом подтверждения отправлен на ваш номер"
      });
    }, 1500);
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast({
        title: "Ошибка",
        description: "Введите 6-значный код подтверждения",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Имитация проверки кода
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode === "123456") {
        setStep('verified');
        onVerificationComplete(phoneNumber);
        toast({
          title: "Успешно!",
          description: "Номер телефона подтвержден"
        });
      } else {
        toast({
          title: "Неверный код",
          description: "Попробуйте еще раз или запросите новый код",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  const formatPhoneNumber = (value: string) => {
    // Удаляем все нецифровые символы
    const cleaned = value.replace(/\D/g, '');
    
    // Форматируем номер
    if (cleaned.length >= 10) {
      return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
    }
    return cleaned;
  };

  if (step === 'verified') {
    return (
      <Card className="glass-effect max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Номер подтвержден!</h3>
          <p className="text-muted-foreground">Ваш номер телефона успешно верифицирован</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-primary" />
          Верификация телефона
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 'phone' ? (
          <>
            <div>
              <Label htmlFor="phone">Номер телефона</Label>
              <Input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                placeholder="+373 (xxx) xxx-xx-xx"
                maxLength={20}
              />
            </div>
            <Button 
              onClick={handleSendCode} 
              disabled={isLoading || !phoneNumber}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                'Отправить код'
              )}
            </Button>
          </>
        ) : (
          <>
            <div>
              <Label htmlFor="code">Код подтверждения</Label>
              <Input
                id="code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Код отправлен на {phoneNumber}
              </p>
            </div>
            <Button 
              onClick={handleVerifyCode} 
              disabled={isLoading || verificationCode.length !== 6}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Проверка...
                </>
              ) : (
                'Подтвердить код'
              )}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setStep('phone')}
              className="w-full"
            >
              Изменить номер
            </Button>
          </>
        )}
        
        <div className="text-xs text-muted-foreground text-center">
          Для тестирования используйте код: <strong>123456</strong>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;