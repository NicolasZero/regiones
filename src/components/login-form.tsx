"use client"

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOff, User2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { AlertDestructive } from "./alert"

import React from "react";

import { useAuth } from "@/context/auth-context"

export default function LoginForm({ children }: { children: React.ReactNode }) {

    // const router = useRouter()

    const auth = useAuth()
    const [showPassword, setShowPassword] = useState(false)

    const formLoginSchema = z.object({
        username: z.string({
            required_error: "Por favor ingrese su usuario.",
        }).min(1, {
            message: "Este campo no puede estar vacío."
        }).max(30, "Máximo 30 caracteres."),

        password: z.string({
            required_error: "Por favor ingrese su contraseña.",
        }).min(1, {
            message: "Este campo no puede estar vacío."
        }).max(30, "Máximo 30 caracteres."),

    })

    const form = useForm<z.infer<typeof formLoginSchema>>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    })

    if (!auth) {
        return <div>Error: Auth context is not available</div>
    }
    const { login, wrongCredentials, userNotActive } = auth

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    // 2. Define a submit handler.
    function onSubmit(data: z.infer<typeof formLoginSchema>) {
        login(data.username, data.password)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-3">
                        {/* ---------Username--------- */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-1 ">
                                    <FormLabel>Usuario</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input id="user" placeholder="Mariaperez123" {...field} />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-white">
                                                <User2 />
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* --------Password-------- */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-1 ">
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="*********"
                                                className="pr-10"
                                                {...field}
                                            />
                                            <button
                                                type="button"
                                                onClick={togglePasswordVisibility}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-white"
                                            >
                                                {showPassword ? <EyeIcon /> : <EyeOff />}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center mt-4 gap-4">
                    {wrongCredentials && <AlertDestructive>Credenciales incorrectas</AlertDestructive>}
                    {userNotActive && <AlertDestructive>Usuario no activo</AlertDestructive>}                    
                    {children}
                </div>
            </form>
        </Form>
    )
}