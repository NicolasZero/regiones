"use client"
import { StatisticsBar } from "@/components/chartBar";
import { ChartDataPie } from "@/components/chartPie";
import CardDashboard from "@/components/card-dashboard";
import { Award, CalendarCheck, Ambulance } from "lucide-react"
import ProtectedRoute from '../../components/protected-route';
import ActivitiesStatsTable from "@/components/activities-stats";
import MonthlyStatisticsTable from "@/components/monthly-stats";
import ExpandableStateTable from "@/components/states-stats";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMonth, getMonths, getYears,} from "@/lib/utils";
import GenderDataTable from "@/components/GenderDataTable";
import { useDataDashboard } from "@/hooks/useDataDashboard";

export default function Page() {
  const yearActual = new Date().getFullYear();
  const monthActual = new Date().getMonth();
  const startYear = 2025; // Año inicial
  const startMonth = 0; // Mes inicial
  const [yearGraphics, setYearGraphics,] = useState(yearActual);
  const [yearCard, setYearCard] = useState(yearActual) // Año seleccionado
  const [monthCard, setMonthCard] = useState(monthActual) // Mes seleccionado
  const years = getYears(startYear); // Años disponibles
  const months = getMonths(startMonth, yearActual, yearCard);
  const [yearTables, setYearTables] = useState(yearActual) // Año seleccionado para las tablas

  const { chartDataFullMonths, chartDataPieFull, dataCardAchievement, dataCardActivities, dataCardMobileUnits, 
    stateData, activityData, dataTableMonths, dataTableGender }
    = useDataDashboard({ yearGraphics, yearCard, monthCard, yearTables }); // Datos de las gráficas traidos desde el hook


  const chartData1 = chartDataFullMonths?.slice(0, 6)
  const chartData2 = chartDataFullMonths?.slice(6, 12)

  const chartDataPie = chartDataPieFull
    ?.filter((element: any) => element.done > 0)
    ?.sort((a: any, b: any) => b.done - a.done) // Ordenar por 'done' en orden descendente
    ?.slice(0, 5); // Tomar los primeros 5 elementos

  let i = 1

  chartDataPie?.forEach((element: any, index: number) => {
    element.activity = element.activity
    element.fill = `hsl(var(--chart-${(i++)}))`
    element.done = Number(element.done)

  })

  const items = [
    {
      id: 1,
      title: 'Ver estados',
      content: <ExpandableStateTable stateData={stateData} yearTables={yearTables} />
    },
    {
      id: 2,
      title: 'Ver actividades',
      content: <ActivitiesStatsTable data={activityData.data} grandTotal={activityData.grandTotal} yearTables={yearTables} />,
    },
    {
      id: 3,
      title: 'Ver meses',
      content: <MonthlyStatisticsTable data={dataTableMonths} yearTables={yearTables} />,
    },
    {
      id: 4,
      title: 'Ver por genero',
      content: <GenderDataTable data={dataTableGender} yearTables={yearTables} />,
    }

  ]

  return (
    <ProtectedRoute requiredRole={1}>
      <h1 className="text-2xl mb-2">Métricas</h1>


      {/* Filtros para las cards */}
      <div className="flex flex-col md:flex-row justify-center mt-4">
        {yearActual > startYear && (
          <div className="mb-2">
            <Select onValueChange={(value) => setYearCard(Number(value))} >
              <SelectTrigger className="w-auto ml-4">
                <SelectValue placeholder="Seleccionar año" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mb-2">
          <Select onValueChange={(value) => setMonthCard(Number(value))}>
            <SelectTrigger className="w-auto ml-4">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.number} value={month.number.toString()}>
                  {month.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>


      {/* Cards */}
      <div className="flex flex-col gap-4 md:flex-row justify-around mt-2 mb-4 ">
        <CardDashboard title={`Logros completados del mes de ${getMonth(monthCard)}`} content={`+${dataCardAchievement?.count}`} footer={``} Icon={Award} />
        <CardDashboard title={`Actividades agendadas del mes de ${getMonth(monthCard)}`} content={`+${dataCardActivities?.count}`} footer={``} Icon={CalendarCheck} />
        <CardDashboard title={`Unidades móviles agendadas del mes de ${getMonth(monthCard)}`} content={`+${dataCardMobileUnits?.count}`} footer={``} Icon={Ambulance} />
      </div>

      {/* Filtros */}
      {yearActual > startYear &&
        <div className="w-full flex justify-center">
          <Select onValueChange={(value) => setYearGraphics(Number(value))}>
            <SelectTrigger className="w-auto ml-4">
              <SelectValue placeholder="Seleccionar año" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>}

      {/* Gráficas */}
      <div className="flex flex-col gap-4 md:flex-row justify-around mt-4 h-[380px]" id="charts">
        <div className="hidden md:block w-full h-[50px]">
          <StatisticsBar chartData={chartDataFullMonths} id="bar-chart" year={yearGraphics} />
        </div>
        <div >
          <ChartDataPie chartDataPie={chartDataPie} id="pie-chart" year={yearGraphics} />
        </div>
      </div>
      <div className="flex flex-col gap-4 md:hidden ">
        <StatisticsBar chartData={chartData1} id="bar-chart" year={yearGraphics} />
        <StatisticsBar chartData={chartData2} id="bar-chart" year={yearGraphics} />
      </div>
      <div />

      {/* <Button className="mt-4" onClick={printGraphics}>Exportar gráficas</Button> */}

      {/* Datos desglozados */}
      <div className="mt-6">
        <h2 className="text-xl" id="desglozado">Datos desglozados</h2>
        {yearActual > startYear && (
          <div className="mt-2 flex justify-center">
            <Select onValueChange={(value) => setYearTables(Number(value))} >
              <SelectTrigger className="w-auto ml-4">
                <SelectValue placeholder="Seleccionar año" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <Accordion type="single" collapsible >
          {items.map((item) => (
            <AccordionItem key={item.id} value={`item-${item.id}`}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ProtectedRoute >
  );
}
