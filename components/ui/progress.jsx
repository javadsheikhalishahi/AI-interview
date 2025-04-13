"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

function Progress({
  className,
  value,
  ...props
}) {
  return (
    (<ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-blue-600/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}>
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "bg-blue-600 h-full w-full flex-1 transition-all duration-500 ease-in-out",
          "bg-[linear-gradient(90deg,#3b82f6_25%,#60a5fa_50%,#3b82f6_75%)] bg-[length:200%_100%] animate-progressStripe"
        )}        
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
    </ProgressPrimitive.Root>)
  );
}

export { Progress };

