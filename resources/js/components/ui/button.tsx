import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50  aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        approve:
          "border border-blue-600 text-blue-600 shadow-xs hover:bg-blue-600 hover:text-white",
        reject:
          "border border-red-600 text-red-600 shadow-xs hover:bg-red-600 hover:text-white",
        plain:
          "text-s3  hover:bg-s3 hover:text-white",
        primary:
          "bg-s3 text-white hover:bg-s2",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        ghost: "text-foreground hover:text-foreground/80",
        link: "text-s3 hover:underline",
        search: "border-1 bg-blue-200 rounded-sm hover:bg-blue-300",
      },
      size: {
        primary: "h-9 rounded-2xl px-5 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-2xl px-3  py-2 has-[>svg]:px-2.5",
        lg: "h-10 rounded-2xl px-6  py-3 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
