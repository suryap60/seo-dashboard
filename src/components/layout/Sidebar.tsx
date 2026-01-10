import { NavLink,  } from "react-router-dom";
import { LayoutDashboard, Link, FileText, CheckSquare, Search, Sun, Moon, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/backlinks", icon: Link, label: "Backlink Manager" },
  { to: "/content", icon: FileText, label: "Content Tasks" },
  { to: "/tasks", icon: CheckSquare, label: "Normal Tasks" },
];

export function Sidebar() {
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
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r bg-background border-border">
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
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors no-underline",
                  isActive
                    ? "bg-primary text-white hover:text-foreground focus:text-foreground"
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
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
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
  );
}
