import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Gamepad2, Mic, Eye, Cpu, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const InteractiveShowcase = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<string>("");
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [gamepadConnected, setGamepadConnected] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Детекция устройства
    const userAgent = navigator.userAgent;
    if (/Android/i.test(userAgent)) {
      setCurrentDevice("Android");
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      setCurrentDevice("iOS");
    } else if (/Windows/i.test(userAgent)) {
      setCurrentDevice("Windows");
    } else if (/Mac/i.test(userAgent)) {
      setCurrentDevice("macOS");
    } else {
      setCurrentDevice("Desktop");
    }

    // Геймпад
    const handleGamepadConnected = () => {
      setGamepadConnected(true);
      toast({
        title: "Геймпад подключен!",
        description: "Обнаружен игровой контроллер"
      });
    };

    const handleGamepadDisconnected = () => {
      setGamepadConnected(false);
      toast({
        title: "Геймпад отключен",
        description: "Игровой контроллер отключен"
      });
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
      window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
    };
  }, [toast]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240 }, 
        audio: false 
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      toast({
        title: "Камера активирована!",
        description: "WebRTC камера успешно запущена"
      });
    } catch (error) {
      toast({
        title: "Ошибка доступа к камере",
        description: "Не удалось получить доступ к камере",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      // Создаем MediaRecorder для записи
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        // Создаем аудио элемент для воспроизведения
        const audio = new Audio(audioUrl);
        audio.play();
        
        toast({
          title: "Запись завершена!",
          description: "Аудио записано и воспроизводится"
        });
        
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
      };
      
      mediaRecorder.start();
      
      // Останавливаем запись через 3 секунды
      setTimeout(() => {
        mediaRecorder.stop();
      }, 3000);
      
      toast({
        title: "Запись началась!",
        description: "Записываем аудио в течение 3 секунд..."
      });
    } catch (error) {
      toast({
        title: "Ошибка доступа к микрофону",
        description: "Не удалось получить доступ к микрофону",
        variant: "destructive"
      });
      setIsRecording(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        // Применяем цветовой фильтр
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Применяем синий оттенок
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 0.8); // Red
          data[i + 1] = Math.min(255, data[i + 1] * 0.9); // Green
          data[i + 2] = Math.min(255, data[i + 2] * 1.2); // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        toast({
          title: "Фото сделано!",
          description: "Снимок обработан с цветовым фильтром"
        });
      }
    }
  };

  const checkDeviceOrientation = () => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (event) => {
        toast({
          title: "Ориентация устройства",
          description: `α: ${Math.round(event.alpha || 0)}°, β: ${Math.round(event.beta || 0)}°, γ: ${Math.round(event.gamma || 0)}°`
        });
      }, { once: true });
      
      toast({
        title: "Датчик ориентации активирован",
        description: "Поверните устройство для получения данных"
      });
    } else {
      toast({
        title: "Датчик не поддерживается",
        description: "DeviceOrientation API недоступен",
        variant: "destructive"
      });
    }
  };

  const detectMotion = () => {
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', (event) => {
        const acceleration = event.acceleration;
        if (acceleration && (Math.abs(acceleration.x || 0) > 5 || Math.abs(acceleration.y || 0) > 5)) {
          toast({
            title: "Движение обнаружено!",
            description: "Устройство было встряхнуто"
          });
        }
      }, { once: true });
      
      toast({
        title: "Датчик движения активирован",
        description: "Встряхните устройство"
      });
    } else {
      toast({
        title: "Датчик не поддерживается",
        description: "DeviceMotion API недоступен",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="neon-text text-primary">Интерактивная</span> демонстрация
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Современные веб-технологии в действии
          </p>
          <Badge variant="secondary" className="mt-4">
            Устройство: {currentDevice}
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Камера */}
          <Card className="glass-effect hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Camera className="w-6 h-6 text-primary mr-3" />
                <h3 className="font-semibold">WebRTC Камера</h3>
              </div>
              
              {cameraStream ? (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full rounded-lg bg-black"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={capturePhoto} variant="outline">
                      <Palette className="w-4 h-4 mr-1" />
                      Фото
                    </Button>
                    <Button size="sm" onClick={stopCamera} variant="destructive">
                      Стоп
                    </Button>
                  </div>
                  <canvas ref={canvasRef} className="w-full rounded-lg" style={{display: 'none'}} />
                </div>
              ) : (
                <Button onClick={startCamera} className="w-full">
                  Включить камеру
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Аудио запись */}
          <Card className="glass-effect hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Mic className={`w-6 h-6 mr-3 ${isRecording ? 'text-red-400' : 'text-primary'}`} />
                <h3 className="font-semibold">Запись аудио</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                MediaRecorder API для записи звука
              </p>
              <Button 
                onClick={startAudioRecording} 
                disabled={isRecording}
                className="w-full"
                variant={isRecording ? "destructive" : "default"}
              >
                {isRecording ? (
                  <>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-2" />
                    Запись... (3с)
                  </>
                ) : (
                  'Записать голос'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Геймпад */}
          <Card className="glass-effect hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Gamepad2 className={`w-6 h-6 mr-3 ${gamepadConnected ? 'text-green-400' : 'text-primary'}`} />
                <h3 className="font-semibold">Gamepad API</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Статус:</span>
                  <span className={gamepadConnected ? 'text-green-400' : 'text-red-400'}>
                    {gamepadConnected ? 'Подключен' : 'Не подключен'}
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Подключите USB или Bluetooth геймпад
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Датчики устройства */}
          <Card className="glass-effect hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-primary mr-3" />
                <h3 className="font-semibold">Датчик ориентации</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                DeviceOrientation API
              </p>
              <Button onClick={checkDeviceOrientation} size="sm" className="w-full">
                Проверить ориентацию
              </Button>
            </CardContent>
          </Card>

          {/* Датчик движения */}
          <Card className="glass-effect hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Cpu className="w-6 h-6 text-primary mr-3" />
                <h3 className="font-semibold">Датчик движения</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                DeviceMotion API
              </p>
              <Button onClick={detectMotion} size="sm" className="w-full">
                Активировать детекцию
              </Button>
            </CardContent>
          </Card>

          {/* Производительность */}
          <Card className="glass-effect hover:scale-105 transition-transform duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Cpu className="w-6 h-6 text-primary mr-3" />
                <h3 className="font-semibold">Информация о системе</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ядра:</span>
                  <span>{navigator.hardwareConcurrency || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Память:</span>
                  <span>{(navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} ГБ` : 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Онлайн:</span>
                  <span className={navigator.onLine ? 'text-green-400' : 'text-red-400'}>
                    {navigator.onLine ? 'Да' : 'Нет'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InteractiveShowcase;