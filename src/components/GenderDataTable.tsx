"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "./ui/button"
import { exportTableGender } from "@/lib/exportExcelDashboard"

interface DataRow {
    month: string
    state: string
    people: string
}

interface PropsDataGenderTable {
    data: DataRow[]
    yearTables: number
}


export default function GenderDataTable({ data, yearTables }: PropsDataGenderTable) {

    const validRecords = data.filter(
        (row) => row.month !== "SIN REGISTROS" && row.state !== "SIN REGISTROS" && Number.parseInt(row.people) > 0,
    )

    return (
        <>
         <h2 className="text-xl text-center font-bold text-black dark:text-white">Enero - Diciembre - {yearTables}</h2>
         <Button onClick={() => exportTableGender(data, yearTables)} className="bg-primary text-white mb-4 ">Exportar a Excel</Button>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-primary">
                        <TableRow>
                            <TableHead className="text-white">Mes</TableHead>
                            <TableHead className="text-white">Estado</TableHead>
                            <TableHead className="text-white text-right">Personas</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {validRecords.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No hay registros</TableCell>
                            </TableRow>
                        )}
                        {validRecords.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{row.month}</TableCell>
                                <TableCell>{row.state}</TableCell>
                                <TableCell className="text-right">{row.people}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}

