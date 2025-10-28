"use client"
import ProtectedRoute from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import TablaUsuarios from "@/components/user-table";
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"


export default function UsersPage() {

    const router = useRouter()

    const handleRedirect = () => {
        router.push("/dashboard/users/add-user")
    }

    return (
        <ProtectedRoute requiredRole={1}>
            <div>
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold text-center mb-4">Gestión de usuarios</h1>
                    <Button className="mb-4 w-fit" onClick={handleRedirect}> Añadir usuario <Plus /></Button>
                </div>
                <TablaUsuarios />
            </div>
        </ProtectedRoute>
    );
}