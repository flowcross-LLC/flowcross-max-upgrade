import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Check, X, Crown, Zap, Rocket } from "lucide-react";

const CompareFeatures = () => {
  const [isOpen, setIsOpen] = useState(false);

  const plans = [
    {
      name: "Flow Basic",
      icon: Zap,
      price: "$0",
      color: "text-gray-400"
    },
    {
      name: "Flow+",
      icon: Crown,
      price: "$4.99",
      color: "text-primary"
    },
    {
      name: "Flow v4",
      icon: Rocket,
      price: "$9.99",
      color: "text-purple-400"
    }
  ];

  const features = [
    {
      category: "Основные функции",
      items: [
        { name: "Базовый функционал лаунчера", basic: true, plus: true, premium: true },
        { name: "Доступ к публичным серверам", basic: true, plus: true, premium: true },
        { name: "Автоматическое обновление", basic: true, plus: true, premium: true },
        { name: "Кроссплатформенность", basic: true, plus: true, premium: true }
      ]
    },
    {
      category: "Премиум функции",
      items: [
        { name: "Премиум моды", basic: true, plus: true, premium: true },
        { name: "Премиум коллекция модов", basic: false, plus: true, premium: true },
        { name: "Приоритетный доступ к серверам", basic: false, plus: true, premium: true },
        { name: "Функции Flow v4", basic: false, plus: true, premium: true }
      ]
    },
    {
      category: "Эксклюзивные возможности",
      items: [
        { name: "Ранний доступ ко всем функциям", basic: false, plus: false, premium: true },
        { name: "Эксклюзивный контент", basic: false, plus: false, premium: true },
        { name: "VIP поддержка", basic: false, plus: false, premium: true },
        { name: "Персональный менеджер", basic: false, plus: false, premium: true }
      ]
    },
    {
      category: "Техническая поддержка",
      items: [
        { name: "FAQ и документация", basic: true, plus: true, premium: true },
        { name: "Email поддержка", basic: true, plus: true, premium: true },
        { name: "Приоритетная поддержка", basic: false, plus: true, premium: true },
        { name: "Круглосуточная поддержка", basic: false, plus: false, premium: true }
      ]
    }
  ];

  const FeatureIcon = ({ available }: { available: boolean }) => (
    available ? (
      <Check className="w-5 h-5 text-green-400" />
    ) : (
      <X className="w-5 h-5 text-gray-600" />
    )
  );

  return (
    <>
      <Button 
        variant="outline" 
        size="lg"
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto"
      >
        Сравнить все функции
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-effect max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-6">
              Подробное сравнение планов FlowCross
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Header */}
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold">Функции</th>
                  {plans.map((plan, index) => (
                    <th key={index} className="text-center p-4 min-w-[150px]">
                      <div className="flex flex-col items-center">
                        <plan.icon className={`w-8 h-8 mb-2 ${plan.color}`} />
                        <div className="font-bold text-lg">{plan.name}</div>
                        <div className="text-sm text-muted-foreground">{plan.price}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {features.map((category, categoryIndex) => (
                  <>
                    {/* Category Header */}
                    <tr key={`category-${categoryIndex}`}>
                      <td colSpan={4} className="p-4 bg-muted/20 font-semibold text-primary">
                        {category.category}
                      </td>
                    </tr>
                    
                    {/* Category Features */}
                    {category.items.map((feature, featureIndex) => (
                      <tr key={`feature-${categoryIndex}-${featureIndex}`} className="border-b border-border/50 hover:bg-muted/10">
                        <td className="p-4 font-medium">{feature.name}</td>
                        <td className="p-4 text-center">
                          <FeatureIcon available={feature.basic} />
                        </td>
                        <td className="p-4 text-center">
                          <FeatureIcon available={feature.plus} />
                        </td>
                        <td className="p-4 text-center">
                          <FeatureIcon available={feature.premium} />
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">Скачать Basic</Button>
            <Button variant="glow">Подписаться на Flow+</Button>
            <Button variant="premium">Получить Premium</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompareFeatures;