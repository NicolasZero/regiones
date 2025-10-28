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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Textarea } from "./ui/textarea"
import useLocation from "@/hooks/useLocation"
import { useState } from "react"
import Cookies from "js-cookie"
import { places } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import api from "@/api/api_regiones"
import { Notification } from "./notification"

// Esquema base
const Schema = z.object({
    cantMobileUnitsRequired: z.coerce.number().min(1, { message: "Indique cantidad" }),
    cantUltrasoundRequired: z.coerce.number().min(1, { message: "Indique cantidad" }),
    logisticalSupport: z.string().min(1, { message: "Seleccione una actividad." }),
    state: z.coerce.number(),
    municipality: z.coerce.number(),
    parish: z.coerce.number(),
    place: z.string(),
    responsible: z.string({ required_error: "Por favor indique un responsable." }).min(1, { message: "Este campo no puede estar vacío." }).max(30, "Máximo 30 caracteres."),
    obs: z.string().max(300, "Máximo 300 caracteres."),
    approximate: z.coerce.number().int().min(1, "Ingrese una cantidad aprox."),
    date: z.date({
        required_error: "Ingrese una fecha para agendar.",
    }),
})


const defaultValues = {
    cantMobileUnitsRequired: 0,
    cantUltrasoundRequired: 0,
    logisticalSupport: "",
    state: 0,
    municipality: 0,
    parish: 0,
    place: "",
    responsible: "",
    obs: "",

}

export default function ScheduleMobileUnitsForm() {
    const [showNotification, setShowNotification] = useState(false)
    const user = Cookies.get('user')
    const userLoggin = user ? JSON.parse(user) : null;

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues
    })

    const { state, municipality, parish } = useLocation(form.watch('state'), form.watch('municipality'));

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof Schema>) => {
            const response = await api.post('/mobile_units/', { ...data, id: userLoggin.id, });
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
                onError: () => {
                    console.error('Error al enviar los datos');
                }
            }
        )

    }


    return (
        <> 
            {showNotification && <Notification message="Unidad movil registrada con éxito" />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 lg:grid-cols-4 lg:gap-4">

                    {/* ------Unidades moviles solicitadas------ */}
                    <FormField
                        control={form.control}
                        name="cantMobileUnitsRequired"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>N° de unidades móviles solicitadas</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* ------Cantidad ecografos solicitados------- */}
                    <FormField
                        control={form.control}
                        name="cantUltrasoundRequired"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>N° de ecografos solicitados</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------Apoyo logistico------- */}
                    <FormField
                        control={form.control}
                        name="logisticalSupport"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Apoyo logistico estado/municipio</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Viáticos">Viáticos</SelectItem>
                                        <SelectItem value="Combustible">Combustible</SelectItem>
                                        <SelectItem value="Hospedaje">Hospedaje</SelectItem>
                                        <SelectItem value="Alimentación del chofer asignado">Alimentación del chofer asignado</SelectItem>
                                        <SelectItem value="Traslado de la unidad">Traslado de la unidad</SelectItem>
                                        <SelectItem value="Todas las anteriores">Todas las anteriores</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                     {/* ------Estado------- */}
                     <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Estado</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {state.map((state: { id: number, state: string }) => (
                                            <SelectItem key={state.id} value={String(state.id)}>{state.state}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------Municipio------- */}

                    <FormField
                        control={form.control}
                        name="municipality"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Municipio</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)} disabled={form.watch("state") === 0}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">Seleccione</SelectItem>
                                        {municipality.map((municipality: { id: number, municipality: string }) => (
                                            <SelectItem key={municipality.id} value={String(municipality.id)}>{municipality.municipality}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------Parroquia------- */}

                    <FormField
                        control={form.control}
                        name="parish"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Parroquia</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)} disabled={form.watch("state") === 0}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">Seleccione</SelectItem>
                                        {parish.map((parish: { id: number, parish: string }) => (
                                            <SelectItem key={parish.id} value={String(parish.id)}>{parish.parish}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------Lugar------- */}
                    <FormField
                        control={form.control}
                        name="place"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Lugar</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {places.map((place) => (
                                            <SelectItem key={place.id} value={String(place.label)}>{place.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --------Responsable------- */}
                    <FormField
                        control={form.control}
                        name="responsible"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Responsable</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="approximate"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Población atendida aprox</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --------Fecha------- */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Fecha a agendar</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal dark:bg-dark dark:border-white",
                                                    !field.value &&
                                                    "text-black dark:text-dark-foreground dark:border-dark-foreground",
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "MM/dd/yyyy")
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
                                            }
                                            }
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --------Observaciones------- */}
                    <FormField
                        control={form.control}
                        name="obs"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-2 ">
                                <FormLabel>Observaciones</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="..." {...field} className="h-40" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={mutation.isLoading} className="col-span-12 md:col-span-4 justify-self-center w-full md:w-2/4 mt-2">Enviar</Button>

                </form>
            </Form>
        </>
    )
}  