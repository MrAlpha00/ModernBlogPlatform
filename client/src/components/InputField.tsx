import { forwardRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, containerClassName, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", containerClassName)}>
        <Label 
          htmlFor={props.id} 
          className="text-sm font-medium text-foreground"
        >
          {label}
        </Label>
        <Input
          ref={ref}
          className={cn(
            "bg-card border-2 border-primary/60 text-foreground",
            "focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow",
            "placeholder:text-muted-foreground",
            "transition-all duration-300",
            "min-h-11",
            error && "border-destructive focus:border-destructive focus:ring-destructive/50",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
