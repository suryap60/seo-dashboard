import { NavLink,  } from "react-router-dom";
import { LayoutDashboard, Link, FileText, CheckSquare, Search, Sun, Moon, HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/backlinks", icon: Link, label: "Backlink Manager" },
  { to: "/content", icon: FileText, label: "Content Tasks" },
  { to: "/tasks", icon: CheckSquare, label: "Normal Tasks" },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  // On desktop, always show sidebar. On mobile, use isOpen prop
  const isVisible = typeof isOpen === 'boolean' ? isOpen : true;
  // const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isVisible && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r bg-background dark:bg-[#18181b] border-border transition-transform duration-300 ease-in-out",
        "lg:translate-x-0", // Always visible on desktop
        isVisible ? "translate-x-0" : "-translate-x-full" // Mobile toggle
      )}>
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 lg:hidden p-1 rounded-md hover:bg-accent"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-600">
            <Search className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-foreground">SEO Analytics</span>
        </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          // const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose} // Close mobile menu when navigating
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors no-underline",
                  isActive
                    ? "bg-[#dc2626] !text-white hover:!text-white focus:!text-white"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground focus:text-foreground"
                )
              }
            >

              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4 space-y-2">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors border border-border focus:outline-none focus:border-border"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>

        <div className="rounded-md bg-red-600 p-4">
          <div className="flex items-center gap-2 text-white">
            <HelpCircle className="h-4 w-4" />
            <span className="font-medium">Need Help?</span>
          </div>
          <p className="mt-1 text-xs text-white/80">
            Check our documentation
          </p>
        </div>
      </div>
      </aside>
    </>
  );
}
