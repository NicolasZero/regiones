"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {  z } from "zod"

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
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { cn } from "@/lib/utils"
import { format, set } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "./ui/calendar"
import { places } from "@/lib/utils"
import { Notification } from "./notification"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import api from "@/api/api_regiones"
import useLocation from "@/hooks/useLocation"
import { gerency as gerencyOptions, actionsOptions, activities as activitiesOptions } from "@/lib/utils"
import Cookies from "js-cookie"

interface ActivitiesCommonsFormProps {
    gerency: string,
    action: string,
    activitie: string
}

// Esquema base
const Schema = z.object({
    specify: z.string().max(100, "Máximo 100 caracteres."),
    state_id: z.coerce.number(),
    municipality_id: z.coerce.number(),
    parish_id: z.coerce.number(),
    place_id: z.coerce.number(),
    n_womans: z.coerce.number().int().positive("Ingrese una cantidad válida").min(1, "Ingrese una cantidad válida"),
    n_man: z.coerce.number(),
    responsible: z.string({ required_error: "Por favor indique un responsable." }).min(1, { message: "Este campo no puede estar vacío." }).max(30, "Máximo 30 caracteres."),
    phone_number: z.string().regex(/^(0414|0424|0416|0426|0412|0212)\d{7}$/, "Por favor ingrese un número de teléfono válido."),
    observation: z.string().max(1000, "Máximo 1000 caracteres."),
    date: z.date({
        required_error: "Ingrese una fecha de ejecución.",
    }),
})


const defaultValues = {
    state_id: 0,
    municipality_id: 0,
    parish_id: 0,
    place_id: 0,
    specify: "",
    n_womans: 0,
    n_man: 0,
    responsible: "",
    phone_number: "",
    observation: "",
}

export default function ActivitiesCommonsForm({ gerency, action, activitie }: ActivitiesCommonsFormProps) {
    const [showNotification, setShowNotification] = useState(false)
    const user = Cookies.get('user')
    const userLoggin = user ? JSON.parse(user) : null;
    const gerencyOption = gerencyOptions.find((option) => option.label === gerency);
    const gerency_id = gerencyOption ? gerencyOption.id : null;
    const actionOption = actionsOptions.find((option) => option.label === action);
    const action_id = actionOption ? actionOption.id : null;
   

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues
    })
    const { state, municipality, parish } = useLocation(form.watch('state_id'), form.watch('municipality_id'));

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof Schema>) => {
            const response = await api.post('/archievement', { ...data, created_by: userLoggin.id, action_id, management_unit_id: gerency_id, activity_id: activitie, status: "Completada" ,hour: format(new Date(), "HH:mm:ss"), previously_scheduled: false });
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
            {showNotification && <Notification message="Actividad registrada con éxito" />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 lg:grid-cols-4 lg:gap-4">

                    {/* ------Estado------- */}
                    <FormField
                        control={form.control}
                        name="state_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Estado</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="" />
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
                        name="municipality_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Municipio</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)} disabled={form.watch("state_id") === 0} >
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
                        name="parish_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Parroquia</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)} disabled={form.watch("state_id") === 0}>
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
                        name="place_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Lugar</FormLabel>
                                <Select onValueChange={field.onChange} value={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="0">Seleccione</SelectItem>
                                        {places.map((place) => (
                                            <SelectItem key={place.id} value={String(place.id)}>{place.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------Especifique------- */}
                    <FormField
                        control={form.control}
                        name="specify"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Otro (Especifique)</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------N° de mujeres------- */}
                    <FormField
                        control={form.control}
                        name="n_womans"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Número de mujeres</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------------N° de hombres------- */}
                    <FormField
                        control={form.control}
                        name="n_man"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Número de hombres</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." type="number" {...field} />
                                </FormControl>
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

                    {/* -------Telefono------- */}
                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* -------Fecha------- */}
                    <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Fecha de ejecución</FormLabel>
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
                                                const sevenDaysBefore = new Date(today);
                                                sevenDaysBefore.setDate(today.getDate() - 7); // Solo 7 días antes de la fecha actual
                                                return date < sevenDaysBefore || date > today;
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="observation"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-2 ">
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

                    <Button type="submit" disabled={mutation.isLoading} className="col-span-12 md:col-span-4 justify-self-center w-full md:w-2/4 mt-2">Enviar</Button>

                </form>
            </Form>
        </>
    )
}