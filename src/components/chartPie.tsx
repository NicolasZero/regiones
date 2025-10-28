"use client"

import { Pie, PieChart, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label"


interface ChartDataPie {
    chartDataPie: {

        activity: string,

        done: number,

        fill: string

    }[]
    id?: string
    year: number
}

const chartConfig = {
  done: {
    label: "Completado",
  },
  // asesoríaLegal: {
  //   label: "Asesoría Legal",
  //   color: "hsl(var(--chart-1))",
  // },
  // atenciónGinecológica: {
  //   label: "Atención Ginecológica",
  //   color: "hsl(var(--chart-2))",
  // },
} satisfies ChartConfig;


export function ChartDataPie({ chartDataPie,id, year }: ChartDataPie) {
  return (
    <Card className="flex flex-col w-full md:w-[350px]" id={id}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">Mayor cantidades de actividades completadas</CardTitle>
        <CardDescription>Enero - Diciembre {year}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartDataPie} dataKey="done" label nameKey="activity" />
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
