import { describe, expect, it } from 'vitest';
import { calculateRiskScore, getRiskLevel, isAlertPoint } from '@/shared/utils/risk.util';
import type { WeatherSnapshot } from '@/domain/entities/weather.entity';

const baseSnapshot: WeatherSnapshot = {
  localityName: 'Sao Paulo',
  latitude: -23.55,
  longitude: -46.63,
  temperatureC: 25,
  humidityPct: 60,
  windSpeedKmh: 20,
  precipitationMm: 5,
  weatherCondition: 'Nublado',
  observedAt: '2026-05-25T12:00',
};

describe('risk.util', () => {
  it('calculates score within expected range', () => {
    const score = calculateRiskScore(baseSnapshot);

    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('returns critical risk for high score', () => {
    expect(getRiskLevel(80)).toBe('Critico');
  });

  it('marks alert points when thresholds are exceeded', () => {
    const alert = isAlertPoint({
      ...baseSnapshot,
      windSpeedKmh: 50,
    });

    expect(alert).toBe(true);
  });
});

