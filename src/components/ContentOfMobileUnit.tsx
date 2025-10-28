import { MobileUnit} from "@/lib/types";
import { useAttentionTypeDetails } from "@/hooks/useAttentionTypeDetail";

interface ContentOfMobileUnitProps {
  actividad: MobileUnit;
  achievements?: boolean;
}

export default function ContentOfMobileUnit({
  actividad,
  achievements,
}: ContentOfMobileUnitProps) {

  const { attentionTypes } = useAttentionTypeDetails(actividad.id.toString());

  return (
    <div className="p-4 bg-muted">
      <h3 className="font-semibold mb-2 text-xl">Información adicional:</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <p>
          <b>Usuario:</b> {actividad.username}
        </p>
        <p>
          <b>Estatus:</b> {actividad.status}
        </p>
        <p>
          <b>Unidades Móviles Requeridas:</b> {actividad.num_mobile_units}
        </p>
        <p>
          <b>Ultrasonidos Requeridos:</b> {actividad.num_ultrasounds}
        </p>
        <p>
          <b>Apoyo Logístico:</b> {actividad.logistical_support}
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
          <b>Lugar:</b> {actividad.place}
        </p>
        <p>
          <b>Responsable:</b> {actividad.responsible}
        </p>
        <p>
          <b>Población Atendida:</b> {actividad.approximate}
        </p>
      </div>
      {!achievements && (
        <p className="break-words whitespace-pre-wrap lg:max-w-screen-lg xl:max-w-screen-2xl mt-4">
          <b>Observaciones de agenda: </b>
          {actividad.observation1}
        </p>
      )}
      <p className="break-words whitespace-pre-wrap lg:max-w-screen-lg xl:max-w-screen-2xl mt-4">
        <b>Observaciones de ejecución: </b>
        {actividad.observation2}
      </p>
      <div className="mt-4">
        <h4 className="font-semibold mb-2">Tipos de Atención:</h4>
        {attentionTypes && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h5 className="font-semibold">Servicios:</h5>
              {attentionTypes.service?.map((service, index) => (
                <div key={index} className="mb-4">
                  <p>
                    <b>Tipo:</b> {service.service_type}
                  </p>
                  <p>
                    <b>Rango de Edad:</b> {service.age_range} 
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h5 className="font-semibold">Discapacidades:</h5>
              {attentionTypes.disability?.map((disability, index) => (
                <div key={index} className="mb-4">
                  <p>
                    <b>Tipo:</b> {disability.disability}
                  </p>
                  <p>
                    <b>Rango de Edad:</b> {disability.age_range}
                  </p>
                </div>
              ))}
            </div>
            <div>
              <h5 className="font-semibold">Etnias:</h5>
              {attentionTypes.ethnicity?.map((ethnicity, index) => (
                <div key={index} className="mb-4">
                  <p>
                    <b>Tipo:</b> {ethnicity.ethnicity}
                  </p>
                  <p>
                    <b>Rango de Edad:</b> {ethnicity.age_range}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
