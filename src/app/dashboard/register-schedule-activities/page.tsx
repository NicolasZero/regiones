"use client"

import ScheduleForm from "@/components/form-schedule";
import ProtectedRoute from "@/components/protected-route";

export default function SchedulePage() {

    const date = new Date().toLocaleDateString();
    const day = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
    const habilitado = true

    return (
        <ProtectedRoute>
        <div>
            <h1 className="text-3xl font-bold text-center mb-8">Agenda de actividades</h1>
            <p className="mb-4">Fecha: {day} {date} </p>
            {!habilitado && (
                <>
                    <h2 className="text-center text-2xl">Atención:</h2>
                    <p className="text-red-600 text-center">El módulo de agenda solo está disponible los días martes y miercoles</p>
                </>
            )}

            {habilitado && <ScheduleForm />}
        </div>
        </ProtectedRoute> 
    );
}
