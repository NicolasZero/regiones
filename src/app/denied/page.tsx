"use client"

import { useRouter } from "next/navigation"
import { OctagonX } from "lucide-react"

export default function PageDenied() {

    const router = useRouter()

    const handleGoToLogin = () => {
        router.push("login")
    }
    return (
        <div className="text-center">
            <div className="flex flex-col justify-center items-center m-10">
                <h1 className="text-4xl text-red-600 ">Acceso denegado</h1>
                <OctagonX className="w-20 h-20 text-red-600 dark:text-red-600 text-center block" />
            </div>
            <p>Debes iniciar sesión para acceder a esta página</p>
            <a onClick={handleGoToLogin} className=" m-5 block text-center text-blue-600 dark:text-white dark:hover:text-black cursor-pointer">
                <span className="hover:bg-gray-300 dark:hover:bg-white p-1 rounded">Ir al login</span>
            </a>
        </div>
    );
}