
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exportTableActivities, exportTableStates } from "@/lib/exportExcelDashboard";
import React from 'react';
import { Button } from "./ui/button";


interface PropsActivitiesStatsTable {
  data: {
    action: string;
    details: {
      no: string;
      description: string;
      total: string;
      percentage: string;
    }[];
    subTotal: {
      total: string;
      percentage: string;
    };
  }[];
  grandTotal: number
  yearTables: number
}


export default function ActivitiesStatsTable({ data, grandTotal, yearTables }: PropsActivitiesStatsTable) {
  return (
    <div className="container mx-auto p-4">
       <h2 className="text-xl text-center font-bold text-black dark:text-white">Enero - Diciembre - {yearTables}</h2>
       <Button onClick={() => exportTableActivities(data, grandTotal, yearTables)} className="bg-primary text-white mb-4 ">Exportar a Excel</Button>
      <Table className="h-fit max-h-80 overflow-y-auto relative">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-primary text-white font-bold">Acción</TableHead>
            <TableHead className="bg-primary text-white font-bold">No</TableHead>
            <TableHead className="bg-primary text-white font-bold">Descripción</TableHead>
            <TableHead className="bg-primary text-white font-bold">Total</TableHead>
            <TableHead className="bg-primary text-white font-bold">%</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No hay registros</TableCell>
            </TableRow>
          )}
          {data.map((activity, index) => (
            <React.Fragment key={index}>
              {activity.details.map((detail, detailIndex) => (
                <TableRow key={detailIndex}>
                  {detailIndex === 0 && (
                    <TableCell rowSpan={activity.details.length} className="bg-pink-100 dark:bg-dark">
                      {activity.action}
                    </TableCell>
                  )}
                  <TableCell>{detail.no}</TableCell>
                  <TableCell>{detail.description}</TableCell>
                  <TableCell>{detail.total}</TableCell>
                  <TableCell>{detail.percentage}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-pink-200 font-bold dark:bg-dark">
                <TableCell colSpan={3}>Sub - Total</TableCell>
                <TableCell>{activity.subTotal.total}</TableCell>
                <TableCell>{activity.subTotal.percentage}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
          {data.length > 0 && (
          <TableRow className="bg-pink-300 font-bold dark:bg-dark">
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{grandTotal}</TableCell>
            <TableCell>{"100%"}</TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}