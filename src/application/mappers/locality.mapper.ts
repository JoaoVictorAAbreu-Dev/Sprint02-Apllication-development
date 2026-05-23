import type { NominatimLocalityDto } from '@/application/dto/nominatim.dto';
import type { Locality } from '@/domain/entities/locality.entity';

export const toLocality = (item: NominatimLocalityDto): Locality => {
  const primaryName = item.display_name.split(',')[0]?.trim();

  return {
    name: primaryName || item.display_name,
    latitude: Number(item.lat),
    longitude: Number(item.lon),
  };
};
