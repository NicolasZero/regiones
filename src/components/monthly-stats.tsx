import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { exportTableMonths } from "@/lib/exportExcelDashboard";
import { Button } from "./ui/button";

interface MonthlyData {
  type_action: string;
  type_activity: string;
  enero: string;
  febrero: string;
  marzo: string;
  abril: string;
  mayo: string;
  junio: string;
  julio: string;
  agosto: string;
  septiembre: string;
  octubre: string;
  noviembre: string;
  diciembre: string;
  total: number;
}

const calculateActivityTotal = (item: MonthlyData) => {
  return (
    parseInt(item.enero) +
    parseInt(item.febrero) +
    parseInt(item.marzo) +
    parseInt(item.abril) +
    parseInt(item.mayo) +
    parseInt(item.junio) +
    parseInt(item.julio) +
    parseInt(item.agosto) +
    parseInt(item.septiembre) +
    parseInt(item.octubre) +
    parseInt(item.noviembre) +
    parseInt(item.diciembre)
  );
};

const calculateSubtotal = (data: MonthlyData[], category: string) => {
  const subtotal = {
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0,
    total: 0
  };

  data?.forEach(item => {
    if (item.type_action === category) {
      subtotal.enero += parseInt(item.enero);
      subtotal.febrero += parseInt(item.febrero);
      subtotal.marzo += parseInt(item.marzo);
      subtotal.abril += parseInt(item.abril);
      subtotal.mayo += parseInt(item.mayo);
      subtotal.junio += parseInt(item.junio);
      subtotal.julio += parseInt(item.julio);
      subtotal.agosto += parseInt(item.agosto);
      subtotal.septiembre += parseInt(item.septiembre);
      subtotal.octubre += parseInt(item.octubre);
      subtotal.noviembre += parseInt(item.noviembre);
      subtotal.diciembre += parseInt(item.diciembre);
    }
  });
  subtotal.total += subtotal.enero + subtotal.febrero + subtotal.marzo + subtotal.abril + subtotal.mayo + subtotal.junio + subtotal.julio + subtotal.agosto + subtotal.septiembre + subtotal.octubre + subtotal.noviembre + subtotal.diciembre;

  return subtotal;
};

const calculateTotal = (data: MonthlyData[]) => {
  const total = {
    enero: 0,
    febrero: 0,
    marzo: 0,
    abril: 0,
    mayo: 0,
    junio: 0,
    julio: 0,
    agosto: 0,
    septiembre: 0,
    octubre: 0,
    noviembre: 0,
    diciembre: 0,
    total: 0
  };

  data?.forEach(item => {
    total.enero += parseInt(item.enero);
    total.febrero += parseInt(item.febrero);
    total.marzo += parseInt(item.marzo);
    total.abril += parseInt(item.abril);
    total.mayo += parseInt(item.mayo);
    total.junio += parseInt(item.junio);
    total.julio += parseInt(item.julio);
    total.agosto += parseInt(item.agosto);
    total.septiembre += parseInt(item.septiembre);
    total.octubre += parseInt(item.octubre);
    total.noviembre += parseInt(item.noviembre);
    total.diciembre += parseInt(item.diciembre);
  });

  total.total = total.enero + total.febrero + total.marzo + total.abril + total.mayo + total.junio + total.julio + total.agosto + total.septiembre + total.octubre + total.noviembre + total.diciembre;

  return total;
};

export default function MonthlyStatisticsTable({ data, yearTables }: { data: MonthlyData[], yearTables: number }) {
  const total = calculateTotal(data);
  

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
       <h2 className="text-xl text-center font-bold text-black dark:text-white">Enero - Diciembre - {yearTables}</h2>
       <Button onClick={() => exportTableMonths(data, yearTables, total.total)} className="bg-primary text-white mb-4 ">Exportar a Excel</Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-primary text-white font-bold" rowSpan={2}>Acciones</TableHead>
            <TableHead className="bg-primary text-white font-bold" rowSpan={2}>Actividades</TableHead>
            <TableHead className="bg-primary text-white font-bold" colSpan={12}>Logros acumulados por Mes</TableHead>
            <TableHead className="bg-primary text-white font-bold" rowSpan={2}>Acumulado Enero a Diciembre</TableHead>
            <TableHead className="bg-primary text-white font-bold" rowSpan={2}>Variación</TableHead>
          </TableRow>
          <TableRow>
            {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month) => (
              <TableHead key={month} className="bg-primary text-white font-bold">{month}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
        {data.map((item, index) => {
            const activityTotal = calculateActivityTotal(item);
            return (
              <TableRow key={index}>
                <TableCell>{item.type_action}</TableCell>
                <TableCell>{item.type_activity}</TableCell>
                <TableCell>{item.enero}</TableCell>
                <TableCell>{item.febrero}</TableCell>
                <TableCell>{item.marzo}</TableCell>
                <TableCell>{item.abril}</TableCell>
                <TableCell>{item.mayo}</TableCell>
                <TableCell>{item.junio}</TableCell>
                <TableCell>{item.julio}</TableCell>
                <TableCell>{item.agosto}</TableCell>
                <TableCell>{item.septiembre}</TableCell>
                <TableCell>{item.octubre}</TableCell>
                <TableCell>{item.noviembre}</TableCell>
                <TableCell>{item.diciembre}</TableCell>
                <TableCell>{activityTotal}</TableCell>
                <TableCell>{((activityTotal / total.total) * 100).toFixed(1)}%</TableCell>
              </TableRow>
            );
          })}
          {["Atención Jurídica", "Prevención", "Formación"].map(category => {
            const subtotal = calculateSubtotal(data, category);
            const percentage = ((subtotal.total / total.total) * 100).toFixed(1) + "%";
            return (
              <TableRow key={`${category}-subtotal`} className="bg-pink-200 font-bold dark:bg-dark">
                <TableCell colSpan={2}>Subtotal {category}</TableCell>
                <TableCell>{subtotal.enero}</TableCell>
                <TableCell>{subtotal.febrero}</TableCell>
                <TableCell>{subtotal.marzo}</TableCell>
                <TableCell>{subtotal.abril}</TableCell>
                <TableCell>{subtotal.mayo}</TableCell>
                <TableCell>{subtotal.junio}</TableCell>
                <TableCell>{subtotal.julio}</TableCell>
                <TableCell>{subtotal.agosto}</TableCell>
                <TableCell>{subtotal.septiembre}</TableCell>
                <TableCell>{subtotal.octubre}</TableCell>
                <TableCell>{subtotal.noviembre}</TableCell>
                <TableCell>{subtotal.diciembre}</TableCell>
                <TableCell>{subtotal.total}</TableCell>
                <TableCell>{percentage}</TableCell>
              </TableRow>
            );
          })}
          <TableRow className="bg-pink-300 font-bold dark:bg-dark">
            <TableCell colSpan={2}>Total General</TableCell>
            <TableCell>{total.enero}</TableCell>
            <TableCell>{total.febrero}</TableCell>
            <TableCell>{total.marzo}</TableCell>
            <TableCell>{total.abril}</TableCell>
            <TableCell>{total.mayo}</TableCell>
            <TableCell>{total.junio}</TableCell>
            <TableCell>{total.julio}</TableCell>
            <TableCell>{total.agosto}</TableCell>
            <TableCell>{total.septiembre}</TableCell>
            <TableCell>{total.octubre}</TableCell>
            <TableCell>{total.noviembre}</TableCell>
            <TableCell>{total.diciembre}</TableCell>
            <TableCell>{total.total}</TableCell>
            <TableCell>{((total.total / total.total) * 100).toFixed(1)}%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}