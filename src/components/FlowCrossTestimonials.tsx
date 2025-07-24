import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const FlowCrossTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Александр К.",
      username: "@alexgamer",
      avatar: "🎮",
      rating: 5,
      text: "FlowCross настолько быстрый, что я успеваю покушать пока он запускается! Шучу, он запускается мгновенно, даже поесть не успеваю 😄",
      game: "Minecraft с 200+ модами"
    },
    {
      name: "Мария С.",
      username: "@mariastudio",
      avatar: "🏗️",
      rating: 5,
      text: "Раньше я строила дома в реальной жизни быстрее, чем запускался мой старый лаунчер. Теперь с FlowCross я строю и в игре быстрее! 🏠⚡",
      game: "Creative Building"
    },
    {
      name: "Дмитрий П.",
      username: "@dimacraft",
      avatar: "⚔️",
      rating: 5,
      text: "FlowCross дает мне такое преимущество в PvP, что противники думают, что я читер. Но нет, просто у меня FPS как у NASA! 🚀",
      game: "PvP Arena"
    },
    {
      name: "Анна В.",
      username: "@annawitch",
      avatar: "🔮",
      rating: 5,
      text: "Установка модов стала проще, чем заваривание чая! Правда, теперь я забываю про чай и играю до утра... 🍵😅",
      game: "Modded Adventure"
    },
    {
      name: "Игорь Р.",
      username: "@igortech",
      avatar: "🚀",
      rating: 5,
      text: "Как программист, я оцениваю код FlowCross. Он настолько чистый, что мне захотелось его съесть! Но вместо этого я просто играю 🤓",
      game: "Mod Development"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-primary uppercase tracking-wider bg-primary/10 px-4 py-2 rounded-full">
              Отзывы игроков
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Что говорят наши <span className="neon-text text-primary">игроки</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Более 2.5 миллионов довольных пользователей по всему миру
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="glass-effect rounded-3xl p-8 md:p-12 text-center floating-glow">
              <div className="flex justify-center mb-6">
                <Quote className="w-12 h-12 text-primary/30" />
              </div>
              
              <div className="mb-8">
                <p className="text-lg md:text-xl text-foreground leading-relaxed italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* User Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-2xl">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-foreground text-lg">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-primary text-sm">
                    {testimonials[currentTestimonial].username}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[currentTestimonial].game}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-effect"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-effect"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>

        {/* All Testimonials Grid (Mobile friendly) */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl glass-effect hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-lg mr-3">
                  {testimonial.avatar}
                </div>
                <div>
                  <h5 className="font-semibold text-foreground text-sm">{testimonial.name}</h5>
                  <p className="text-muted-foreground text-xs">{testimonial.game}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.text.substring(0, 120)}..."
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowCrossTestimonials;