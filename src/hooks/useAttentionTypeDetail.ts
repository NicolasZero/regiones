import api from '@/api/api_regiones';
import { AttentionType } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

export function useAttentionTypeDetails(actividadId: string) {
    const { data: attentionTypes, isLoading, error } = useQuery<AttentionType>({
        queryKey: ["attentionTypes", actividadId],
        queryFn: () =>
          api
            .get(`/mobile_units/details/${actividadId}`)
            .then((res) => res.data.data),
    });
    return { attentionTypes, isLoading, error };
}