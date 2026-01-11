import type { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageWrapper({ children, title, description, actions }: PageWrapperProps) {
  return (
    <div className="lg:ml-60 h-full bg-background">
      <div className="p-4 lg:p-8 pt-20 lg:pt-8 h-full">
        <div className="mb-6 lg:mb-8 flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="mt-1 text-muted-foreground">{description}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-3 flex-wrap">{actions}</div>}
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
