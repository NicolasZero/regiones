"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { useUpdateActivitie } from "@/context/updateActivitie";
import DynamicForm from "./dynamic-form-mobile-unit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { FormData } from "@/lib/types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "@/api/api_regiones";
import { Notification } from "./notification";

interface completeScheduleModalProps {
  id: number;
}

// Esquema base
const Schema = z.object({
  status: z.string().min(1, { message: "Seleccione un acción." }),
  obs2: z.string().max(1000, "Máximo 1000 caracteres."),
});

const defaultValues = {
  obs2: "",
  status: "",
};

export default function CompleteMobileUnitSchedule({
  id,
}: completeScheduleModalProps) {
  const { isUpdated, setIsUpdated } = useUpdateActivitie();
  const [showNotification, setShowNotification] = useState(false);
  let disabledBtn = isUpdated;
  const [formData, setFormData] = useState<FormData>({
    attentionTypes: [],
  })


  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues,
  });

  const disable = () => {
    if (form.watch("status") === "No completada") {
      return false;
    }

    if (formData.attentionTypes.length === 0) return true;
 
    if(formData.attentionTypes.some((attentionType) => attentionType.type === 0 || attentionType.ageRanges.length === 0 || attentionType.ageRanges.some((ageRange) => ageRange.range === 0 || ageRange.women === 0 && ageRange.men === 0))) return true;

    // if(formData.attentionTypes.some((attentionType) => attentionType.disabilities.length === 0 || attentionType.disabilities.some((disability) => disability.ageRanges.length === 0 || disability.ageRanges.some((ageRange) => ageRange.range === 0 || ageRange.women === 0 && ageRange.men === 0)))) return true;

    if(formData.attentionTypes.some((attentionType) => attentionType.ethnicities.length === 0 || attentionType.ethnicities.some((ethnicitie) => ethnicitie.ageRanges.length === 0 || ethnicitie.ageRanges.some((ageRange) => ageRange.range === 0 || ageRange.women === 0 && ageRange.men === 0)))) return true;

    return false;
  }

  disabledBtn = disable();

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof Schema>) => {
      const response = await api.post('/mobile_units/details', { ...data, ...formData, id });
      return response.data;
    },
  })

  function onSubmit(data: z.infer<typeof Schema>) {

    setShowNotification(false)
    mutation.mutate(data,
      {
        onSuccess: () => {
          form.reset(defaultValues)
          setFormData({ attentionTypes: [] })
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
      {showNotification && <Notification message="Datos de unidad móvil registrada con éxito" />}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-2 md:grid-cols-4 lg:gap-4"
        >


          <FormField
            control={form.control}
            name="status"
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
                    <SelectItem value="Completada">Completada</SelectItem>
                    <SelectItem value="No completada">No completada</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {form.watch("status") === "Completada" && (<div className="col-span-12 md:col-span-4">
            <DynamicForm formData={formData} setFormData={setFormData}></DynamicForm>
          </div>)}


          <FormField
            control={form.control}
            name="obs2"
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

          <Button
            type="submit"
            className="col-span-12 md:col-span-4 justify-self-center w-full md:w-2/4 mt-2"
            disabled={disabledBtn}
          >
            Enviar
          </Button>
        </form>
      </Form>
    </>
  );
}
