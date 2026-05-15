"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type TemplateType = "classic" | "modern" | "floral";

interface TemplateSelectorProps {
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

const templates = [
  {
    id: "classic" as TemplateType,
    name: "Cổ điển",
    description: "Sang trọng, trang nhã",
    colors: ["#fef3c7", "#fed7aa", "#b45309"],
  },
  {
    id: "modern" as TemplateType,
    name: "Hiện đại",
    description: "Lãng mạn, tinh tế",
    colors: ["#fce7f3", "#fbcfe8", "#db2777"],
  },
  {
    id: "floral" as TemplateType,
    name: "Hoa lá",
    description: "Tươi mát, tự nhiên",
    colors: ["#d1fae5", "#a7f3d0", "#059669"],
  },
];

export function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-serif text-xl text-foreground">Chọn mẫu thiệp</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={cn(
              "relative p-4 rounded-xl border-2 transition-all duration-300 text-left",
              selected === template.id
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/50 bg-card"
            )}
          >
            {selected === template.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            
            {/* Color preview */}
            <div className="flex gap-1 mb-3">
              {template.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <h4 className="font-medium text-foreground">{template.name}</h4>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
