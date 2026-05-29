import type { NominatimLocalityDto } from '@/application/dto/nominatim.dto';
import { toLocality } from '@/application/mappers/locality.mapper';
import type { Locality } from '@/domain/entities/locality.entity';
import { nominatimClient } from '@/infrastructure/http/nominatim.client';
import { FALLBACK_LOCALITIES } from '@/shared/constants/fallback-localities';

const DEFAULT_MONITORED_REGION = 'Mata Atlantica, Brasil';

type GetLocalitiesParams = {
  region?: string;
  limit?: number;
};

export const sensingService = {
  async getMonitoredLocalities(params?: GetLocalitiesParams): Promise<Locality[]> {
    const limit = params?.limit ?? 10;
    const region = params?.region ?? DEFAULT_MONITORED_REGION;
    const fallback = FALLBACK_LOCALITIES.slice(0, limit);

    try {
      const response = await nominatimClient.get<NominatimLocalityDto[]>('/search', {
        params: {
          q: region,
          format: 'jsonv2',
          limit,
        },
      });

      const apiLocalities = response.data.map(toLocality);
      const merged = [...apiLocalities];
      const seen = new Set(merged.map((item) => `${item.latitude.toFixed(5)},${item.longitude.toFixed(5)}`));

      for (const item of fallback) {
        const key = `${item.latitude.toFixed(5)},${item.longitude.toFixed(5)}`;
        if (seen.has(key)) {
          continue;
        }
        seen.add(key);
        merged.push(item);
      }

      return merged.slice(0, limit);
    } catch {
      return fallback;
    }
  },
};
