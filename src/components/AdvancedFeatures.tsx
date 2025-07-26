import { useState, useEffect, useRef } from "react";
import { Cpu, Wifi, Battery, Volume2, VolumeX, Vibrate, Share, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdvancedFeatures = () => {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
  const [isCharging, setIsCharging] = useState<boolean | null>(null);
  const [deviceMemory, setDeviceMemory] = useState<number | null>(null);
  const [connectionType, setConnectionType] = useState<string>('unknown');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [vibrationSupported, setVibrationSupported] = useState(false);
  const [copied, setCopied] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Network status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Battery API
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);
        
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
        
        battery.addEventListener('chargingchange', () => {
          setIsCharging(battery.charging);
        });
      }).catch(() => {
        // Battery API not supported
      });
    }

    // Device Memory
    if ('deviceMemory' in navigator) {
      setDeviceMemory((navigator as any).deviceMemory);
    }

    // Connection API
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      setConnectionType(connection.effectiveType || 'unknown');
      
      connection.addEventListener('change', () => {
        setConnectionType(connection.effectiveType || 'unknown');
      });
    }

    // Vibration API
    setVibrationSupported('vibrate' in navigator);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const playAudioEffect = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setAudioPlaying(false);
      } else {
        // Create a simple audio context for demo
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
        
        setAudioPlaying(true);
        setTimeout(() => setAudioPlaying(false), 500);
      }
    }
  };

  const triggerVibration = () => {
    if (vibrationSupported) {
      navigator.vibrate([100, 50, 100, 50, 200]);
      toast({
        title: "Вибрация активирована!",
        description: "Ваше устройство должно было завибрировать"
      });
    } else {
      toast({
        title: "Вибрация не поддерживается",
        description: "Ваше устройство не поддерживает Vibration API"
      });
    }
  };

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'FlowCross Launcher',
          text: 'Проверьте этот потрясающий Minecraft лаунчер!',
          url: window.location.href
        });
        toast({
          title: "Успешно поделились!",
          description: "Контент был отправлен через нативный диалог"
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      toast({
        title: "Web Share API не поддерживается",
        description: "Используйте кнопку копирования вместо этого"
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Скопировано!",
        description: "Ссылка скопирована в буфер обмена"
      });
    } catch (error) {
      toast({
        title: "Ошибка копирования",
        description: "Не удалось скопировать в буфер обмена"
      });
    }
  };

  const getConnectionIcon = () => {
    switch (connectionType) {
      case '4g': return '📶';
      case '3g': return '📶';
      case '2g': return '📶';
      case 'slow-2g': return '📶';
      default: return '🌐';
    }
  };

  return (
    <section className="py-20 relative overflow-hidden section-block mx-4 md:mx-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="neon-text text-primary">Продвинутые</span> возможности
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Демонстрация современных Web API и HTML5 возможностей.<br />
            <span className="text-primary font-medium">Эти функции доступны в лаунчере</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* System Info */}
          <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Cpu className="w-6 h-6 text-primary mr-3" />
              <h3 className="font-semibold">Информация о системе</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Память устройства:</span>
                <span>{deviceMemory ? `${deviceMemory} ГБ` : 'Неизвестно'}</span>
              </div>
              <div className="flex justify-between">
                <span>Ядра процессора:</span>
                <span>{navigator.hardwareConcurrency || 'Неизвестно'}</span>
              </div>
              <div className="flex justify-between">
                <span>Пользовательский агент:</span>
                <span className="truncate max-w-32" title={navigator.userAgent}>
                  {navigator.userAgent.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Network Status */}
          <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Wifi className={`w-6 h-6 mr-3 ${isOnline ? 'text-green-400' : 'text-red-400'}`} />
              <h3 className="font-semibold">Сетевой статус</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Статус:</span>
                <span className={isOnline ? 'text-green-400' : 'text-red-400'}>
                  {isOnline ? 'Онлайн' : 'Офлайн'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Тип соединения:</span>
                <span>{getConnectionIcon()} {connectionType.toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span>Язык:</span>
                <span>{navigator.language}</span>
              </div>
            </div>
          </div>

          {/* Battery Status */}
          <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Battery className="w-6 h-6 text-primary mr-3" />
              <h3 className="font-semibold">Батарея</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Уровень:</span>
                <span>{batteryLevel !== null ? `${batteryLevel}%` : 'Неизвестно'}</span>
              </div>
              <div className="flex justify-between">
                <span>Зарядка:</span>
                <span className={isCharging ? 'text-green-400' : 'text-yellow-400'}>
                  {isCharging === null ? 'Неизвестно' : isCharging ? 'Да' : 'Нет'}
                </span>
              </div>
              {batteryLevel !== null && (
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      batteryLevel > 50 ? 'bg-green-400' : 
                      batteryLevel > 20 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${batteryLevel}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Audio Controls */}
          <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              {audioPlaying ? (
                <Volume2 className="w-6 h-6 text-primary mr-3" />
              ) : (
                <VolumeX className="w-6 h-6 text-muted-foreground mr-3" />
              )}
              <h3 className="font-semibold">Аудио эффекты</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Web Audio API для создания звуковых эффектов
            </p>
            <Button
              variant={audioPlaying ? "destructive" : "glow"}
              size="sm"
              onClick={playAudioEffect}
              className="w-full"
            >
              {audioPlaying ? 'Остановить' : 'Воспроизвести'} звук
            </Button>
            <audio ref={audioRef} />
          </div>

          {/* Vibration */}
          <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Vibrate className="w-6 h-6 text-primary mr-3" />
              <h3 className="font-semibold">Тактильная обратная связь</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {vibrationSupported ? 'Vibration API поддерживается' : 'Vibration API не поддерживается'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={triggerVibration}
              className="w-full"
              disabled={!vibrationSupported}
            >
              Тестовая вибрация
            </Button>
          </div>

          {/* Share & Clipboard */}
          <div className="glass-effect p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Share className="w-6 h-6 text-primary mr-3" />
              <h3 className="font-semibold">Поделиться & Копировать</h3>
            </div>
            <div className="space-y-2">
              <Button
                variant="glow"
                size="sm"
                onClick={shareContent}
                className="w-full"
              >
                <Share className="w-4 h-4 mr-2" />
                Web Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="w-full"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? 'Скопировано!' : 'Копировать ссылку'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedFeatures;