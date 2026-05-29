import { describe, expect, it } from 'vitest';
import { buildFictitiousSensingSnapshot } from '@/shared/utils/sensing-simulation.util';
import type { WeatherSnapshot } from '@/domain/entities/weather.entity';

const weatherSample: WeatherSnapshot = {
  localityName: 'Sao Paulo',
  latitude: -23.55,
  longitude: -46.63,
  temperatureC: 31,
  humidityPct: 62,
  windSpeedKmh: 24,
  precipitationMm: 3,
  weatherCondition: 'Parcialmente nublado',
  observedAt: '2026-05-29T12:00',
};

describe('sensing-simulation.util', () => {
  it('generates deterministic sensing values for the same point', () => {
    const first = buildFictitiousSensingSnapshot(weatherSample);
    const second = buildFictitiousSensingSnapshot(weatherSample);

    expect(first).toEqual(second);
  });

  it('keeps sensing values inside expected ranges', () => {
    const result = buildFictitiousSensingSnapshot(weatherSample);

    expect(result.vegetationStressPct).toBeGreaterThanOrEqual(0);
    expect(result.vegetationStressPct).toBeLessThanOrEqual(100);
    expect(result.soilMoisturePct).toBeGreaterThanOrEqual(0);
    expect(result.soilMoisturePct).toBeLessThanOrEqual(100);
    expect(result.airQualityIndex).toBeGreaterThanOrEqual(0);
    expect(result.airQualityIndex).toBeLessThanOrEqual(300);
    expect(result.heatFocusC).toBeGreaterThanOrEqual(weatherSample.temperatureC);
  });
});
