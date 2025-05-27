import * as React from "react"
import * as CalendarPrimitive from "@radix-ui/react-calendar"
import { format, parseISO } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../utils/cn"

const Calendar = React.forwardRef<
  React.ComponentPropsWithoutRef<typeof CalendarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CalendarPrimitive.Root>
>(({ className, mode, ...props }, ref) => (
  <CalendarPrimitive.Root
    ref={ref}
    mode={mode}
    className={cn("w-full p-3 rounded-md border bg-white", className)}
    {...props}
  />
))

Calendar.displayName = CalendarPrimitive.Root.displayName

export { Calendar }
