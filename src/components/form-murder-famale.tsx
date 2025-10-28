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
import useLocation from "@/hooks/useLocation"
import { gerency as gerencyOptions, actionsOptions, activities as activitiesOptions, rangeOfAge, killerStatus, type_femicide, type_weapon } from "@/lib/utils"
import { useState } from "react"
import Cookies from 'js-cookie'
import { format } from "date-fns"
import { useMutation } from "@tanstack/react-query"
import api from "@/api/api_regiones"
import { Notification } from "./notification"

interface MurderFemaleProps {
    gerency: string,
    action: string,
    activitie: string
}


const Schema = z.object({
    state_id: z.coerce.number(),
    municipality_id: z.coerce.number(),
    parish_id: z.coerce.number(),
    age_range_id: z.coerce.number().int().min(1, "Seleccione un rango."),
    type_weapon_id: z.coerce.number().int().min(1, "Seleccione un tipo de arma."),
    type_femicide_id: z.coerce.number().int().min(1, "Seleccione un tipo de femicidio."),
    killer_status_id: z.coerce.number().int().min(1, "Seleccione un estatus."),
    observation: z.string().max(1000, "Máximo 1000 caracteres."),
})

const defaultValues = {
    state_id: 0,
    municipality_id: 0,
    parish_id: 0,
    age_range_id: 0,
    type_weapon_id: 0,
    type_femicide_id: 0,
    killer_status_id: 0,
    observation: "",
}

export default function MurderFemaleForm({ gerency, action, activitie }: MurderFemaleProps) {
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


                    {/* --------Rango de edad-------- */}
                    <FormField
                        control={form.control}
                        name="age_range_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Rango de edad</FormLabel>
                                <Select onValueChange={field.onChange} value={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {rangeOfAge.map((range) => (
                                            <SelectItem key={range.id} value={String(range.id)}>{range.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --------Tipo de arma-------- */}
                    <FormField
                        control={form.control}
                        name="type_weapon_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Tipo de arma</FormLabel>
                                <Select onValueChange={field.onChange} value={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {type_weapon.map((weapon) => (
                                            <SelectItem key={weapon.id} value={String(weapon.id)}>{weapon.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ------Tipo de femicidio------ */}
                    <FormField
                        control={form.control}
                        name="type_femicide_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Tipo de femicidio</FormLabel>
                                <Select onValueChange={field.onChange} value={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {type_femicide.map((femicide) => (
                                            <SelectItem key={femicide.id} value={String(femicide.id)}>{femicide.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* --------Estatus-------- */}
                    <FormField
                        control={form.control}
                        name="killer_status_id"
                        render={({ field }) => (
                            <FormItem className="col-span-12 md:col-span-1 ">
                                <FormLabel>Estatus</FormLabel>
                                <Select onValueChange={field.onChange} value={String(field.value)}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {killerStatus.map((status) => (
                                            <SelectItem key={status.id} value={String(status.id)}>{status.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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