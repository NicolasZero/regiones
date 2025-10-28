"use client"

import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {exportTableStates} from "@/lib/exportExcelDashboard"


interface PropsExpadableStateTable {
  stateData: {
    id: number
    name: string
    total: number
    percentage: string
    activities: {
      name: string
      total: number
    }[]
  }[]
  yearTables: number
}

export default function ExpandableStateTable({ stateData, yearTables }: PropsExpadableStateTable) {
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setExpandedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    )
  }

  const totalSum = stateData?.reduce((sum, state) => sum + state.total, 0)

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl text-center font-bold text-black dark:text-white">Enero - Diciembre - {yearTables}</h2>
      <Button onClick={() => exportTableStates(stateData, yearTables)} className="bg-primary text-white mb-4 ">Exportar a Excel</Button>
      <Table>
        <TableHeader>
          <TableRow >
            <TableHead className="w-[100px] bg-primary text-white font-bold">Estados</TableHead>
            <TableHead className="bg-primary text-white font-bold">Total acumulado</TableHead>
            <TableHead className="bg-primary text-white font-bold">%</TableHead>
            <TableHead className="w-[100px] bg-primary text-white font-bold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stateData?.map((state) => (
            <>
              <TableRow key={state.name} className={` dark:bg-dark dark:text-dark-foreground text-black transition-max-height duration-500 ease-in-out overflow-hidden ${expandedRows.includes(state.id) ? 'max-h-96' : 'max-h-0'}`} onClick={() => toggleRow(state.id)}>
                <TableCell>{state.name}</TableCell>
                <TableCell>{state.total}</TableCell>
                <TableCell>{`${((state.total / totalSum) * 100).toFixed(1)}%`}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    // onClick={() => toggleRow(state.id)}
                    className="p-0"
                  >
                    {expandedRows.includes(state.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
              <AnimatePresence>
                {expandedRows.includes(state.id) && (
                  <TableRow>
                    <TableCell colSpan={4}>
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="p-4">
                          <h4 className="font-bold mb-2 text-black dark:text-white">Actividades:</h4>
                          <ul className="list-disc list-inside text-black dark:text-white">
                            {state.activities.map((activity, index) => (
                              <li key={index}>
                                {activity.name}: {activity.total}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                )}
              </AnimatePresence>
            </>
          ))}
          <TableRow className="bg-pink-100 text-black font-bold dark:bg-dark dark:text-dark-foreground">
            <TableCell>Total</TableCell>
            <TableCell>{totalSum}</TableCell>
            <TableCell>100%</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}