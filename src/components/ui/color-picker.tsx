import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  placeholder?: string;
}

const presetColors = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
  "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#64748b"
];

export function ColorPicker({ value, onChange, placeholder = "Pick a color" }: ColorPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start text-left font-normal"
        >
          <div className="flex items-center gap-2">
            <div 
              className="h-4 w-4 rounded border border-border"
              style={{ backgroundColor: value || "#ffffff" }}
            />
            {value || placeholder}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <Input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
          />
          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                className="h-8 w-8 rounded border border-border hover:scale-105 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => {
                  onChange(color);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}