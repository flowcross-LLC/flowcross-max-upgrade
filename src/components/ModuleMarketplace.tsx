import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Download, Star, Filter, Grid, List, Palette, Zap, Shield, Gamepad2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ModuleMarketplace = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = [
    { id: "all", name: "Все", icon: Grid },
    { id: "themes", name: "Темы", icon: Palette },
    { id: "performance", name: "Производительность", icon: Zap },
    { id: "security", name: "Безопасность", icon: Shield },
    { id: "gameplay", name: "Геймплей", icon: Gamepad2 }
  ];

  const modules = [
    {
      id: 1,
      name: "Neon Dark Theme",
      description: "Темная тема с неоновыми акцентами для FlowCross",
      category: "themes",
      price: "Бесплатно",
      rating: 4.8,
      downloads: 125000,
      image: "/api/placeholder/300/200",
      author: "FlowTeam",
      tags: ["dark", "neon", "modern"]
    },
    {
      id: 2,
      name: "Performance Booster",
      description: "Увеличивает производительность лаунчера на 40%",
      category: "performance",
      price: "$2.99",
      rating: 4.9,
      downloads: 89000,
      image: "/api/placeholder/300/200",
      author: "SpeedMods",
      tags: ["optimization", "speed", "ram"]
    },
    {
      id: 3,
      name: "Advanced Security Pack",
      description: "Расширенная защита от вредоносных модов",
      category: "security",
      price: "$4.99",
      rating: 4.7,
      downloads: 67000,
      image: "/api/placeholder/300/200",
      author: "SecureFlow",
      tags: ["security", "antivirus", "protection"]
    },
    {
      id: 4,
      name: "MineCraft Plus Module",
      description: "Дополнительные функции для Minecraft серверов",
      category: "gameplay",
      price: "$1.99",
      rating: 4.6,
      downloads: 234000,
      image: "/api/placeholder/300/200",
      author: "CraftMods",
      tags: ["minecraft", "servers", "features"]
    },
    {
      id: 5,
      name: "Glass Theme",
      description: "Прозрачная стеклянная тема с размытием",
      category: "themes",
      price: "Бесплатно",
      rating: 4.5,
      downloads: 156000,
      image: "/api/placeholder/300/200",
      author: "GlassDesign",
      tags: ["glass", "transparent", "blur"]
    },
    {
      id: 6,
      name: "Memory Optimizer",
      description: "Оптимизация использования оперативной памяти",
      category: "performance",
      price: "$1.49",
      rating: 4.4,
      downloads: 78000,
      image: "/api/placeholder/300/200",
      author: "OptimizeTeam",
      tags: ["memory", "ram", "optimization"]
    }
  ];

  const filteredModules = modules.filter(module => {
    const matchesSearch = module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || module.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInstall = (module: typeof modules[0]) => {
    toast({
      title: "Установка начата",
      description: `Устанавливаем ${module.name}...`
    });
  };

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Маркетплейс <span className="neon-text">модулей</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Персонализируйте свой FlowCross с помощью тем, модулей и расширений
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Поиск модулей, тем и расширений..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-effect"
              />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Modules Grid/List */}
        <div className={viewMode === "grid" 
          ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredModules.map((module) => (
            <Card key={module.id} className="glass-effect hover:border-primary/50 transition-all duration-300 group">
              <CardHeader className={viewMode === "list" ? "pb-3" : ""}>
                <div className={`flex ${viewMode === "list" ? "items-center gap-4" : "flex-col"}`}>
                  {/* Module Image */}
                  <div className={`${viewMode === "list" ? "w-20 h-20" : "w-full h-48"} bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center`}>
                    <Palette className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {module.name}
                      </CardTitle>
                      <Badge variant={module.price === "Бесплатно" ? "default" : "secondary"}>
                        {module.price}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">
                      {module.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {module.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {module.downloads.toLocaleString()}
                      </div>
                      <span>by {module.author}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {module.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Button 
                  onClick={() => handleInstall(module)}
                  className="w-full"
                  variant={module.price === "Бесплатно" ? "default" : "premium"}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {module.price === "Бесплатно" ? "Установить" : "Купить и установить"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">
              Попробуйте изменить поисковый запрос или категорию
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-effect p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Создайте свой модуль
            </h3>
            <p className="text-muted-foreground mb-6">
              Поделитесь своими идеями с сообществом FlowCross
            </p>
            <Button variant="premium" size="lg">
              Стать разработчиком
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModuleMarketplace;