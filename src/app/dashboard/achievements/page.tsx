"use client"

import api from "@/api/api_regiones";
import ProtectedRoute from "@/components/protected-route";
import { TableUI as AchievementsTable } from "@/components/schedule-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Agenda, MobileUnit } from "@/lib/types";
import Filters from "@/components/filters";


export default function Page() {
  const [actividad, setActividad] = useState<Agenda[]>([]);
  const [initialData, setInitialData] = useState<Agenda[]>([]);

// Llamada a la API para obtener los datos de los logros
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      api.get("/archievement").then((res) => res.data.data),
  })

  // Actualizar el estado actividad con los datos de la API
  useEffect(() => {
    if (!data) {
      return 
    } else {
      setActividad(data);
      setInitialData(data);
    }

  }, [data]);


  const columnas = [{
    label: 'ID',
    campo: 'id'
  },
  {
    label: 'Usuario',
    campo: 'username'
  },
  {
    label: 'Actividad',
    campo: 'type_activity'
  },
  {
    label: 'Fecha',
    campo: 'date'
  },
  {
    label: 'Estatus',
    campo: 'status_id'
  }
  ]
  return (
    <ProtectedRoute>
      <>
        <h1 className="text-3xl font-bold text-center mb-2">Logros</h1>
        <Filters initialData={initialData} setActividad={setActividad} actividad={actividad} data={data} achievements/>
        <AchievementsTable columnas={columnas} achievements data={actividad} errorData={error} isLoading={isLoading} setData={(data: Agenda[] | MobileUnit[]) => setActividad(data as Agenda[])} />
      </>
    </ProtectedRoute>
  );
}
