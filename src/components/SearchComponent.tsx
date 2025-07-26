import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'feature' | 'page' | 'content';
  action: () => void;
}

const SearchComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'Features',
      description: 'Explore FlowCross features and capabilities',
      type: 'feature',
      action: () => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: '2',
      title: 'Pricing',
      description: 'View pricing plans and subscription options',
      type: 'page',
      action: () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: '3',
      title: 'Download',
      description: 'Download FlowCross launcher',
      type: 'content',
      action: () => document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
    },
    {
      id: '4',
      title: 'Community',
      description: 'Join our community and connect with other users',
      type: 'feature',
      action: () => window.open('https://discord.gg/flowcross', '_blank')
    },
    {
      id: '5',
      title: 'Stats',
      description: 'View FlowCross statistics and performance metrics',
      type: 'content',
      action: () => document.getElementById('stats-section')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleResultClick = (result: SearchResult) => {
    result.action();
    setIsOpen(false);
    setSearchQuery("");
  };

  if (!isOpen) {
    return (
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 cursor-pointer" 
          onClick={() => setIsOpen(true)}
        />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 glass-effect cursor-pointer"
          onClick={() => setIsOpen(true)}
          readOnly
        />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search features, pages..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 glass-effect"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          onClick={() => {
            setIsOpen(false);
            setSearchQuery("");
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Search Results */}
      {searchQuery.trim() && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-effect border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full text-left p-3 rounded-lg hover:bg-accent/10 transition-colors duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Search className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {result.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {result.description}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground bg-accent/20 px-2 py-1 rounded">
                      {result.type}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;