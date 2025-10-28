"use client"

import api from "@/api/api_regiones";
import FormAddUser from "@/components/form-add-user";
import ProtectedRoute from "@/components/protected-route";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-select"
import { useQuery } from "@tanstack/react-query";
import { ca } from "date-fns/locale";
import { ChevronLeft, IdCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AddUserPage() {
    const [shouldFetch, setShouldFetch] = useState(false);
    const [id, setId] = useState("")


    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value)
    }

    const router = useRouter()

    const handleSearchClick = () => {
        setShouldFetch(true)
    }

    const handleBackClick = () => {
        router.back()
    }

    const fetchWorker = async (id: string) => {
        try {
            const response = await api.get(`/worker/ic/${id}`)
            return response.data.data
        } catch (error) {
            console.error(error)
            return { error: "No se encontró ningún trabajador con la cédula ingresada" }
        }

    }

    const { data: dataWorker, isError} = useQuery({
        queryKey: ["worker"],
        queryFn: () => fetchWorker(id),
        enabled: shouldFetch
    })
    useEffect(() => {
        if (dataWorker || isError) {
            setShouldFetch(false); // Restablece shouldFetch a false después de la búsqueda
        }
    }, [dataWorker, isError ]);
    return (
        <ProtectedRoute requiredRole={1}>
            <div>
                <h1 className="text-2xl font-bold text-center mb-4">Añadir usuario</h1>
                <div className="w-full">
                    <a onClick={handleBackClick} className="text-center text-blue-600 dark:text-dark-foreground dark:hover:text-dark items-center cursor-pointer">
                        <span className="hover:bg-gray-300 dark:hover:bg-dark-foreground p-1 rounded inline-flex">
                            <ChevronLeft className="mr-2" />
                            Volver atrás
                        </span>
                    </a>
                </div>
                <div className=" w-full mt-2 flex justify-center items-center gap-2">
                    <div className="flex flex-col justify-center items-start gap-2">
                        <Label htmlFor="number-id">Cédula:</Label>
                        <div className="relative">
                            <Input id="number-id" type="number" placeholder="01234567" value={id} onChange={handleIdChange} />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-dark-foreground">
                                <IdCard />
                            </div>
                        </div>
                    </div>
                    <Button className=" self-end" disabled={id === ""} onClick={handleSearchClick}>Buscar</Button>
                </div>
                <Separator className="border my-4" />
                {Number(id) === dataWorker?.identity_card && (
                    <div className="flex flex-col justify-center items-center gap-4">
                        <p>La cédula ingresada corresponde al trabajador {dataWorker?.full_name}</p>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>Ver información del trabajador</AccordionTrigger>
                                <AccordionContent>
                                    <b>Detalles del trabajador:</b>
                                    <ul>
                                        <li>Departamento: {dataWorker?.department}</li>
                                        <li>Cargo: {dataWorker?.position}</li>
                                        <li>Tipo de nómina: {dataWorker?.payroll_type}</li>
                                        <li>Estatus: {dataWorker?.status === "true" ? "Trabajador activo" : "Trabajador Inactivo"}</li>

                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        <FormAddUser dataWorker={dataWorker} />
                    </div>)
                }
                {isError && (
                    <p className="text-center">No se encontró ningún trabajador con la cédula ingresada</p>
                )}
            </div>
        </ProtectedRoute>
    );
}   