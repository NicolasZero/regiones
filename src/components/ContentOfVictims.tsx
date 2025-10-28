import { Victims } from "@/lib/types";
import { countries } from "@/lib/utils";

interface ContentOfActivitiesProps {
    actividad: Victims;
    achievements?: boolean;
}

export default function ContentOfVictims({
    actividad,
    achievements,
}: ContentOfActivitiesProps) {
    const country = countries.find((country) => country.id === actividad.country_id);

    return (
        <div className="p-4 bg-muted">
            <h3 className="font-semibold mb-2 text-xl">Información adicional:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <p>
                    <b>Pais de procedencia:</b> {country?.country}
                </p>
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
                    <b>Método de captación:</b> {actividad.collection_method}
                </p>
                <p>
                    <b>Ricibida por:</b> {actividad.received}
                </p>
                <p>
                    <b>Edad:</b> {actividad.age}
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