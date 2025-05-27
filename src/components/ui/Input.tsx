import * as React from "react"
import * as InputPrimitive from "@radix-ui/react-input"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils/cn"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input",
        outline: "border-2 border-border",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 rounded-md px-2",
        lg: "h-11 rounded-md px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <InputPrimitive.Root
        className={cn(inputVariants({ variant, size, className }))}
        {...props}
        ref={ref}
      />
    )
  }
)
Input.displayName = InputPrimitive.Root.displayName

export { Input }