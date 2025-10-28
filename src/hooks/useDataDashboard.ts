import api from "@/api/api_regiones"
import { formatDataActivities, transformDataState } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react";

interface PropsUseDataDashboard {
    yearGraphics: number;
    yearCard: number;
    monthCard: number;
    yearTables: number;
    }

export function useDataDashboard({ yearGraphics, yearCard, monthCard, yearTables } : PropsUseDataDashboard) {
  // Llamada a la API para obtener los datos de las gráficas
  const { data: chartDataFullMonths, refetch: refetchBar } = useQuery({
    queryKey: ['dataBar', yearGraphics],
    queryFn: () =>
      api.get(`/archievement/statistics/annual/year/${yearGraphics}`).then((res) => res.data.data),
    // enabled: !!yearGraphics,
  })

  const { data: chartDataPieFull, refetch: refetchPie } = useQuery({
    queryKey: ['dataPie', yearGraphics],
    queryFn: () =>
      api.get(`/archievement/statistics/activity/year/${yearGraphics}`).then((res) => res.data.data),
    // enabled: !!yearGraphics,
  })

  // Llamada a la api para obtener datos para las cards
  const { data: dataCardAchievement, refetch: refetchCardAchievement } = useQuery({
    queryKey: ['dataCardAchievement', yearCard, monthCard],
    queryFn: () =>
      api.get(`archievement/total/month/${monthCard + 1}/year/${yearCard}`).then((res) => res.data.data),
    // enabled: !!yearCard && !!monthCard,
  })

  const { data: dataCardActivities, refetch: refetchCardActivities } = useQuery({
    queryKey: ['dataCardActivities', yearCard, monthCard],
    queryFn: () =>
      api.get(`schedule/all/total/month/${monthCard + 1}/year/${yearCard}`).then((res) => res.data.data),
    // enabled: !!yearCard && !!monthCard,
  })

  const { data: dataCardMobileUnits, refetch: refetchCardMobileUnits } = useQuery({
    queryKey: ['dataCardMobileUnits', yearCard, monthCard],
    queryFn: () =>
      api.get(`/mobile_units/scheduled/total/month/${monthCard + 1}/year/${yearCard}`).then((res) => res.data.data),
    // enabled: !!yearCard && !!monthCard,
  })

  // Llamada a la api para obtener datos de las tablas
  const { data: dataTableState, refetch: refetchTableState } = useQuery({
    queryKey: ['dataTableState', yearTables],
    queryFn: () =>
      api.get(`/archievement/statistics/table_state/year/${yearTables}`).then((res) => res.data.data),
    // enabled: !!yearTableState,
  })

  const { data: dataTableActivities, refetch: refetchTableActivities } = useQuery({
    queryKey: ['dataTableActivities', yearTables],
    queryFn: () =>
      api.get(`/archievement/statistics/table_activity/year/${yearTables}`).then((res) => res.data.data),
    // enabled: !!yearTableActivities,
  })

  const { data: dataTableMonths, refetch: refetchTableMonths } = useQuery({
    queryKey: ['dataTableMonths', yearTables],
    queryFn: () =>
      api.get(`archievement/statistics/table_annual/year/${yearTables}`).then((res) => res.data.data),
    // enabled: !!yearTableActivities,
  })

  const { data: dataTableGender, refetch: refetchTableGender } = useQuery({
    queryKey: ['dataTableGender', yearTables],
    queryFn: () =>
      api.get(`/archievement/statistics/table_gender/year/${yearTables}`).then((res) => res.data.data),
    // enabled: !!yearTableActivities,
  })

  const stateData = transformDataState(dataTableState);
  const activityData = formatDataActivities(dataTableActivities);

  //Refecth de las gráficas
  useEffect(() => {
    if (yearGraphics) {
      refetchBar();
      refetchPie();
    }

  }, [yearGraphics, refetchBar, refetchPie,]);


  //Refecth de las cards
  useEffect(() => {
    if (yearCard && monthCard) {
      refetchCardAchievement();
      refetchCardActivities();
      refetchCardMobileUnits();
    }
  }, [yearCard, monthCard, refetchCardAchievement, refetchCardActivities, refetchCardMobileUnits]);

  //Refecth de las tablas
  useEffect(() => {
    if (yearTables) {
      refetchTableState();
      refetchTableActivities();
      refetchTableMonths();
      refetchTableGender();
    }
  }, [yearTables, refetchTableState, refetchTableActivities, refetchTableGender, refetchTableMonths]);
    return { chartDataFullMonths, chartDataPieFull, dataCardAchievement, dataCardActivities, dataCardMobileUnits, stateData, activityData, dataTableMonths, dataTableGender };
}