import { useState, useEffect } from "react";
import { ArrowUp, Download, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const actions = [
    {
      icon: Download,
      label: "Скачать",
      action: () => console.log("Download"),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: MessageCircle,
      label: "Поддержка",
      action: () => console.log("Support"),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: Share2,
      label: "Поделиться",
      action: () => console.log("Share"),
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end space-y-reverse space-y-3">
      {/* Action Buttons */}
      {isExpanded && (
        <div className="flex flex-col space-y-3 mb-3">
          {actions.map((action, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 animate-slide-in-right"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <span className="bg-card text-card-foreground px-3 py-1 rounded-lg text-sm whitespace-nowrap glass-effect">
                {action.label}
              </span>
              <Button
                size="icon"
                className={`rounded-full shadow-lg ${action.color} transition-all duration-200 hover:scale-110`}
                onClick={action.action}
              >
                <action.icon className="w-5 h-5 text-white" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <div className="relative">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 neon-glow"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
            <ArrowUp className="w-6 h-6" />
          </div>
        </Button>

        {/* Scroll to top on long press or right click */}
        <Button
          size="icon"
          className="absolute inset-0 w-14 h-14 rounded-full opacity-0 hover:opacity-100 bg-accent/20 transition-opacity duration-200"
          onClick={scrollToTop}
          onContextMenu={(e) => {
            e.preventDefault();
            scrollToTop();
          }}
        />
      </div>
    </div>
  );
};

export default FloatingActionButton;