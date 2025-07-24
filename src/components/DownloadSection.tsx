import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Monitor, Smartphone, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DownloadSection = () => {
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState("stable");

  const downloadOptions = [
    {
      id: "windows",
      name: "Windows",
      icon: Monitor,
      available: true,
      downloadUrl: "https://www.dropbox.com/scl/fi/qqp5f1k722m5p9nrds0bh/Flow-installer.exe?rlkey=kfrhdb7ho2yf2155thyrjll6g&st=ch4nt4oq&dl=1",
      description: "Windows 10/11 (64-bit)"
    },
    {
      id: "macos",
      name: "macOS",
      icon: Smartphone,
      available: false,
      downloadUrl: "",
      description: "Coming soon"
    },
    {
      id: "linux",
      name: "Linux",
      icon: Gamepad2,
      available: false,
      downloadUrl: "",
      description: "Coming soon"
    }
  ];

  const channels = [
    { id: "stable", name: "Stable", description: "Стабильная версия для всех" },
    { id: "beta", name: "Beta", description: "Новые функции с минимальными багами" },
    { id: "dev", name: "Dev", description: "Последние обновления (может быть нестабильно)" }
  ];

  const handleDownload = (option: typeof downloadOptions[0]) => {
    if (!option.available) {
      toast({
        title: "Недоступно",
        description: `${option.name} версия скоро будет доступна!`,
        variant: "destructive"
      });
      return;
    }

    // Открываем загрузку в новой вкладке
    window.open(option.downloadUrl, '_blank');
    toast({
      title: "Загрузка началась",
      description: `Скачиваем FlowCross для ${option.name} (${selectedChannel} канал)`
    });
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="neon-text">Скачать FlowCross</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Выберите версию для вашей операционной системы и канал обновлений
          </p>
          
          {/* Channel Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {channels.map((channel) => (
              <Button
                key={channel.id}
                variant={selectedChannel === channel.id ? "default" : "outline"}
                onClick={() => setSelectedChannel(channel.id)}
                className="flex flex-col h-auto p-4 min-w-[140px]"
              >
                <span className="font-semibold">{channel.name}</span>
                <span className="text-xs mt-1 opacity-70">{channel.description}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Download Options */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {downloadOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div 
                key={option.id}
                className={`glass-effect rounded-xl p-6 text-center border transition-all duration-300 ${
                  option.available 
                    ? 'border-border hover:border-primary/50 hover:bg-card/50' 
                    : 'border-muted opacity-60'
                }`}
              >
                <div className="mb-4">
                  <IconComponent className={`w-16 h-16 mx-auto ${
                    option.available ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{option.name}</h3>
                <p className="text-muted-foreground mb-6">{option.description}</p>
                
                <Button
                  onClick={() => handleDownload(option)}
                  disabled={!option.available}
                  variant={option.available ? "default" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {option.available ? "Скачать" : "Скоро"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* System Requirements */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Системные требования</h3>
          <div className="glass-effect rounded-xl p-6 max-w-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold mb-2">Минимальные:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Windows 10 64-bit</li>
                  <li>• 4 GB RAM</li>
                  <li>• 2 GB свободного места</li>
                  <li>• DirectX 11</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Рекомендуемые:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Windows 11 64-bit</li>
                  <li>• 8 GB RAM</li>
                  <li>• 4 GB свободного места</li>
                  <li>• DirectX 12</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;