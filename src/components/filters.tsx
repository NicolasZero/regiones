"use client";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "./date-picker"
import { Button } from "./ui/button"
import { useEffect, useState } from "react";
import { Agenda, MobileUnit } from "@/lib/types";
import handleExportPDF from "@/lib/exportPDF";
import { handleExportExcelMobile } from "@/lib/exportExcelMobile";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { handleExportExcel } from "@/lib/exportExcelAchievements";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import useLocation from "@/hooks/useLocation";

interface FiltersProps {
    initialData: Agenda[] | MobileUnit[];
    setActividad?: React.Dispatch<React.SetStateAction<Agenda[]>>;
    setActividadMobile?: React.Dispatch<React.SetStateAction<MobileUnit[]>>;
    actividad: Agenda[] | MobileUnit[];
    data: any;
    labelPDF?: string;
    mobileUnits?: boolean;
    achievements?: boolean;
}
type status = {
    id: number;
    state: string;
}

export default function Filters({ initialData, setActividad, setActividadMobile, actividad, data, labelPDF = "Reporte de logros", mobileUnits, achievements }: FiltersProps) {
    const [selectedActivity, setSelectedActivity] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [selectedState, setSelectedState] = useState<string>("all")
    const [date, setDate] = useState<DateRange | undefined>({
        from: undefined,
        to: undefined
    });
    const [search, setSearch] = useState<string>("");
    // Get unique activities for the select

    const activities: string[] = Array.from(new Set(data?.map((row: Agenda) => row.type_activity as string)))
    const stateOptions: string[] = Array.from(new Set(data?.map((row: Agenda) => row.state as string)))

    const statusOptions = [{
        id: 1,
        state: "Completado"
    }, {
        id: 2,
        state: "Por completar"
    }, {
        id: 3,
        state: "No completado"
    }]

    const handleResetFilter = () => {
        setDate({
            from: undefined,
            to: undefined
        })
        setSearch("")
        setSelectedActivity("all")
        setSelectedState("all")
        setSelectedStatus("all")
    }

    useEffect(() => {
        let filteredData: (Agenda | MobileUnit)[] = initialData;

        if (selectedActivity !== "all") {
            filteredData = filteredData.filter((actividad: Agenda | MobileUnit) => {
                return (
                    (actividad as Agenda).type_activity?.toLowerCase().includes(selectedActivity.toLowerCase())
                );
            });
        }

        if (selectedState !== "all") {
            filteredData = filteredData.filter((actividad: Agenda | MobileUnit) => {
                return (
                    (actividad as Agenda).state?.toLowerCase().includes(selectedState.toLowerCase())
                );
            });
        }

        if (selectedStatus !== "all") {
            filteredData = filteredData.filter((actividad: Agenda | MobileUnit) => {
                return (
                    (actividad as Agenda).status_id.toString() === selectedStatus
                );
            });
        }

        // Filtra los datos por búsqueda
        if (search) {
            filteredData = filteredData.filter((actividad: Agenda | MobileUnit) => {
                return (
                    actividad.username.toLowerCase().includes(search.toLowerCase()) ||
                    (actividad as Agenda).type_activity?.toLowerCase().includes(search.toLowerCase())
                );
            });
        }

        // Filtra los datos por fecha
        if (date?.from !== undefined && date?.to !== undefined) {
            const dateFrom = date.from
            const dateTo = date.to
            filteredData = filteredData.filter((actividad: Agenda | MobileUnit) => {
                if ('date' in actividad) {
                    const actividadDate = new Date(actividad.date)
                    return actividadDate >= dateFrom && actividadDate <= dateTo;
                }
                return false;
            });
        }

        if (setActividad) {
            setActividad(filteredData.filter((item): item is Agenda => 'type_activity' in item) as Agenda[]);
        }
        if (setActividadMobile) {
            setActividadMobile(filteredData.filter((item): item is MobileUnit => 'username' in item) as MobileUnit[]);
        }
    }, [date?.from, date?.to, search, initialData, selectedActivity, selectedState, selectedStatus]);



    // const exportPDF = () => {
    //     handleExportPDF(date?.from?.toLocaleDateString(), date?.to?.toLocaleDateString(), actividad as Agenda[], data, labelPDF,);
    // }

    const exportExcel = () => {
        handleExportExcel(date?.from?.toLocaleDateString(), date?.to?.toLocaleDateString(), actividad as Agenda[], data, "Reporte de logros", selectedActivity);
    }

    const exportExcelMobile = () => {
        handleExportExcelMobile(actividad as MobileUnit[], "Reporte de unidades móviles");
    }
    return (
        <>
            <div className="relative">
                <Input className="mb-4 " placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} />
                <div className="absolute bottom-2 right-0 pr-3 flex items-center text-gray-500 dark:text-white">
                    <Search />
                </div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col md:flex-row justify-center gap-4 w-full">

                    {/* Select para filtrar por estatus */}
                    {!achievements &&
                        <Select
                            value={selectedStatus}
                            onValueChange={setSelectedStatus}
                        >
                            <SelectTrigger className="w-[280px]" id="activity-filter">
                                <SelectValue placeholder="Seleccionar estatus" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos los estatus</SelectItem>
                                {statusOptions.map((status: status, index: number) => (
                                    <SelectItem key={index} value={status.id.toString()}>
                                        {status.state}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>}



                    {/* Select para filtrar por estado */}
                    <Select
                        value={selectedState}
                        onValueChange={setSelectedState}
                    >
                        <SelectTrigger className="w-[280px]" id="activity-filter">
                            <SelectValue placeholder="Seleccionar estados" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos los estados</SelectItem>
                            {stateOptions.map((state: string, index: number) => (
                                <SelectItem key={index} value={state}>
                                    {state}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Select para filtrar por actividad, (no se incluye unidades móviles) */}
                    {!mobileUnits &&
                        <Select
                            value={selectedActivity}
                            onValueChange={setSelectedActivity}
                        >
                            <SelectTrigger className="w-[280px]" id="activity-filter">
                                <SelectValue placeholder="Seleccionar tipo de actividad" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las actividades</SelectItem>
                                {activities.map((activity: string, index: number) => (
                                    <SelectItem key={index} value={activity}>
                                        {activity}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    }
                    <DatePickerWithRange date={date} setDate={setDate} />
                    <Button className="mb-4 lg:w-[200px]" onClick={handleResetFilter}>Limpiar filtro</Button>
                    {/* {!mobileUnits && <Button className="mb-4 lg:w-[200px]" onClick={exportPDF}>Exportar PDF</Button>} */}
                    {achievements && <Button className="mb-4 lg:w-[200px]" onClick={exportExcel} disabled={selectedActivity === "all"}>Exportar Excel</Button>}
                    {mobileUnits && <Button className="mb-4 lg:w-[200px]" onClick={exportExcelMobile} disabled={selectedStatus !== "1" }>Exportar Excel</Button>}

                </div>
            </div>
        </>
    )
}