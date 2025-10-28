import { Agenda } from "@/lib/types";

interface ContentOfActivitiesProps {
  actividad: Agenda;
  achievements?: boolean;
}

export default function ContentOfActivities({
  actividad,
}: ContentOfActivitiesProps) {
  return (
    <div className="p-4 bg-muted">
      <h3 className="font-semibold mb-2 text-xl">Información adicional:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <p>
          <b>Gerencia:</b> {actividad.management_unit}
        </p>
        <p>
          <b>Tipo de acción:</b> {actividad.type_action}
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
          <b>Responsable:</b> {actividad.responsible}
        </p>
        <p>
          <b>Lugar:</b> {actividad.place}
        </p>
        <p>
          <b>N° de mujeres:</b> {actividad.n_womans}
        </p>
        <p>
          <b>N° de hombres:</b> {actividad.n_man}
        </p>
      </div>

      <p className="break-words whitespace-pre-wrap lg:max-w-screen-lg xl:max-w-screen-2xl mt-4">
        <b>Observaciones de agenda: </b>
        {actividad.observation_schedule}
      </p>

      <p className="break-words whitespace-pre-wrap lg:max-w-screen-lg xl:max-w-screen-2xl mt-4">
        <b>Observaciones: </b>
        {actividad.observation}
      </p>


    </div>
  );
}
