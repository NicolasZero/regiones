"use client"

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

import { Textarea } from "@/components/ui/textarea"
import { useUpdateActivitie } from "@/context/updateActivitie"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useMutation } from "@tanstack/react-query"
import api from "@/api/api_regiones"
import { useState } from "react"
import { Notification } from "./notification"

interface completeScheduleModalProps {
    id: number;
}

// Esquema base
const Schema = z.object({
    status_id: z.string().min(1, { message: "Seleccione una acción." }),
    n_womans: z.coerce.number().int(),
    n_man: z.coerce.number().int(),
    observation: z.string().max(1000, "Máximo 1000 caracteres."),
});


const defaultValues = {
    status_id: "",
    n_womans: 0,
    n_man: 0,
    observation: "",
}

export default function CompleteActivitieSchedule({ id }: completeScheduleModalProps) {
    const [showNotification, setShowNotification] = useState(false)


    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues
    })

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof Schema>) => {
            const response = await api.put('/schedule', { ...data, id, status_id: parseInt(data.status_id) });
            return response.data;
        },
    })

    function onSubmit(data: z.infer<typeof Schema>,) {
        setShowNotification(false)
        mutation.mutate(data,
            {
                onSuccess: () => {
                    form.reset(defaultValues)
                    setShowNotification(true)
                    const tempo = setTimeout(() => {
                        window.location.reload();
                        clearTimeout(tempo);
                      }, 1500);
                    console.log('Datos enviados con éxito');
                },
                onError: () => {
                    console.error('Error al enviar los datos');
                }
            }
        )
    }
    return (
        <>
            {showNotification && <Notification message="Se ha completado la actividad." />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 lg:grid-cols-4 lg:gap-4">

                    <FormField
                        control={form.control}
                        name="status_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-4 ">
                                <FormLabel>Estatus</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="1">Completada</SelectItem>
                                        <SelectItem value="3">No completada</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* ------N° de mujeres------- */}
                    {form.watch("status_id") === "1" && (
                        <FormField
                        control={form.control}
                        name="n_womans"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-4 ">
                                <FormLabel>Número de mujeres</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." type="number" {...field} pattern="^[1-9]\d*$" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />)}
                    

                    {/* ------------N° de hombres------- */}
                    {form.watch("status_id") === "1" && (
                         <FormField
                         control={form.control}
                         name="n_man"
                         render={({ field }) => (
                             <FormItem className="col-span-12 md:col-span-4 ">
                                 <FormLabel>Número de hombres</FormLabel>
                                 <FormControl>
                                     <Input placeholder="..." type="number" {...field} pattern="^[1-9]\d*$" />
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                         )}
                     />)}
                   

                    {/* -------Fecha------- */}
                    {/* <FormField
                    control={form.control}
                    name="dateFinished"
                    render={({ field }) => (
                        <FormItem className="col-span-12 md:col-span-4 ">
                            <FormLabel>Fecha de ejecución</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value &&
                                                "text-black dark:text-dark-foreground dark:border-dark-foreground",
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "dd/MM/yyyy")
                                            ) : (
                                                <span>Seleccion una fecha</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) => {
                                            const today = new Date();
                                            const endOfYear = new Date(today.getFullYear(), 11, 31); // 31 de diciembre del año actual
                                            return date < today || date > endOfYear;
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}

                    <FormField
                        control={form.control}
                        name="observation"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-4 ">
                                <FormLabel>Observaciones</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Escriba sus observaciones aquí..."
                                        className="resize w-full h-24"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="col-span-12 md:col-span-4 justify-self-center w-full md:w-2/4 mt-2" disabled={form.watch("n_womans") <= 0}>Enviar</Button>

                </form>
            </Form>
        </>
    )
}