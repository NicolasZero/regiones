"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IdCard, MailIcon, ChevronLeft, Smartphone } from "lucide-react"
import { useRouter } from "next/navigation"

export function RecoverPasswordForm() {

    const router = useRouter()

    const handleBackClick = () => {
        router.push("/login")
    }

    return (
        <Card className="w-[320px] mt-1 md:mt-5">
            <CardHeader>
                <CardTitle className="text-center">Recuperar contraseña</CardTitle>
                <CardDescription className="text-center">Ingrese los datos solicitados para recuperar su contraseña</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-3">
                            <Label htmlFor="number-id">Cédula</Label>
                            <div className="relative">
                                <Input id="number-id" type="number" placeholder="01234567" />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-dark-foreground">
                                    <IdCard />
                                </div>
                            </div>
                            <Label htmlFor="phone-number">Teléfono</Label>
                            <div className="relative">
                                <Input
                                    id="phone-number"
                                    type="number"
                                    placeholder="04120001122"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-dark-foreground">
                                    <Smartphone />
                                </div>
                            </div>
                            <span className="block text-center mt-2"> Ó </span>
                            <Label htmlFor="email">Correo electrónico</Label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-dark-foreground">
                                    <MailIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 justify-center">
                <Button>Aceptar</Button>
                <div className="w-full">
                    <a onClick={handleBackClick} className="text-center text-blue-600 dark:text-dark-foreground dark:hover:text-black items-center cursor-pointer">
                        <span className="hover:bg-gray-300 dark:hover:bg-white p-1 rounded inline-flex">
                            <ChevronLeft className="mr-2" />
                            Volver atrás
                        </span>
                    </a>
                </div>
            </CardFooter>
        </Card>
    )
}