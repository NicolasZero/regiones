import { Atencion0800 } from "@/lib/types";
import {type_telephone_service } from "@/lib/utils";

interface ContentOfActivitiesProps {
    actividad: Atencion0800;
    achievements?: boolean;
}

export default function ContentOfAtencion0800({
    actividad,
    achievements,
}: ContentOfActivitiesProps) {
    
    const telephoneService = type_telephone_service.find((service) => service.id === actividad.type_telephone_service_id);

    return (
        <div className="p-4 bg-muted">
            <h3 className="font-semibold mb-2 text-xl">Información adicional:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <p>
                    <b>Estado:</b> {actividad.state}
                </p>
                <p>
                    <b>Municipio:</b> {actividad.municipality}
                </p>
                <p>
                    <b>Parroquia:</b> {actividad.parish}
                </p>
                <p>
                    <b>Atención brindada:</b> {telephoneService?.label}
                </p>
                <p>
                    <b>Gran mision venezuela mujer:</b> {actividad.great_mission}
                </p>
            </div>
            {achievements && (
                <p className="break-words whitespace-pre-wrap lg:max-w-screen-lg xl:max-w-screen-2xl mt-4">
                    <b>Observaciones: </b>
                    {actividad.observation}
                </p>
            )}
        </div>
    );
}