import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-600">
          <Search className="h-4 w-4 text-white" />
        </div>
        <span className="text-lg font-semibold text-foreground">SEO Analytics</span>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="h-10 w-10"
      >
        <Menu className="h-5 w-5" />
      </Button>
    </header>
  );
}