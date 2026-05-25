import { describe, expect, it } from 'vitest';
import { toWeatherSnapshot } from '@/application/mappers/weather.mapper';
import type { Locality } from '@/domain/entities/locality.entity';
import type { OpenMeteoCurrentDto } from '@/application/dto/open-meteo.dto';

describe('weather.mapper', () => {
  it('maps open meteo payload into weather snapshot', () => {
    const locality: Locality = {
      id: '1',
      name: 'Campinas',
      latitude: -22.9,
      longitude: -47.06,
      country: 'Brasil',
      state: 'SP',
    };

    const current: OpenMeteoCurrentDto = {
      time: '2026-05-25T09:00',
      interval: 900,
      temperature_2m: 29,
      relative_humidity_2m: 70,
      precipitation: 12,
      weather_code: 63,
      wind_speed_10m: 24,
    };

    const result = toWeatherSnapshot(locality, current);

    expect(result.localityName).toBe('Campinas');
    expect(result.temperatureC).toBe(29);
    expect(result.weatherCondition).toBe('Chuva moderada');
  });
});

