import { useState } from "react";
import { Check, Crown, Rocket, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SubscriptionHandler from "@/components/SubscriptionHandler";
import CompareFeatures from "@/components/CompareFeatures";

const FlowCrossPricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Flow Basic",
      description: "Основные функции для казуальных игроков",
      price: "$0",
      period: "/навсегда",
      icon: Zap,
      popular: false,
      features: [
        "Базовый функционал лаунчера",
        "Доступ к публичным серверам",
        "Премиум моды",
        "Функции раннего доступа"
      ],
      buttonText: "Скачать бесплатно",
      buttonVariant: "outline" as const,
      gradient: "from-gray-400/20 to-gray-600/20"
    },
    {
      name: "Flow+",
      description: "Расширенный опыт для регулярных игроков",
      monthlyPrice: "$4.99",
      yearlyPrice: "$49.99",
      monthlyPeriod: "/месяц",
      yearlyPeriod: "/год",
      icon: Crown,
      popular: true,
      features: [
        "Все из Basic",
        "Премиум коллекция модов",
        "Приоритетный доступ к серверам",
        "Функции Flow v4"
      ],
      buttonText: "Подписаться",
      buttonVariant: "glow" as const,
      gradient: "from-primary/20 to-accent/20"
    },
    {
      name: "Flow v4",
      description: "Полный пакет для продвинутых пользователей",
      monthlyPrice: "$9.99",
      yearlyPrice: "$99.99",
      monthlyPeriod: "/месяц",
      yearlyPeriod: "/год",
      icon: Rocket,
      popular: false,
      features: [
        "Все из Flow+",
        "Ранний доступ ко всем функциям",
        "Эксклюзивный контент",
        "VIP поддержка"
      ],
      buttonText: "Получить Premium",
      buttonVariant: "premium" as const,
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden section-block mx-4 md:mx-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full">
              Тарифные планы
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Выберите свою <span className="neon-text text-primary">версию</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Найдите идеальный план для вашего стиля игры
          </p>
          
          {/* Billing Period Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-muted/20 p-1 rounded-lg flex">
              <button
                onClick={() => setBillingPeriod("monthly")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  billingPeriod === "monthly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Ежемесячно
              </button>
              <button
                onClick={() => setBillingPeriod("yearly")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 relative ${
                  billingPeriod === "yearly"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Ежегодно
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl transition-all duration-500 hover:scale-105 ${
                plan.popular
                  ? "glass-effect border-2 border-primary floating-glow"
                  : "glass-effect border border-border"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ПОПУЛЯРНЫЙ
                  </div>
                </div>
              )}

              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-2xl opacity-50`}></div>
              
              <div className="relative z-10">
                {/* Plan Icon */}
                <div className={`inline-block p-4 rounded-xl mb-6 ${
                  plan.popular ? "bg-primary/20" : "bg-muted/20"
                }`}>
                  <plan.icon className={`w-8 h-8 ${
                    plan.popular ? "text-primary" : "text-muted-foreground"
                  }`} />
                </div>

                {/* Plan Info */}
                <h3 className="text-2xl font-bold mb-2 text-foreground">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-foreground transition-all duration-500 animate-fade-in">
                      {plan.name === "Flow Basic" ? plan.price : 
                       billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {plan.name === "Flow Basic" ? plan.period : 
                       billingPeriod === "monthly" ? plan.monthlyPeriod : plan.yearlyPeriod}
                    </span>
                  </div>
                  {billingPeriod === "yearly" && plan.name !== "Flow Basic" && (
                    <p className="text-sm text-green-400 mt-1">
                      Экономия {plan.name === "Flow+" ? "$9.89" : "$19.89"} в год
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <SubscriptionHandler
                  planName={plan.name}
                  planPrice={plan.name === "Flow Basic" ? 
                    plan.price + plan.period : 
                    (billingPeriod === "monthly" ? 
                      plan.monthlyPrice + plan.monthlyPeriod : 
                      plan.yearlyPrice + plan.yearlyPeriod)}
                  planFeatures={plan.features}
                  buttonText={plan.buttonText}
                  variant={plan.buttonVariant}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-effect p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Готовы к игре?
            </h3>
            <p className="text-muted-foreground mb-6">
              Скачайте FlowCross лаунчер и начните свое приключение уже сегодня
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg">
                Скачать сейчас
              </Button>
              <CompareFeatures />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlowCrossPricing;