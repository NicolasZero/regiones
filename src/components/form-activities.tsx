"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from "react"
import ActivitiesCommonsForm from "./form-activities-commons"
import { Separator } from "@radix-ui/react-select"
import VictimsForm from "./victims-form"
import MurderFemaleForm from "./form-murder-famale"
import Form0800 from "./form-0800"
import { gerency as gerencyOptions, actionsOptions} from "@/lib/utils"
import useActivitieOptions from "@/hooks/useActivitieOptions"
import type { Activity } from "@/lib/types"


export default function FormActivities() {
  const [activitie, setActivitie] = useState<Activity | string>("");
  const [action, setAction] = useState("")
  const [gerency, setGerency] = useState("")

  const {activitieOption} = useActivitieOptions(action)

  const renderFormCommons = activitie !== "" && activitie !== "5" && activitie !== "6" && activitie !== "16"
  const renderFormVictims = activitie == "5"
  const renderFormMurderFemale = activitie == "6"
  const renderForm0800 = activitie == "16"

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 w-full ">
        {/* -----Gerencia----- */}
        <div className="flex flex-col flex-1">
          <label htmlFor="gerencia-select" className="mb-2 text-sm font-semibold">Gerencia</label>
          <Select value={gerency} onValueChange={(value) => setGerency(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              {gerencyOptions.map((gerency) => (
                <SelectItem key={gerency.id} value={gerency.label}>{gerency.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* -----Action----- */}
        <div className="flex flex-col flex-1">
          <label htmlFor="action-select" className="mb-2 text-sm font-semibold">Acciones</label>
          <Select value={action} onValueChange={(value) => setAction(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>
            <SelectContent>
              {actionsOptions.map((action) => (
                <SelectItem key={action.id} value={action.label}>{action.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* -----Actividades----- */}
        <div className="flex flex-col flex-1">
          <label htmlFor="activitie-select" className="mb-2 text-sm font-semibold">Actividades</label>
          <Select value={typeof activitie === 'string' ? activitie : undefined} onValueChange={(value) => setActivitie(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccione" />
            </SelectTrigger>

            <SelectContent>
              {activitieOption?.map((activity: Activity) => (
                <SelectItem key={activity.id} value={activity.id.toString()}>{activity.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>


      {renderFormCommons &&

        <div className="lg:h-[400px]">
          <Separator className="my-4 border" />
          <ActivitiesCommonsForm gerency={gerency} action={action} activitie={typeof activitie === 'string' ? activitie : ''} />
        </div>}

      {renderFormVictims &&
        <div className="lg:h-[300px]">
          <Separator className="my-4 border" />
          <VictimsForm gerency={gerency} action={action} activitie={activitie} />
        </div>}

      {renderFormMurderFemale &&
        <div className="lg:h-[300px]">
          <Separator className="my-4 border" />
          <MurderFemaleForm gerency={gerency} action={action} activitie={activitie} />
        </div>}

      {renderForm0800 &&
        <div className="lg:h-[300px]">
          <Separator className="my-4 border" />
          <Form0800 gerency={gerency} action={action} activitie={activitie} />
        </div>}

    </>
  )
}