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

import LoginForm from "@/components/login-form"
import { useRouter } from "next/navigation"

export function LoginContainer() {

  const router = useRouter()

  const handleGoToRecoverPassword = () => {
    router.push("login/recover-password")
  }

  return (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle className="text-center">Iniciar Sesión</CardTitle>
        <CardDescription className="text-center">Ingrese usuario y contraseña</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm>
          <Button type="submit">Ingresar</Button>
        </LoginForm>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 justify-center">
        {/* <div className="w-full">
          <p className="text-center">¿Olvidaste tu contraseña?</p>
          <a onClick={handleGoToRecoverPassword} className="block text-center text-blue-600 dark:text-white dark:hover:text-black cursor-pointer">
            <span className="hover:bg-gray-300 dark:hover:bg-white p-1 rounded">¡Clic aquí!</span>
          </a>
        </div> */}
      </CardFooter>
    </Card>
  )
}
