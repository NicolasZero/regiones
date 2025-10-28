"use client"

import { LogOut, Settings } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"


export const AvatarOptions = () => {
    const authContext = useAuth()
    const logout = authContext?.logout


    const handleLogOut = () => {
        if (logout) {
            logout()
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="border-[1px] lg:border-2">
                    <Settings className=" h-[1.2rem] w-[1.2rem] transition-all dark:rotate-0 dark:scale-100 hover:border-white " />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>
                    <LogOut />
                    <span >Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}