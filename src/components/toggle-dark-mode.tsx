"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export  const ToggleDarkMode = () => {
    const { setTheme } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className=" border-[1px] lg:border-2 ">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 " />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:border-white" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Claro 
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Oscuro
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

