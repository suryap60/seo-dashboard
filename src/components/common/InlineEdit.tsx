import { useState, useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  onCancel: () => void;
  type?: "text" | "textarea" | "select" | "date";
  options?: { value: string; label: string }[];
  className?: string;
  placeholder?: string;
}

export function InlineEdit({
  value,
  onSave,
  onCancel,
  type = "text",
  options = [],
  className,
  placeholder,
}: InlineEditProps) {
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (type === "text" || type === "date") {
      inputRef.current?.focus();
      inputRef.current?.select();
    } else if (type === "textarea") {
      textareaRef.current?.focus();
      textareaRef.current?.select();
    }
  }, [type]);

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    } else {
      onCancel();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && type !== "textarea") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      onCancel();
    }
  };

  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn("min-h-[80px] resize-none w-full text-sm", className)}
            placeholder={placeholder}
          />
        );
      case "select":
        return (
          <Select value={editValue} onValueChange={setEditValue}>
            <SelectTrigger className={cn("w-full text-sm h-8", className)}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "date":
        return (
          <Input
            ref={inputRef}
            type="date"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn("w-full text-sm h-8", className)}
          />
        );
      default:
        return (
          <Input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn("w-full text-sm h-8", className)}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className="flex items-start gap-1 w-full">
      <div className="flex-1 min-w-0 pr-1">
        {renderInput()}
      </div>
      <div className="flex items-center gap-1 flex-shrink-0 pt-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          className="h-6 w-6 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <Check className="h-3 w-3" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={onCancel}
          className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}