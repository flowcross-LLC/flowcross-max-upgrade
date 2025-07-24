import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Download, LogIn } from "lucide-react";

const FlowCrossNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-effect backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold">
              <span className="neon-text">FlowCross</span>
              <span className="text-muted-foreground ml-1">LLC</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-foreground hover:text-primary transition-colors duration-200 hover:glow"
            >
              Features
            </a>
            <a
              href="#servers"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Servers
            </a>
            <a
              href="#community"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Community
            </a>
            <a
              href="#pricing"
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Pricing
            </a>
          </div>

          {/* Search and Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 glass-effect"
              />
            </div>
            <Button variant="glow" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <LogIn className="w-4 h-4 mr-2" />
              Log In
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border glass-effect">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#features" className="text-foreground hover:text-primary">
                Features
              </a>
              <a href="#servers" className="text-foreground hover:text-primary">
                Servers
              </a>
              <a href="#community" className="text-foreground hover:text-primary">
                Community
              </a>
              <a href="#pricing" className="text-foreground hover:text-primary">
                Pricing
              </a>
              <div className="flex space-x-2 pt-4">
                <Button variant="glow" size="sm" className="flex-1">
                  Download
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Log In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default FlowCrossNavbar;