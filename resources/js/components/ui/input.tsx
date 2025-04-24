import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeClosed } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> { }

function Input({ className, type, ...props }: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  return (
    <div className="relative flex items-center justify-between w-full">
      <input
        type={isPassword && showPassword ? "text" : type}
        data-slot="input"
        className={cn(
          "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 border bg-transparent px-3 py-1",
          isPassword ? "pr-10" : "pl-3",
          "text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed rounded-md md:text-sm",
          "focus-visible:border-s1 focus-visible:ring-s1/10 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 flex items-center justify-center text-s3 cursor-pointer"
        >
          {showPassword ? <Eye className="h-5 w-5 " /> : <EyeClosed className="h-5 w-5" />}
        </button>
      )}
    </div>
  );
}

export { Input };
