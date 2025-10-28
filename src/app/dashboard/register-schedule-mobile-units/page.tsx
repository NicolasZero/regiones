"use client"

import ScheduleMobileUnitsForm from "@/components/form-schedule-mobile-units";
import ProtectedRoute from "@/components/protected-route";

export default function SchedulePage() {

    const date = new Date().toLocaleDateString();
    const day = new Date().toLocaleDateString('es-ES', { weekday: 'long' });
    const habilitado = true

    return (
        <ProtectedRoute>
            <div>
                <h1 className="text-3xl font-bold text-center mb-8">Agenda de unidades móviles</h1>
                <p className="mb-4">Fecha: {day} {date} </p>
                {!habilitado && (
                    <>
                        <h2 className="text-center text-2xl">Atención:</h2>
                        <p className="text-red-600 text-center">El módulo de agenda solo está disponible los días miercoles y jueves</p>
                    </>
                )}

                {habilitado && <ScheduleMobileUnitsForm />}
            </div>
        </ProtectedRoute>
    );
}
