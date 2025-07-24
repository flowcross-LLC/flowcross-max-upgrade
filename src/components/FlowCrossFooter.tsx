import { Github, Twitter, MessageCircle, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const FlowCrossFooter = () => {
  const footerLinks = {
    product: [
      { name: "Функции", href: "#features" },
      { name: "Серверы", href: "#servers" },
      { name: "Сообщество", href: "#community" },
      { name: "Тарифы", href: "#pricing" }
    ],
    company: [
      { name: "О нас", href: "#about" },
      { name: "Карьера", href: "#careers" },
      { name: "Пресс-кит", href: "#press" },
      { name: "Блог", href: "#blog" }
    ],
    support: [
      { name: "Помощь", href: "#help" },
      { name: "Документация", href: "#docs" },
      { name: "API", href: "#api" },
      { name: "Статус", href: "#status" }
    ],
    legal: [
      { name: "Конфиденциальность", href: "#privacy" },
      { name: "Условия использования", href: "#terms" },
      { name: "Лицензия", href: "#license" },
      { name: "Cookies", href: "#cookies" }
    ]
  };

  const socialLinks = [
    { icon: MessageCircle, href: "#", label: "Discord", color: "hover:text-indigo-400" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-400" },
    { icon: Github, href: "#", label: "GitHub", color: "hover:text-gray-400" }
  ];

  return (
    <footer className="relative bg-card/30 border-t border-border backdrop-blur-sm">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
      
      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-border">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Будьте в курсе обновлений
              </h3>
              <p className="text-muted-foreground mb-8">
                Подпишитесь на нашу рассылку, чтобы получать последние новости о FlowCross
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Ваш email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
                  />
                </div>
                <Button variant="glow">
                  <Mail className="w-4 h-4 mr-2" />
                  Подписаться
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">F</span>
                </div>
                <span className="text-2xl font-bold">
                  <span className="neon-text text-primary">FlowCross</span>
                  <span className="text-muted-foreground ml-1">LLC</span>
                </span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Минималистичный, мощный лаунчер Minecraft для современного гейминга. 
                Создан для производительности, разработан для простоты.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`p-2 rounded-lg bg-background/50 hover:bg-background transition-all duration-200 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Продукт</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Компания</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Поддержка</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Правовая информация</h4>
              <ul className="space-y-2">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Москва, Россия</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">support@flowcross.space</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground text-sm">
                © 2024 FlowCross LLC. Все права защищены.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">v2.9.3</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">Все системы работают</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FlowCrossFooter;