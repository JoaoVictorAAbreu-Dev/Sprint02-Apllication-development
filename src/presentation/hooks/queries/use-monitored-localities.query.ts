import { useQuery } from '@tanstack/react-query';
import { sensingService } from '@/infrastructure/services/sensing.service';
import { queryKeys } from '@/shared/constants/query-keys';

type UseMonitoredLocalitiesParams = {
  region?: string;
  limit?: number;
};

export const useMonitoredLocalitiesQuery = (params?: UseMonitoredLocalitiesParams) => {
  return useQuery({
    queryKey: [...queryKeys.sensing, params?.region ?? 'default-region', params?.limit ?? 10],
    queryFn: () => sensingService.getMonitoredLocalities(params),
    staleTime: 5 * 60 * 1000,
  });
};
