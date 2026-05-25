import { useQuery } from '@tanstack/react-query';
import type { Locality } from '@/domain/entities/locality.entity';
import { weatherService } from '@/infrastructure/services/weather.service';
import { queryKeys } from '@/shared/constants/query-keys';

export const useCurrentWeatherByLocalitiesQuery = (localities: Locality[]) => {
  // A chave inclui coordenadas para invalidar cache quando a lista de pontos muda.
  const localityKey = localities.map((item) => `${item.latitude},${item.longitude}`).join('|');

  return useQuery({
    queryKey: [...queryKeys.sensingWeather, localityKey],
    queryFn: () => weatherService.getCurrentWeatherByLocalities(localities),
    enabled: localities.length > 0,
    staleTime: 2 * 60 * 1000,
  });
};
