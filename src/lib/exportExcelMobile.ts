import * as XLSX from "xlsx";
import { AttentionType, Disability, Ethnicity, MobileUnit, Service } from "./types";
import api from "@/api/api_regiones";

const columnMapping: { [key: string]: string } = {
    status: "Estatus",
    username: "Usuario",
    num_mobile_units: "N° de unidades móviles",
    num_ultrasounds: "N° de ultrasonidos",
    responsible: "Responsable",
    state: "Estado",
    municipality: "Municipio",
    parish: "Parroquia",
    approximate: "Pobladión atendida",
    place: "Lugar",
    logistical_support: "Apoyo logístico",
    observation1: "Observaciones 1",
    observation2: "Observaciones 2",
    date: "Fecha",
};

const propsIgnore = ['status_id','user_id','created_on','state_id', 'municipality_id', 'parish_id', 'dateFormatted'];


async function fetchAttentionTypeDetails(actividadId: string): Promise<AttentionType> {
    const response = await api.get(`/mobile_units/details/${actividadId}`);
    return response.data.data;
}

export async function handleExportExcelMobile(data: MobileUnit[], label: string) {
    // Obtener las claves de los datos, ignorando algunos campos
    const keys = Object.keys(data[0]).filter(key => !propsIgnore.includes(key));

    // Crear los encabezados en español
    const headers = keys.map(key => columnMapping[key] || key);

    // Obtener los detalles adicionales para cada actividad
    const detailsPromises = data.map(async (item: MobileUnit) => {
        const attentionTypes = await fetchAttentionTypeDetails(item.id.toString());
        return attentionTypes;
    });

    const details = await Promise.all(detailsPromises);

    // Crear los datos de la hoja de cálculo
    const wsData = [
        [...headers, "Servicios", "Discapacidades", "Etnias"], // Añadir encabezados para los detalles
        ...data.map((item: MobileUnit, index: number) => {
            const itemDetails = details[index];
            const disabilities = itemDetails.disability.map((detail: Disability) => `${detail.disability} (${detail.age_range})`).join(", ");
            const ethnicities = itemDetails.ethnicity.map((detail: Ethnicity) => `${detail.ethnicity} (${detail.age_range})`).join(", ");
            const services = itemDetails.service.map((detail: Service) => `${detail.service_type} (${detail.age_range})`).join(", ");
            return [...keys.map((key: string) => item[key]), services, disabilities, ethnicities];
        })
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, label);
    XLSX.writeFile(wb, `${label}.xlsx`);
}

