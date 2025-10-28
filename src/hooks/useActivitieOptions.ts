import { useEffect, useState } from "react";
import { activities } from "@/lib/utils";

type Activity = {
  id: number;
  name: string;
  label: string;
};

const useActivitieOptions = (actions: string) => {
  const [activitieOption, setActivitieOption] = useState<Activity[]>([]);


  useEffect(() => {
    if (actions === "Atención jurídica") {
      setActivitieOption(activities[0]["Atención jurídica"] || []);
    } else if (actions === "Prevención") {
      setActivitieOption(activities[0]["Prevención"] || []);
    } else if (actions === "Formación") {
      setActivitieOption(activities[0]["Formación"] || []);
    } else if (actions === "OAC") {
      setActivitieOption(activities[0]["OAC"] || []);
    } else {
      setActivitieOption([]);
    }
  }, [actions]);

  return { activitieOption, setActivitieOption };
};

export default useActivitieOptions;
