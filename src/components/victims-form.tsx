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
import Cookies from 'js-cookie';
import { gerency as gerencyOptions, actionsOptions, activities as activitiesOptions, countries } from "@/lib/utils"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "./ui/textarea"
import useLocation from "@/hooks/useLocation"
import { useMutation } from "@tanstack/react-query"
import api from "@/api/api_regiones"
import { format } from "date-fns"
import { useState } from "react"
import { Notification } from "./notification"

interface VictimsFormProps {
    gerency: string,
    action: string,
    activitie: string
}


const Schema = z.object({
    country_id: z.string().min(1, "Seleccione un país"),
    state_id: z.coerce.number(),
    municipality_id: z.coerce.number(),
    parish_id: z.coerce.number(),
    collection_method: z.string().min(1, "Seleccione un método de captación"),
    received: z.string().min(1, "Seleccione un recibidor"),
    age: z.coerce.number().int().positive("Ingrese una edad válida").min(1, "Ingrese una edad válida").max(120, "Ingrese una edad válida"),
    observation: z.string().max(1000, "Máximo 1000 caracteres."),
})

const defaultValues = {
    country_id: "",
    state_id: 0,
    municipality_id: 0,
    parish_id: 0,
    collection_method: "",
    received: "",
    age: 0,
    observation: "",
}

export default function VictimsForm({ gerency, action, activitie }: VictimsFormProps) {
    const [showNotification, setShowNotification] = useState(false)
    const user = Cookies.get('user')
    const userLoggin = user ? JSON.parse(user) : null;
    const gerencyOption = gerencyOptions.find((option) => option.label === gerency);
    const gerency_id = gerencyOption ? gerencyOption.id : null;
    const actionOption = actionsOptions.find((option) => option.label === action);
    const action_id = actionOption ? actionOption.id : null;
    const form = useForm({
        resolver: zodResolver(Schema),
        defaultValues
    })
    const { state, municipality, parish } = useLocation(form.watch('state_id'), form.watch('municipality_id'));

    const othersData = {
        country_id: Number(form.getValues("country_id")),
        created_by: userLoggin.id,
        action_id,
        management_unit_id: gerency_id,
        activity_id: Number(activitie),
        hour: format(new Date(), "HH:mm:ss"),
        previously_scheduled: false,
        date: format(new Date(), "dd/MM/yyyy"),
        gender_id: 1,
    }

    const mutation = useMutation({
        mutationFn: async (data: z.infer<typeof Schema>) => {
            const response = await api.post('/archievement', { ...data, ...othersData });
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

                    {/* --------Pais de procedencia-------- */}
                    <FormField
                        control={form.control}
                        name="country_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Pais de procedencia</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem key={country.id} value={country.id.toString()}>
                                                {country.country}
                                            </SelectItem>
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
                  
                    {/* --------Forma de captación-------- */}
                    <FormField
                        control={form.control}
                        name="collection_method"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Método de captación</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* ------Recibida por------ */}

                    <FormField
                        control={form.control}
                        name="received"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Recibida por</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* --------Edad-------- */}
                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Edad</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --------Observaciones-------- */}
                    <FormField
                        control={form.control}
                        name="observation"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
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