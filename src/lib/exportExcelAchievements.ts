import { countries } from './utils';
import * as XLSX from 'xlsx';
import { Agenda } from './types';

function handleExportExcel(
    date_start: string | undefined,
    date_end: string | undefined,
    filterActividades: Agenda[] | undefined,
    dataInitial: Agenda[] |undefined,
    titleReport: string,
    activity: string
) {
    const wb = XLSX.utils.book_new(); // Crear un libro de excel


    // Crear las hojas del excel
    const wsDataCommon = [
        ["Título del Reporte", titleReport],
        ["Generado el", new Date().toLocaleString()],
        ["Rango de Fechas", date_start && date_end ? `${date_start} al ${date_end}` : ""],
        [],
        ["Mes", "Unidad sustantiva", "Tipo de acción", "Tipo de actividad", "Estado", "Mujeres atendidas", "Hombres atendidos", "Total atendidos"]
    ];

    const wsDataProcesalAndFemicide = [
        ["Título del Reporte", titleReport],
        ["Generado el", new Date().toLocaleString()],
        ["Rango de Fechas", date_start && date_end ? `${date_start} al ${date_end}` : ""],
        [],
        ["Mes", "Unidad sustantiva", "Tipo de acción", "Tipo de actividad", "Estado", "Total"]
    ];

    const wsDataRepresentation = [
        ["Título del Reporte", titleReport],
        ["Generado el", new Date().toLocaleString()],
        ["Rango de Fechas", date_start && date_end ? `${date_start} al ${date_end}` : ""],
        [],
        ["Mes", "Unidad sustantiva", "Tipo de acción", "Tipo de actividad", "Estado", "Lugar", "Mujeres atendidas", "Hombres atendidos", "Total atendidos"]
        
    ];

    
    const wsDataVictim = [
        ["Título del Reporte", activity],
        ["Generado el", new Date().toLocaleString()],
        ["Rango de Fechas", date_start && date_end ? `${date_start} al ${date_end}` : ""],
        [],
        ["Mes", "Unidad sustantiva", "Tipo de acción", "Tipo de actividad", "País de procedencia", "Estado donde reside", "Sexo", "Edad", "Forma de captación", "Recibida"]
        
    ];

    const wsDataAttention0800 = [
        ["Título del Reporte", activity],
        ["Generado el", new Date().toLocaleString()],
        ["Rango de Fechas", date_start && date_end ? `${date_start} al ${date_end}` : ""],
        [],
        ["Mes", "Unidad sustantiva", "Tipo de acción", "Tipo de actividad", "Estado", "Psicología", "Legal", "Orientación","Gran misión venezuela mujer", "Total"]
        
    ];

    const actividades = filterActividades || dataInitial || [];

    const aggregatedDataCommon: { [key: string]: any } = {};
    const aggregatedDataProcesalAndFemicide: { [key: string]: any } = {};
    const aggregatedDataRepresentation: { [key: string]: any } = {};
    const aggregatedDataAttention0800: { [key: string]: any } = {};

    actividades.forEach((actividad) => {
        const date = new Date(actividad.date);
        const month = date.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
        const key = `${month}-${actividad.state}-${actividad.type_activity}`;

        if (actividad.type_activity === 'Actuación Procesal' || actividad.type_activity === 'Violencia de Genero') {
            if (!aggregatedDataProcesalAndFemicide[key]) {
                aggregatedDataProcesalAndFemicide[key] = {
                    month,
                    management_unit: actividad.management_unit,
                    type_action: actividad.type_action,
                    type_activity: actividad.type_activity,
                    state: actividad.state,
                    total: 0,
                };
            }
            aggregatedDataProcesalAndFemicide[key].total += 1; 

        } else if (actividad.type_activity === 'Representación en Causas Judiciales') {
            const representationKey = `${month}-${actividad.state}-${actividad.place}`;
            if (!aggregatedDataRepresentation[representationKey]) {
                aggregatedDataRepresentation[representationKey] = {
                    month,
                    management_unit: actividad.management_unit,
                    type_action: actividad.type_action,
                    type_activity: actividad.type_activity,
                    state: actividad.state,
                    place: actividad.place,
                    n_womans: 0,
                    n_man: 0,
                };
            }
            aggregatedDataRepresentation[representationKey].n_womans += actividad.n_womans;
            aggregatedDataRepresentation[representationKey].n_man += actividad.n_man;
        }

        else if (actividad.type_activity === 'Víctima de trata') {
            const country = countries.find((country) => country.id === actividad.country_id);
            wsDataVictim.push([
                month,
                actividad.management_unit,
                actividad.type_action,
                actividad.type_activity,
                country?.country || "HOLA",
                actividad.state,
                "Femenino",
                actividad.age.toString(),
                actividad.collection_method,
                actividad.received
            ]);
           
        }

        else if (actividad.type_activity === 'Atención Telefónica') {
            const countPsicological = actividad.type_telephone_service_id === 1 ? 1 : 0;
            const countLegal = actividad.type_telephone_service_id === 2 ? 1 : 0;
            const countOrientation = actividad.type_telephone_service_id === 3 ? 1 : 0;
            const countGran_mision = actividad.great_mission.length >= 1 ? 1 : 0;
            const total = countPsicological + countLegal + countOrientation + countGran_mision;

            if (!aggregatedDataAttention0800[key]) {
                aggregatedDataAttention0800[key] = {
                    month,
                    management_unit: actividad.management_unit,
                    type_action: actividad.type_action,
                    type_activity: actividad.type_activity,
                    state: actividad.state,
                    countPsicological: 0,
                    countLegal: 0,
                    countOrientation: 0,
                    countGran_mision: 0,
                    total: 0
                };
            }
            aggregatedDataAttention0800[key].countPsicological += countPsicological;
            aggregatedDataAttention0800[key].countLegal += countLegal;
            aggregatedDataAttention0800[key].countOrientation += countOrientation;
            aggregatedDataAttention0800[key].countGran_mision += countGran_mision;
            aggregatedDataAttention0800[key].total += total;
        }
        
        else {
            if (!aggregatedDataCommon[key]) {
                aggregatedDataCommon[key] = {
                    month,
                    management_unit: actividad.management_unit,
                    type_action: actividad.type_action,
                    type_activity: actividad.type_activity,
                    state: actividad.state,
                    n_womans: 0,
                    n_man: 0,
                };
            }
            aggregatedDataCommon[key].n_womans += actividad.n_womans;
            aggregatedDataCommon[key].n_man += actividad.n_man;
        }
    });

    Object.values(aggregatedDataCommon).forEach((actividad: any) => {
        const total = actividad.n_womans + actividad.n_man;
        wsDataCommon.push([
            actividad.month,
            actividad.management_unit,
            actividad.type_action,
            actividad.type_activity,
            actividad.state,
            actividad.n_womans.toString(),
            actividad.n_man.toString(),
            total.toString()
        ]);
    });

    Object.values(aggregatedDataProcesalAndFemicide).forEach((actividad: any) => {
        wsDataProcesalAndFemicide.push([
            actividad.month,
            actividad.management_unit,
            actividad.type_action,
            actividad.type_activity,
            actividad.state,
            actividad.total.toString()
        ]);
    });

    Object.values(aggregatedDataRepresentation).forEach((actividad: any) => {
        const total = actividad.n_womans + actividad.n_man;
        wsDataRepresentation.push([
            actividad.month,
            actividad.management_unit,
            actividad.type_action,
            actividad.type_activity,
            actividad.state,
            actividad.place,
            actividad.n_womans?.toString(),
            actividad.n_man?.toString(),
            total?.toString()
        ]);
    });

    Object.values(aggregatedDataAttention0800).forEach((actividad: any) => {
        wsDataAttention0800.push([
            actividad.month,
            actividad.management_unit,
            actividad.type_action,
            actividad.type_activity,
            actividad.state,
            actividad.countPsicological.toString(),
            actividad.countLegal.toString(),
            actividad.countOrientation.toString(),
            actividad.countGran_mision.toString(),
            actividad.total.toString()
        ]);
    });

    const wsCommon = XLSX.utils.aoa_to_sheet(wsDataCommon);
    const wsProcesalAndFemicide = XLSX.utils.aoa_to_sheet(wsDataProcesalAndFemicide);
    const wsRepresentation = XLSX.utils.aoa_to_sheet(wsDataRepresentation);
    const wsVictim = XLSX.utils.aoa_to_sheet(wsDataVictim);
    const wsAttention0800 = XLSX.utils.aoa_to_sheet(wsDataAttention0800);


    // Ajustar el ancho de las columnas de las hojas del excel
    const wscolsCommon = [
        { wch: 15 }, // "Mes" column width
        { wch: 55 }, // "Unidad sustantiva" column width
        { wch: 35 }, // "Tipo de acción" column width
        { wch: 40 }, // "Tipo de actividad" column width
        { wch: 15 }, // "Estado" column width
        { wch: 20 }, // "Mujeres atendidas" column width
        { wch: 20 }, // "Hombres atendidos" column width
        { wch: 20 }  // "Total atendidos" column width
    ];
    wsCommon['!cols'] = wscolsCommon;

    const wscolsProcesal = [
        { wch: 15 }, // "Mes" column width
        { wch: 55 }, // "Unidad sustantiva" column width
        { wch: 35 }, // "Tipo de acción" column width
        { wch: 40 }, // "Tipo de actividad" column width
        { wch: 15 }, // "Estado" column width
        { wch: 20 }  // "Total" column width
    ];
    wsProcesalAndFemicide['!cols'] = wscolsProcesal;

    const wscolsRepresentation = [
        { wch: 15 }, // "Mes" column width
        { wch: 55 }, // "Unidad sustantiva" column width
        { wch: 35 }, // "Tipo de acción" column width
        { wch: 40 }, // "Tipo de actividad" column width
        { wch: 15 }, // "Estado" column width
        { wch: 25 }, // "Lugar" column width
        { wch: 20 }, // "Mujeres atendidas" column width
        { wch: 20 }, // "Hombres atendidos" column width
        { wch: 20 }  // "Total atendidos" column width
    ];
    wsRepresentation['!cols'] = wscolsRepresentation;

    const wscolsVictim = [
        { wch: 15 }, // "Mes" column width
        { wch: 55 }, // "Unidad sustantiva" column width
        { wch: 30 }, // "Tipo de acción" column width
        { wch: 25 }, // "Tipo de actividad" column width
        { wch: 20 }, // "País de procedencia" column width
        { wch: 15 }, // "Estado donde reside" column width
        { wch: 15 }, // "Sexo" column width
        { wch: 15 }, // "Edad" column width
        { wch: 40 }, // "Forma de captación" column width
        { wch: 30 }  // "Recibida" column width
    ];
    wsVictim['!cols'] = wscolsVictim;

    const wscolsAttention0800 = [
        { wch: 15 }, // "Mes" column width
        { wch: 55 }, // "Unidad sustantiva" column width
        { wch: 30 }, // "Tipo de acción" column width
        { wch: 25 }, // "Tipo de actividad" column width
        { wch: 15 }, // "Estado" column width
        { wch: 15 }, // "Psicología" column width
        { wch: 15 }, // "Legal" column width
        { wch: 15 }, // "Orientación" column width
        { wch: 15 }, // "Gran misión venezuela mujer" column width
        { wch: 15 }  // "Total" column width
    ];
    wsAttention0800['!cols'] = wscolsAttention0800;



    // Agregar las hojas al excel
    function book_append(){
        if(activity === "Actuación Procesal"){
            return XLSX.utils.book_append_sheet(wb, wsProcesalAndFemicide, "Reporte Actuación Procesal");
        }
        if(activity === "Violencia de Genero"){
            return XLSX.utils.book_append_sheet(wb, wsProcesalAndFemicide, "Reporte Violencia de Genero");
        }
        if(activity === "Representación en Causas Judiciales"){
            return XLSX.utils.book_append_sheet(wb, wsRepresentation, "Reporte Representación judicial");
        }
        if(activity === "Víctima de trata"){
            return XLSX.utils.book_append_sheet(wb, wsVictim, "Reporte Víctima de trata");
        }
        if(activity === "Atención Telefónica"){
            return XLSX.utils.book_append_sheet(wb, wsAttention0800, "Reporte Atención Telefónica");
        }
        return XLSX.utils.book_append_sheet(wb, wsCommon, `Reporte ${activity}`);
    }

    book_append();


    // Exportar el excel
    XLSX.writeFile(wb, `${titleReport}.xlsx`);
}

export { handleExportExcel };