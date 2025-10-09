"use client";
import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ThemeToggler as ThemeTogglerPrimitive } from "@/components/animate-ui/primitives/effects/theme-toggler";
import { buttonVariants } from "@/components/animate-ui/components/buttons/icon";
import { cn } from "@/lib/utils";



function ThemeTogglerButton({
  variant = "outline",
  size = "default",
  modes = ["light", "dark", "system"],
  direction = "ltr",
  onImmediateChange,
  onClick,
  className = "rounded-full cursor-pointer p-2 text-primary transition-all duration-300 ease-in-out",
  ...props
}) {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <ThemeTogglerPrimitive
      theme={theme}
      resolvedTheme={resolvedTheme}
      setTheme={setTheme}
      direction={direction}
      onImmediateChange={onImmediateChange}
    >
      {({ resolved, toggleTheme }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size='icon' className={"rounded-full"} variant='outline' aria-label='Select theme'>
              {resolved === "light" && (
                <Sun size={16} aria-hidden='true' />
              )}
              {resolved === "dark" && (
                <Moon size={16} aria-hidden='true' />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-32'>
            <DropdownMenuItem onClick={() => toggleTheme("light")}>
              <Sun size={16} className='opacity-60' aria-hidden='true' />
              <span>Light</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleTheme("dark")}>
              <Moon size={16} className='opacity-60' aria-hidden='true' />
              <span>Dark</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleTheme("system")}>
              <Monitor
                size={16}
                className='opacity-60'
                aria-hidden='true'
              />
              <span>System</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </ThemeTogglerPrimitive>
  );
}

export { ThemeTogglerButton };
