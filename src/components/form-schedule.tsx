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
import { gerency as gerencyOptions, actionsOptions, activities as activitiesOptions } from "@/lib/utils"
import { places } from "@/lib/utils"
import useActivitieOptions from "@/hooks/useActivitieOptions"
import Cookies from "js-cookie"
import useLocation from "@/hooks/useLocation"
import { useMutation } from "@tanstack/react-query"
import api from "@/api/api_regiones"
import { useState } from "react"
import { Notification } from "./notification"
import { Textarea } from "./ui/textarea"


// Esquema base
const Schema = z.object({
    gerency: z.string().min(1, { message: "Seleccione una gerencia." }),
    action: z.string().min(1, { message: "Seleccione un acción." }),
    activitie: z.string().min(1, { message: "Seleccione una actividad." }),
    state_id: z.coerce.number(),
    municipality_id: z.coerce.number(),
    parish_id: z.coerce.number(),
    place: z.string(),
    responsible: z.string({ required_error: "Por favor indique un responsable." }).min(1, { message: "Este campo no puede estar vacío." }).max(30, "Máximo 30 caracteres."),
    observation_scheduled: z.string().max(1000, "Máximo 1000 caracteres."),
    date: z.date({
        required_error: "Ingrese una fecha para agendar.",
    }),
})


const defaultValues = {
    gerency: "",
    action: "",
    activitie: "",
    state_id: 0,
    municipality_id: 0,
    parish_id: 0,
    place: "",
    responsible: "",
    observation_scheduled: "",

}

export default function ScheduleForm() {

    const [showNotification, setShowNotification] = useState(false)

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues
    })

    const { state, municipality, parish } = useLocation(form.watch('state_id'), form.watch('municipality_id'));
    const user = Cookies.get('user')
    const userLoggin = user ? JSON.parse(user) : null;
    const gerencyOption = gerencyOptions.find((option) => option.label === form.watch("gerency"));
    const management_unit_id = gerencyOption ? gerencyOption.id : null;
    const actionOption = actionsOptions.find((option) => option.label === form.watch("action"));
    const action_id = actionOption ? actionOption.id : null;

    const otherData = {
        created_by: userLoggin.id,
        status_id: 2,
        n_womans: 0,
        n_man: 0,
        action_id,
        management_unit_id,
        activity_id: Number(form.getValues("activitie")),
        hour: format(new Date(), "HH:mm:ss"),
        place_id: Number(form.getValues("place")),
        previously_scheduled: true,
    }


    const { activitieOption } = useActivitieOptions(form.watch('action'))

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof Schema>) => {
            const response = await api.post('/archievement', { ...data, ...otherData });
            return response.data;
        },
    })

    function onSubmit(data: z.infer<typeof Schema>) {
        // form.reset(defaultValues)
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
                    console.log({...data, ...otherData});
                }
            }
        )
    }


    return (
        <>
            {showNotification && <Notification message="Actividad agendada" />}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2 lg:grid-cols-4 lg:gap-4">

                    {/* ------Gerencia------- */}
                    <FormField
                        control={form.control}
                        name="gerency"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Gerencia</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {gerencyOptions.map((gerencia) => (
                                            <SelectItem key={gerencia.id} value={gerencia.label}>{gerencia.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------Acción------- */}
                    <FormField
                        control={form.control}
                        name="action"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Acción</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {actionsOptions.map((action) => (
                                            <SelectItem key={action.id} value={action.label}>{action.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------Actividad------- */}
                    <FormField
                        control={form.control}
                        name="activitie"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Actividad</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {activitieOption?.map((activity) => (
                                            activity.id === 5 || activity.id === 6 || activity.id === 16
                                                ? null
                                                : <SelectItem key={activity.id} value={String(activity.id)}>{activity.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

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
                        name="municipality_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Municipio</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)} disabled={form.watch("state_id") === 0}>
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
                                            <SelectItem key={place.id} value={String(place.id)}>{place.label}</SelectItem>
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
    
                    {/* --------Observación------- */}<FormField
                        control={form.control}
                        name="observation_scheduled"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-3 ">
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