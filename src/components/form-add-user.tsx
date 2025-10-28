import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import type { Worker } from "@/lib/types"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { EyeIcon, EyeOff, User2 } from "lucide-react"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import api from "@/api/api_regiones"
import { Notification } from "./notification"

interface formAddUserProps {
    dataWorker: Worker
}



const Schema = z.object({
    username: z.string().min(1, "Ingrese un nombre de usuario"),
    password: z.string().min(1, "Ingrese una contraseña"),
    role_id: z.coerce.number().min(1, "Seleccione un nivel de acceso"),
})

export default function FormAddUser({ dataWorker }: formAddUserProps) {
    const [showNotification, setShowNotification] = useState(false)
    const [userNameUsed, setUserNameUsed] = useState("")
    const [userExist, setUserExist] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const defaultValues = {
        username: "",
        password: "",
        role_id: 0,
    }

    const form = useForm({
        resolver: zodResolver(Schema),
        defaultValues
    })

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof Schema>) => {
            const response = await api.post('/user', { ...data, worker_id: dataWorker?.id });
            return response.data;
        },
    })

    function onSubmit(data: z.infer<typeof Schema>) {
        setShowNotification(false)
        mutation.mutate(data,
            {
                onSuccess: () => {
                    form.reset(defaultValues)
                    setShowNotification(true)
                    console.log('Datos enviados con éxito');
                },
                onError: (error: any) => {
                    if (error.response.data.error === "El nombre de usuario ya esta en uso") {
                        setUserNameUsed(error.response.data.error)
                    }
                    if (error.response.data.error === "Ese trabajador ya posee un usuario") {
                        setUserExist(error.response.data.error)
                    }
                    const timer = setTimeout(() => {
                        setUserNameUsed("")
                        setUserExist("")
                        clearTimeout(timer)
                    }, 500)
                }
            }
        )

    }
    return (
        <>
            {showNotification && <Notification message="Usuario registrado" />}
            {userNameUsed.length > 1 && <Notification message={userNameUsed} variant={"destructive"} />}
            {userExist.length > 1 && <Notification message={userExist} variant={"destructive"} />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 lg:grid-cols-3 lg:gap-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="col-span-12 lg:col-span-1 ">
                                <FormLabel>Usuario</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input placeholder="Mariaperez123" {...field} />
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
                    <FormField
                        control={form.control}
                        name="role_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Nivel de acceso</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">Seleccione</SelectItem>
                                        <SelectItem value="1">Administrador(a)</SelectItem>
                                        <SelectItem value="2">Usuario(a)</SelectItem>

                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="col-span-12 md:col-span-4 justify-self-center w-full md:w-2/4 mt-2">Crear</Button>
                </form>
            </Form>
        </>
    )
}