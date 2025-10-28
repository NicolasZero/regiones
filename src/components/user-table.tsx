"use client";

import { useEffect, useMemo, useState } from "react";
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
import { useQuery } from "@tanstack/react-query";
import api from "@/api/api_regiones";
import { Notification } from "./notification";
import { Usuario, OrdenColumnaUser } from "@/lib/types";


const FilaExpandible = ({
  usuario,
  expandida,
  onToggle,
  onActivar,
}: {
  usuario: Usuario;
  expandida: boolean;
  onToggle: () => void;
  onActivar: () => void;
}) => {
  return (
    <>
      <TableRow className="cursor-pointer" onClick={onToggle}>
        <TableCell>{usuario.identity_card}</TableCell>
        <TableCell>{usuario.username}</TableCell>
        <TableCell>{usuario.full_name}</TableCell>
        <TableCell>{usuario.role}</TableCell>
        <TableCell>{usuario.is_active ? "Activo" : "Inactivo"}</TableCell>
        <TableCell>
          <Button size="sm" onClick={(e) => { e.stopPropagation(); onActivar(); }}>
            {usuario.is_active ? 'Desactivar' : 'Activar'}
          </Button>
        </TableCell>
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
                <div className="p-4 bg-muted">
                  <h3 className="font-semibold mb-2">Información adicional:</h3>
                  <p>{usuario.position}</p>
                </div>
              </motion.div>
            </TableCell>
          </TableRow>
        )}
      </AnimatePresence>
    </>
  );
};

export default function TablaUsuarios() {
  const { data } = useQuery({
    queryKey: ["usuarios"],
    queryFn: () => api.get("/user").then((res) => res.data.data),
  });
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  console.log(usuarios);

  useEffect(() => {
    if (data) {
      setUsuarios(data);
    }
  }, [data]);
  // console.log(data);

  const columnas = [
    {
      label: "Cédula",
      campo: "identity_card",
    },
    {
      label: "Usuario",
      campo: "username",
    },
    {
      label: "Nombre Completo",
      campo: "nombreCompleto",
    },
    {
      label: "Nivel de Acceso",
      campo: "role",
    },
    {
      label: 'Estatus',
      campo: 'status'
    }]

  const [expandido, setExpandido] = useState<number | null>(null);
  const [ordenActual, setOrdenActual] = useState<OrdenColumnaUser>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [elementosPorPagina, setElementosPorPagina] = useState(10);
  const [showNotification, setShowNotification] = useState(false);

  const toggleExpansion = (id: number) => {
    setExpandido(expandido === id ? null : id);
  };
  const toggleEstatus = async (id: number, status: boolean) => {
    try {
      const response = await api.patch(`/user`, { is_active: !status, id: id }).then((res) => res.data);
      if (response.status === "ok") {
        setShowNotification(true);
        const usuariosActualizados = usuarios.map((usuario) => {
          if (usuario.id === id) {
            return { ...usuario, is_active: !status };
          }
          return usuario;
        });
        setUsuarios(usuariosActualizados);

      }
    } catch (error) {
      console.log(error);
    } finally {
      const timer = setTimeout(() => {
        setShowNotification(false);
        clearTimeout(timer);
      }, 500);
    }

  };

  const ordenarUsuarios = (columna: keyof Usuario | "nombreCompleto") => {
    const nuevaDireccion =
      ordenActual?.columna === columna && ordenActual.direccion === "asc"
        ? "desc"
        : "asc";
    setOrdenActual({ columna, direccion: nuevaDireccion });

    const usuariosOrdenados = [...usuarios].sort((a, b) => {
      let valorA: string, valorB: string;

      if (columna === "nombreCompleto") {
        valorA = `${a.full_name}`.trim();
        valorB = `${b.full_name}`.trim();
      } else {
        valorA = a[columna].toString().trim();
        valorB = b[columna].toString().trim();
      }

      if (valorA < valorB) return nuevaDireccion === "asc" ? -1 : 1;
      if (valorA > valorB) return nuevaDireccion === "asc" ? 1 : -1;
      return 0;
    });

    setUsuarios(usuariosOrdenados);
  };

  const renderIconoOrden = (columna: keyof Usuario | "nombreCompleto") => {
    if (ordenActual?.columna !== columna) {
      return <ArrowUpDown size={16} />;
    }
    return ordenActual.direccion === "asc" ? (
      <ChevronUp size={16} />
    ) : (
      <ChevronDown size={16} />
    );
  };

  const usuariosPaginados = useMemo(() => {
    const indiceInicio = (paginaActual - 1) * elementosPorPagina;
    const indiceFin = indiceInicio + elementosPorPagina;
    return usuarios.slice(indiceInicio, indiceFin);
  }, [usuarios, paginaActual, elementosPorPagina]);

  const totalPaginas = Math.ceil(usuarios.length / elementosPorPagina);

  const cambiarPagina = (nuevaPagina: number) => {
    setPaginaActual(nuevaPagina);
  };

  return (
    <div className="container mx-auto py-1">
      {showNotification && <Notification message="Usuario actualizado" />}
      <Table>
        <TableHeader>
          <TableRow>
            {columnas.map((columna) => (
              <TableHead
                key={columna.campo}
                onClick={() => ordenarUsuarios(columna.campo as keyof Usuario)}
                className="cursor-pointer bg-primary text-white p-2"
              >
                {columna.label}
                {renderIconoOrden(columna.campo as keyof Usuario)}
              </TableHead>
            ))}
            <TableHead className='bg-primary text-white p-2'>Acciones</TableHead>
            <TableHead className="bg-primary text-white p-2"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuariosPaginados.map((usuario) => (
            <FilaExpandible
              key={usuario.id}
              usuario={usuario}
              expandida={expandido === usuario.id}
              onToggle={() => toggleExpansion(usuario.id)}
              onActivar={async () => await toggleEstatus(usuario.id, usuario.is_active)}
            />
          ))}
        </TableBody>
      </Table>
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
              {[10,25,50,100,250,500].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
    </div>
  );
}
