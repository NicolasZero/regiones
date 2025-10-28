"use client"
import api from "@/api/api_regiones";
import Filters from "@/components/filters";
import ProtectedRoute from "@/components/protected-route";
import { TableUI as UnitMobileTable } from "@/components/schedule-table";
import { Agenda, MobileUnit } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import CookieS from 'js-cookie';
import { useEffect, useState } from "react";


export default function ScheduleMobileUnitsPage() {
    const [mobile_units, setMobile_units] = useState<MobileUnit[]>([]);
    const [initialData, setInitialData] = useState<MobileUnit[]>([]);

    const user = CookieS.get('user')
    const userLoggin = user ? JSON.parse(user) : null;
    const adminLogged = userLoggin?.role_id === 1;

    const { data } = useQuery({
        queryKey: ["dataMobileUnits"],
        queryFn: async () => {
            if (adminLogged) {
                return await api.get("/mobile_units").then((res) => res.data.data)
            }
            return await api.get(`/mobile_units/user/${userLoggin.id}`).then((res) => res.data.data)
        },
    });

    useEffect(() => {
        if (!data) {
            return
        } else {
            setMobile_units(data);
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
            <div>
                <h1 className="text-3xl font-bold text-center mb-8">Agenda de unidades móviles</h1>
                <Filters initialData={initialData} setActividadMobile={setMobile_units} actividad={mobile_units} data={data} labelPDF="Reporte de unidades móviles" mobileUnits/>
            
                    <UnitMobileTable viewUser columnas={columnas} data={mobile_units} mobileUnits  setData={(data: Agenda[] | MobileUnit[]) => setMobile_units(data as MobileUnit[])} />
               
            </div>
        </ProtectedRoute>
    );
}