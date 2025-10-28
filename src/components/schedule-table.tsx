"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  ArrowUpDown,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import CompleteActivitieSchedule from "./complete-activitie-schedule";
import CompleteMobileUnitSchedule from "./complete-mobile-unit-schedule";
import ContentOfActivities from "./ContentOfActivities";
import ContentOfMobileUnit from "./ContentOfMobileUnit";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { useUpdateActivitie } from "@/context/updateActivitie";
import { MobileUnit } from "@/lib/types";
import { DateRange } from "react-day-picker";
import type { Agenda, Atencion0800, Victims, Violence } from "@/lib/types";
import ContentOfVictims from "./ContentOfVictims";
import ContentOfViolence from "./ContentOfViolence";
import ContentOfAtencion0800 from "./ContentOfAtencion0800";

type OrdenColumna = {
  columna: keyof Agenda | "id";
  direccion: "asc" | "desc";
} | null;

const FilaExpandible = ({
  actividad,
  expandida,
  onToggle,
  viewUser,
  achievements,
  mobileUnits,
}: {
  actividad: Agenda;
  expandida: boolean;
  onToggle: () => void;
  viewUser?: boolean;
  mobileUnits?: boolean;
  achievements?: boolean;
}) => {
  const colorStatus =
    actividad.status_id === 2
      ? "text-orange-600"
      : actividad.status_id === 3
        ? "text-red-700"
        : "text-success";
  const disabled =
    actividad.status_id === 1 || actividad.status_id === 3;
  const cursorPointer = disabled ? "cursor-not-allowed" : "cursor-pointer";
  const { isUpdated, setIsUpdated } = useUpdateActivitie();
  const completeLabel = achievements ? "Completado" : (actividad.status_id === 2) ? "Por completar" : ( actividad.status_id === 3) ? "No completado" : "Completado";

  return (
    <>
      <TableRow onClick={onToggle}>
        <TableCell>{actividad.id}</TableCell>
        <TableCell>{actividad.username}</TableCell>
        <TableCell>{mobileUnits ? "Unidad móvil" : actividad.type_activity}</TableCell>
        {achievements && <TableCell>{achievements ? actividad.date !== undefined ? new Date (actividad.date).toLocaleDateString() : "" : ""}</TableCell>}
        {viewUser && !mobileUnits && <TableCell>{actividad.date !== undefined ? new Date (actividad.date).toLocaleDateString() : ""}</TableCell>}
        {mobileUnits && <TableCell>{actividad.date !== undefined ? new Date (actividad.date).toLocaleDateString() : ""}</TableCell>}
        {<TableCell className={colorStatus}>{completeLabel}</TableCell>}
        {viewUser && (
          <TableCell>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="sm"
                  className={cursorPointer}
                  disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {actividad.status_id === 2
                    ? "Completar"
                    : actividad.status_id === 3
                      ? "No completada"
                      : "Completado"}
                </Button>
              </AlertDialogTrigger>
              {/* <AlertDialogOverlay onClick={(e) => e.stopPropagation()}></AlertDialogOverlay> */}
              <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-2xl text-center">
                    {mobileUnits
                      ? "Completar unidad móvil agendada"
                      : "Completar actividad agendada"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Llene los campos correspondientes para completar la unidad móvil agendada
                  </AlertDialogDescription>
                  <div className="h-[400px] md:h-[550px] w-full overflow-y-auto">
                    {mobileUnits && (
                      <CompleteMobileUnitSchedule id={actividad.id} />
                    )}
                    {!mobileUnits && (
                      <CompleteActivitieSchedule id={actividad.id} />
                    )}
                  </div>

                  {/* </AlertDialogDescription> */}
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => {
                      setIsUpdated(false);
                    }}
                  >
                    Cerrar
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TableCell>
        )}
        <TableCell>
          {expandida ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </TableCell>
      </TableRow>
      <AnimatePresence initial={false}>
        {expandida && (
          <TableRow>
            <TableCell colSpan={7} className="p-0">
              <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                {mobileUnits && (
                  <ContentOfMobileUnit
                    actividad={actividad as unknown as MobileUnit}
                    achievements={achievements}
                  />
                )}
                 {actividad.type_activity === "Víctima de trata" && (
                  <ContentOfVictims actividad={actividad as unknown as Victims} achievements />
                )}
                {actividad.type_activity === "Violencia de Genero" && (
                  <ContentOfViolence actividad={actividad as unknown as Violence} achievements />
                )}
                {actividad.type_activity === "Atención Telefónica" && (
                  <ContentOfAtencion0800 actividad={actividad as unknown as Atencion0800} achievements />
                )}

                {!mobileUnits && actividad.type_activity !== "Víctima de trata" && actividad.type_activity !== "Violencia de Genero" && actividad.type_activity !== "Atención Telefónica" && (
                  <ContentOfActivities
                    actividad={actividad}
                    achievements={achievements}
                  />
                )}
              
              </motion.div>
            </TableCell>
          </TableRow>
        )}
      </AnimatePresence>
    </>
  );
};

interface TableProps {
  viewUser?: boolean;
  achievements?: boolean;
  mobileUnits?: boolean;
  dateFilter?: DateRange;
  columnas: { campo: string; label: string }[];
  data?: Agenda[] | MobileUnit[];
  setData: (data: Agenda[] | MobileUnit[]) => void;
  errorData?: any;
  isLoading?: boolean;
}

export function TableUI({
  viewUser,
  columnas,
  achievements,
  mobileUnits,
  data: actividad,
  setData: setActividad,

}: TableProps) {
  const { isUpdated } = useUpdateActivitie();
  const [expandido, setExpandido] = useState<number | null>(null);
  const [ordenActual, setOrdenActual] = useState<OrdenColumna>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [elementosPorPagina, setElementosPorPagina] = useState(20);

  const toggleExpansion = (id: number) => {
    setExpandido(expandido === id ? null : id);
  };
  const ordenarActividades = (columna: "id" | "username" | "type_activity" | "date" | "status_id") => {
    const nuevaDireccion =
      ordenActual?.columna === columna && ordenActual.direccion === "asc"
        ? "desc"
        : "asc";
    setOrdenActual({ columna, direccion: nuevaDireccion });

    const actividadesOrdenados = [...(actividad || [])]
      .filter((item): item is Agenda => 'username' in item)
      .sort((a, b) => {
        if (columna === "id") {
          return nuevaDireccion === "asc" ? a.id - b.id : b.id - a.id;
        }
        let valorA: string, valorB: string;

        valorA = a[columna]?.toString().trim();
        valorB = b[columna]?.toString().trim();

        if (valorA < valorB) return nuevaDireccion === "asc" ? -1 : 1;
        if (valorA > valorB) return nuevaDireccion === "asc" ? 1 : -1;

        return 0;
      });

    setActividad(actividadesOrdenados);
  };

  const renderIconoOrden = (columna: keyof Agenda) => {
    if (ordenActual?.columna !== columna) {
      return <ArrowUpDown size={16} />;
    }
    return ordenActual.direccion === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };


  const actividadesPaginados = useMemo(() => {
    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;
    return (actividad ?? []).slice(indiceInicio, indiceFin);
  }, [actividad, paginaActual, elementosPorPagina]);

  const totalPaginas = Math.ceil((actividad?.length || 0) / elementosPorPagina);

  const cambiarPagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };


  return (
    <div className="container mx-auto py-1">
      <Table>
        <TableHeader>
          <TableRow>
            {columnas.map((columna) => (
              <TableHead
                key={columna.campo}
                onClick={() =>
                  ordenarActividades(columna.campo as "id" | "username" | "type_activity" | "date" | "status_id")}
                className="cursor-pointer bg-primary text-white p-2"
              >
                {columna.label}
                {renderIconoOrden(columna.campo as keyof Agenda)}
              </TableHead>
            ))}
            {viewUser && (
              <TableHead className="bg-primary text-white p-2">
                Acciones
              </TableHead>
            )}
            <TableHead className="bg-primary text-white p-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actividadesPaginados.map((actividad) => (
            <FilaExpandible
              key={actividad.id}
              actividad={actividad as Agenda}
              expandida={expandido === actividad.id}
              onToggle={() => toggleExpansion(actividad.id)}
              viewUser={viewUser}
              achievements={achievements}
              mobileUnits={mobileUnits}
            // onComplete={() => completeSchedule(actividad.id)}
            />
          ))}
          {(actividad?.length ?? 0) === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No hay actividades agendadas
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Paginación */}

      {(actividad?.length ?? 0) !== 0 && (
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Filas por página</p>
            <Select
              value={elementosPorPagina.toString()}
              onValueChange={(value) => {
                setElementosPorPagina(Number(value));
                setPaginaActual(1);
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={elementosPorPagina.toString()} />
              </SelectTrigger>
              <SelectContent side="top">
                {[20,50,100,250,500].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p><b>Total de registros encontrados: </b>{`${actividad?.length}`}</p>
          </div>
         
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Página anterior</span>
            </Button>
            <div className="text-sm font-medium">
              Página {paginaActual} de {totalPaginas}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Página siguiente</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
