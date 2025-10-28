"use client"
import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import api from "@/api/api_regiones"

// interface SummaryTableProps {
//     data: {
//         status: string,
//         date: string,
//         hour: string,
//         type_action: string,
//         type_activity: string,
//         management_unit: string,
//         state: string,
//         n_womans: number,
//     }[]
// }

export default function SummaryTable() {
    const [selectedActivity, setSelectedActivity] = useState<string>("all")
    const { data } = useQuery<{ status: string, date: string, hour: string, type_action: string, type_activity: string, management_unit: string, state: string, n_womans: number, n_man: number }[]>({
        queryKey: ['repoData'],
        queryFn: () =>
          api.get("/archievement").then((res) => res.data.data),
      })

      

    // Get unique activities for the select
  const activities = Array.from(new Set(data?.map(row => row.type_activity)))

  // Filter data based on selected activity
  const filteredData = selectedActivity === "all" 
    ? data 
    : data?.filter(row => row.type_activity === selectedActivity)

  return (
    <Card className="w-full">
      <CardHeader className="bg-purple-700 text-white">
        <CardTitle className="text-center ">{selectedActivity === "all" ? "Todos" : selectedActivity}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center gap-4 mt-4">
          <Label htmlFor="activity-filter" className="font-bold">
            Filtrar por tipo de actividad:
          </Label>
          <Select
            value={selectedActivity}
            onValueChange={setSelectedActivity}
          >
            <SelectTrigger className="w-[280px]" id="activity-filter">
              <SelectValue placeholder="Seleccionar tipo de actividad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las actividades</SelectItem>
              {activities.map((activity) => (
                <SelectItem key={activity} value={activity}>
                  {activity}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center font-bold">MES</TableHead>
              <TableHead className="text-center font-bold">UNIDAD SUSTANTIVA</TableHead>
              <TableHead className="text-center font-bold">TIPO DE ACCIÓN</TableHead>
              <TableHead className="text-center font-bold">TIPO DE ACTIVIDAD</TableHead>
              <TableHead className="text-center font-bold">ESTADO</TableHead>
              <TableHead className="text-center font-bold">MUJERES ATENDIDAS</TableHead>
              <TableHead className="text-center font-bold">HOMBRES ATENDIDOS</TableHead>
              <TableHead className="text-center font-bold">TOTAL DE POBLACIÓN ATENDIDA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData?.map((row, index) => {
              const date = new Date(row.date)
              const month = date.toLocaleString('es-ES', { month: 'long' }).toUpperCase()
              const total = row.n_womans + row.n_man

              return (
                <TableRow key={index}>
                  <TableCell className="text-center">{month}</TableCell>
                  <TableCell className="text-center">{row.management_unit}</TableCell>
                  <TableCell className="text-center">{row.type_action}</TableCell>
                  <TableCell className="text-center">{row.type_activity}</TableCell>
                  <TableCell className="text-center">{row.state}</TableCell>
                  <TableCell className="text-center">{row.n_womans}</TableCell>
                  <TableCell className="text-center">{row.n_man}</TableCell>
                  <TableCell className="text-center">{total}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


