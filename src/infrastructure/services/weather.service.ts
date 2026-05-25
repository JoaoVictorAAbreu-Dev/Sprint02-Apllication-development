import axios from 'axios';
import type { OpenMeteoForecastDto } from '@/application/dto/open-meteo.dto';
import { toWeatherSnapshot } from '@/application/mappers/weather.mapper';
import type { Locality } from '@/domain/entities/locality.entity';
import type { WeatherSnapshot } from '@/domain/entities/weather.entity';
import { openMeteoClient } from '@/infrastructure/http/open-meteo.client';

const CURRENT_FIELDS = [
  'temperature_2m',
  'relative_humidity_2m',
  'wind_speed_10m',
  'precipitation',
  'weather_code',
].join(',');

export const weatherService = {
  async getCurrentWeatherByLocality(locality: Locality): Promise<WeatherSnapshot> {
    try {
      const response = await openMeteoClient.get<OpenMeteoForecastDto>('/v1/forecast', {
        params: {
          latitude: locality.latitude,
          longitude: locality.longitude,
          current: CURRENT_FIELDS,
        },
      });

      return toWeatherSnapshot(locality, response.data.current);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Open-Meteo request failed for "${locality.name}"`, { cause: error });
      }

      throw new Error(`Unexpected weather error for "${locality.name}"`, { cause: error });
    }
  },

  async getCurrentWeatherByLocalities(localities: Locality[]): Promise<WeatherSnapshot[]> {
    const snapshots = await Promise.all(localities.map((locality) => this.getCurrentWeatherByLocality(locality)));
    return snapshots;
  },
};
