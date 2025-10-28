"use client";
import api from "@/api/api_regiones";
import ProtectedRoute from "@/components/protected-route";
import { TableUI as ScheduleTable } from "@/components/schedule-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import CookieS from 'js-cookie';
import { Agenda, MobileUnit } from "@/lib/types";
import Filters from "@/components/filters";


export default function SchedulePage() {
  const user = CookieS.get('user')
  const userLoggin = user ? JSON.parse(user) : null;
  const adminLogged = userLoggin.role_id === 1;

  const [actividad, setActividad] = useState<Agenda[]>([]);
  const [initialData, setInitialData] = useState<Agenda[]>([]);


  const { data } = useQuery({
    queryKey: ["dataSchedule"],
    queryFn: async () => {
      if (adminLogged) {
        return await api.get("/schedule").then((res) => res.data.data)
      }
      return await api.get(`/schedule/user/${userLoggin?.id}`).then((res) => res.data.data)
    
    },
    

  });

  useEffect(() => {
    if (!data) {
      return
    } else {
      setActividad(data);
      setInitialData(data);
    }

  }, [data]);

  const columnas = [
    {
      label: "ID",
      campo: "id",
    },
    {
      label: "Usuario",
      campo: "username",
    },
    {
      label: "Actividad agendada",
      campo: "type_activity",
    },
    {
      label: "Fecha agendada",
      campo: "date",
    },
    {
      label: "Estatus",
      campo: "status_id",
    },
  ];

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-3xl font-bold text-center mb-8">
          Agenda de actividades
        </h1>

        <Filters initialData={initialData} setActividad={setActividad} actividad={actividad} data={data} labelPDF={"Reporte de actividades agendadas"} />
            <ScheduleTable
              columnas={columnas}
              viewUser
              setData={(data: Agenda[] | MobileUnit[]) => setActividad(data as Agenda[])}
              data={actividad}
            />
  
      </div>
    </ProtectedRoute>
  );
}
