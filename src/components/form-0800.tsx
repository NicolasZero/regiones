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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { useMutation } from "@tanstack/react-query"
import api from "@/api/api_regiones"
import { gerency as gerencyOptions, actionsOptions, activities as activitiesOptions, type_telephone_service} from "@/lib/utils"
import { format } from "date-fns"
import Cookies from "js-cookie"
import { useState } from "react"
import useLocation from "@/hooks/useLocation"
import { Notification } from "./notification"

interface form0800Props {
    gerency: string,
    action: string,
    activitie: string
}


const Schema = z.object({
    state_id: z.coerce.number(),
    municipality_id: z.coerce.number(),
    parish_id: z.coerce.number(),
    type_telephone_service_id: z.coerce.number().int().min(1, "Seleccione una atención."),
    great_mission: z.string(),
    observation: z.string().max(1000, "Máximo 1000 caracteres."),
})

const defaultValues = {
    state_id: 0,
    municipality_id: 0,
    parish_id: 0,
    type_telephone_service_id: 0,
    great_mission: "",
    observation: "",
}

export default function Form0800({ gerency, action, activitie }: form0800Props) {
    const [showNotification, setShowNotification] = useState(false)
    const user = Cookies.get('user')
    const userLoggin = user ? JSON.parse(user) : null;
    const gerencyOption = gerencyOptions.find((option) => option.label === gerency);
    const gerency_id = gerencyOption ? gerencyOption.id : null;
    const actionOption = actionsOptions.find((option) => option.label === action);
    const action_id = actionOption ? actionOption.id : null;

    const othersData = {
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

    const form = useForm({
        resolver: zodResolver(Schema),
        defaultValues
    })

    const { state, municipality, parish } = useLocation(form.watch('state_id'), form.watch('municipality_id'));

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



                    {/* --------Atencion brindada-------- */}
                    <FormField
                        control={form.control}
                        name="type_telephone_service_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Atencion brindada</FormLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                       {type_telephone_service.map((service) => (
                                            <SelectItem key={service.id} value={String(service.id)}>{service.label}</SelectItem>
                                        ))
                                       }
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --------Gran mision venezuela mujer-------- */}
                    <FormField
                        control={form.control}
                        name="great_mission"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Gran misión venezuela mujer</FormLabel>
                                <FormControl>
                                    <Input placeholder="..." {...field} />
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
                            <FormItem className="col-span-12 md:col-span-3 ">
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