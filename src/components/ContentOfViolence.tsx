import { Violence } from "@/lib/types";
import { rangeOfAge, type_weapon, type_femicide, killerStatus as killerStatusOptions } from "@/lib/utils";

interface ContentOfActivitiesProps {
    actividad: Violence;
    achievements?: boolean;
}

export default function ContentOfViolence({
    actividad,
    achievements,
}: ContentOfActivitiesProps) {
    const ageOfRange = rangeOfAge.find((range) => range.id === actividad.age_range_id);
    const typeOfWeapon = type_weapon.find((weapon) => weapon.id === actividad.type_weapon_id);
    const typeOfFemicide = type_femicide.find((femicide) => femicide.id === actividad.type_femicide_id);
    const killerStatus = killerStatusOptions.find((status) => status.id === actividad.killer_status_id);

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
                    <b>Rango de edad:</b> {ageOfRange?.label}
                </p>
                <p>
                    <b>Tipo de arma:</b> {typeOfWeapon?.label}
                </p>
                <p>
                    <b>Tipo de femicidio:</b> {typeOfFemicide?.label}
                </p>
                <p>
                    <b>Estatus del atacante:</b> {killerStatus?.label}
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