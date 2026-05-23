import type { NominatimLocalityDto } from '@/application/dto/nominatim.dto';
import { toLocality } from '@/application/mappers/locality.mapper';
import type { Locality } from '@/domain/entities/locality.entity';
import { nominatimClient } from '@/infrastructure/http/nominatim.client';

const DEFAULT_MONITORED_REGION = 'Mata Atlântica, Brasil';

type GetLocalitiesParams = {
  region?: string;
  limit?: number;
};

export const sensingService = {
  async getMonitoredLocalities(params?: GetLocalitiesParams): Promise<Locality[]> {
    const limit = params?.limit ?? 10;
    const region = params?.region ?? DEFAULT_MONITORED_REGION;

    const response = await nominatimClient.get<NominatimLocalityDto[]>('/search', {
      params: {
        q: region,
        format: 'jsonv2',
        limit,
      },
    });

    return response.data.map(toLocality).slice(0, limit);
  },
};
