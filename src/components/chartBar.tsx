"use client"

import { Bar, BarChart, CartesianGrid, XAxis, Legend, LabelList } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A multiple bar chart"

interface ChartData {
  chartData: {

    month: string,

    completado: number,

    no_completado: number

  }[]
  id?: string
  year: number
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function StatisticsBar({ chartData, id, year }: ChartData) {
  return (
    <Card className="w-full" id={id}>
      <CardHeader>
        <CardTitle>Estadística de barra - Logros por meses</CardTitle>
        <CardDescription>Enero - {chartData?.at(-1)?.month} {year}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed"
              />}
            />
            <Bar dataKey="completado" label="Completado" fill="var(--success)" radius={4}>
              <LabelList dataKey="completado" position="bottom"/>
            </Bar>
            <Bar dataKey="no_completado" fill="var(--warning)" radius={4}>
              <LabelList dataKey="no_completado" position="bottom" />
            </Bar>
            <Legend />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
      </CardFooter>
    </Card>
  )
}