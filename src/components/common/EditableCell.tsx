import { useState } from "react";
import { Edit3 } from "lucide-react";
import { InlineEdit } from "./InlineEdit";
import { cn } from "@/lib/utils";

interface EditableCellProps {
  value: string;
  onSave: (value: string) => void;
  type?: "text" | "textarea" | "select" | "date";
  options?: { value: string; label: string }[];
  className?: string;
  placeholder?: string;
  displayValue?: string;
  children?: React.ReactNode;
}

export function EditableCell({
  value,
  onSave,
  type = "text",
  options = [],
  className,
  placeholder,
  displayValue,
  children,
}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (newValue: string) => {
    onSave(newValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="w-full">
        <InlineEdit
          value={value}
          onSave={handleSave}
          onCancel={handleCancel}
          type={type}
          options={options}
          className={className}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className={cn(
        "group relative cursor-pointer hover:bg-accent/50 rounded px-1 py-1 -mx-1 -my-1 transition-colors w-full min-h-[32px] flex items-center",
        className
      )}
    >
      <div className="w-full flex-1 min-w-0">
        {children || displayValue || value || placeholder}
      </div>
      <Edit3 className="absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </div>
  );
}