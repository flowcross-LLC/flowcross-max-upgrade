import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Monitor, Smartphone, Gamepad2, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DownloadSectionMinimal = () => {
  const { toast } = useToast();
  const [selectedChannel, setSelectedChannel] = useState("stable");

  const downloadOptions = [
    {
      id: "windows",
      name: "Windows",
      icon: Monitor,
      available: true,
      downloadUrl: "https://www.dropbox.com/scl/fi/qqp5f1k722m5p9nrds0bh/Flow-installer.exe?rlkey=kfrhdb7ho2yf2155thyrjll6g&st=ch4nt4oq&dl=1",
      description: "10/11 (64-bit)",
      size: "45 MB"
    },
    {
      id: "macos",
      name: "macOS",
      icon: Smartphone,
      available: false,
      downloadUrl: "",
      description: "Intel/M1",
      size: "52 MB"
    },
    {
      id: "linux",
      name: "Linux",
      icon: Gamepad2,
      available: false,
      downloadUrl: "",
      description: "Ubuntu/Debian",
      size: "38 MB"
    }
  ];

  const channels = [
    { id: "stable", name: "Stable", version: "v2.9.3" },
    { id: "beta", name: "Beta", version: "v3.0-beta" },
    { id: "dev", name: "Dev", version: "v3.1-dev" }
  ];

  const handleDownload = (option: typeof downloadOptions[0]) => {
    if (!option.available) {
      toast({
        title: "Скоро",
        description: `${option.name} версия в разработке`,
        variant: "destructive"
      });
      return;
    }

    window.open(option.downloadUrl, '_blank');
    toast({
      title: "Загрузка началась",
      description: `FlowCross ${channels.find(c => c.id === selectedChannel)?.version} для ${option.name}`
    });
  };

  return (
    <section id="download" className="py-20 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-5xl">
        {/* Minimal Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Скачать <span className="neon-text">FlowCross</span>
          </h2>
          <p className="text-muted-foreground">
            Выберите версию для вашей ОС
          </p>
        </div>

        {/* Channel Pills */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-muted/20 p-1 rounded-lg">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedChannel === channel.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {channel.name}
                <span className="ml-1 text-xs opacity-70">{channel.version}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Download Cards Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {downloadOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <div 
                key={option.id}
                className={`group relative overflow-hidden rounded-xl border transition-all duration-300 ${
                  option.available 
                    ? 'border-border hover:border-primary/50 bg-card/50 hover:bg-card/80 cursor-pointer' 
                    : 'border-muted/50 bg-muted/10 opacity-60'
                }`}
                onClick={() => option.available && handleDownload(option)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        option.available ? 'bg-primary/10' : 'bg-muted/20'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${
                          option.available ? 'text-primary' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold">{option.name}</h3>
                        <p className="text-xs text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
                    
                    {option.available ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{option.size}</span>
                    <div className={`flex items-center space-x-1 text-xs ${
                      option.available ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      <span>{option.available ? 'Скачать' : 'Скоро'}</span>
                      {option.available && (
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                {option.available && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Install Command */}
        <div className="glass-effect rounded-xl p-6 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Быстрая установка</h3>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Прямая ссылка
            </Button>
          </div>
          <div className="bg-muted/20 rounded-lg p-3 font-mono text-sm text-muted-foreground">
            curl -L https://flowcross.net/install | sh
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Требования: Windows 10+ • 4GB RAM • 2GB свободного места
          </p>
        </div>
      </div>
    </section>
  );
};

export default DownloadSectionMinimal;