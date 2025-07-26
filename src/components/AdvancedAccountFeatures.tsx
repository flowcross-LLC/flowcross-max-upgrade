import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Palette, 
  Upload, 
  Phone, 
  Shield, 
  IdCard, 
  Check, 
  X,
  Camera,
  Image as ImageIcon
} from "lucide-react";

interface AdvancedAccountFeaturesProps {
  userData: any;
  onUpdate: (updates: any) => void;
}

const AdvancedAccountFeatures = ({ userData, onUpdate }: AdvancedAccountFeaturesProps) => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [flowId, setFlowId] = useState("");
  const [flowSecurity, setFlowSecurity] = useState("");
  const [verificationStatus, setVerificationStatus] = useState({
    phone: userData?.verification?.phone || false,
    flowId: userData?.verification?.flowId || false,
    flowSecurity: userData?.verification?.flowSecurity || false
  });

  const backgrounds = [
    { 
      name: "Dark Matrix", 
      value: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
      preview: "from-gray-900 via-blue-900 to-blue-800"
    },
    { 
      name: "Cyber Neon", 
      value: "linear-gradient(135deg, #000000 0%, #1a0033 50%, #330066 100%)",
      preview: "from-black via-purple-900 to-purple-700"
    },
    { 
      name: "Gaming Green", 
      value: "linear-gradient(135deg, #0a0a0a 0%, #001a00 50%, #003300 100%)",
      preview: "from-gray-900 via-green-900 to-green-800"
    },
    { 
      name: "Pure Black", 
      value: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2a2a2a 100%)",
      preview: "from-black via-gray-800 to-gray-700"
    }
  ];

  const handleBackgroundChange = (background: string) => {
    document.body.style.background = background;
    onUpdate({ 
      ...userData, 
      preferences: { 
        ...userData.preferences, 
        background 
      } 
    });
    toast({
      title: "Фон изменен",
      description: "Новый фон применен к странице"
    });
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatar = e.target?.result as string;
        onUpdate({ 
          ...userData, 
          avatar: newAvatar 
        });
        toast({
          title: "Аватар обновлен",
          description: "Новая фотография профиля сохранена"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhoneVerification = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Ошибка",
        description: "Введите корректный номер телефона",
        variant: "destructive"
      });
      return;
    }

    // Имитация процесса верификации
    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, phone: true }));
      onUpdate({ 
        ...userData, 
        verification: { 
          ...userData.verification, 
          phone: true,
          phoneNumber 
        } 
      });
      toast({
        title: "Телефон подтвержден",
        description: `Номер ${phoneNumber} успешно верифицирован`
      });
    }, 2000);
  };

  const handleFlowIdVerification = () => {
    if (!flowId || flowId.length < 6) {
      toast({
        title: "Ошибка",
        description: "FlowID должен содержать минимум 6 символов",
        variant: "destructive"
      });
      return;
    }

    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, flowId: true }));
      onUpdate({ 
        ...userData, 
        verification: { 
          ...userData.verification, 
          flowId: true,
          flowIdValue: flowId 
        } 
      });
      toast({
        title: "FlowID подтвержден",
        description: `FlowID ${flowId} успешно верифицирован`
      });
    }, 1500);
  };

  const handleFlowSecurityVerification = () => {
    if (!flowSecurity || flowSecurity.length < 8) {
      toast({
        title: "Ошибка",
        description: "FlowSecurity должен содержать минимум 8 символов",
        variant: "destructive"
      });
      return;
    }

    setTimeout(() => {
      setVerificationStatus(prev => ({ ...prev, flowSecurity: true }));
      onUpdate({ 
        ...userData, 
        verification: { 
          ...userData.verification, 
          flowSecurity: true 
        } 
      });
      toast({
        title: "FlowSecurity подтвержден",
        description: "Система безопасности активирована"
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Background Selection */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Palette className="w-5 h-5" />
            <span>Персонализация фона</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {backgrounds.map((bg, index) => (
              <div
                key={index}
                className={`relative rounded-lg p-4 cursor-pointer transition-all duration-300 hover:scale-105 bg-gradient-to-br ${bg.preview} h-20`}
                onClick={() => handleBackgroundChange(bg.value)}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">{bg.name}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Avatar Upload */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Загрузка аватара</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={userData?.avatar || "/placeholder.svg"}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Upload className="w-6 h-6 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Нажмите на аватар чтобы загрузить новое изображение
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Рекомендуемый размер: 200x200px, формат: JPG, PNG
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Systems */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Системы верификации</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phone Verification */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card/50">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5" />
              <div>
                <p className="font-medium">Верификация по телефону</p>
                <p className="text-sm text-muted-foreground">Подтвердите ваш номер телефона</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {verificationStatus.phone ? (
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500">Подтверждено</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="+7 (999) 123-45-67"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-40"
                  />
                  <Button size="sm" onClick={handlePhoneVerification}>
                    Подтвердить
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* FlowID Verification */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card/50">
            <div className="flex items-center space-x-3">
              <IdCard className="w-5 h-5" />
              <div>
                <p className="font-medium">FlowID верификация</p>
                <p className="text-sm text-muted-foreground">Уникальный идентификатор FlowCross</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {verificationStatus.flowId ? (
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500">Активен</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="FLOW-123456"
                    value={flowId}
                    onChange={(e) => setFlowId(e.target.value)}
                    className="w-32"
                  />
                  <Button size="sm" onClick={handleFlowIdVerification}>
                    Привязать
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* FlowSecurity Verification */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-card/50">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5" />
              <div>
                <p className="font-medium">FlowSecurity</p>
                <p className="text-sm text-muted-foreground">Расширенная система безопасности</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {verificationStatus.flowSecurity ? (
                <div className="flex items-center space-x-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-500">Защищено</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Input
                    type="password"
                    placeholder="Security Key"
                    value={flowSecurity}
                    onChange={(e) => setFlowSecurity(e.target.value)}
                    className="w-32"
                  />
                  <Button size="sm" onClick={handleFlowSecurityVerification}>
                    Активировать
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAccountFeatures;