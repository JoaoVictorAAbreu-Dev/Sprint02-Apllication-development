import type { WeatherSnapshot } from '@/domain/entities/weather.entity';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export type RiskLevel = 'Baixo' | 'Moderado' | 'Alto' | 'Critico';

export const calculateRiskScore = (item: WeatherSnapshot) => {
  const temperatureFactor = clamp(((item.temperatureC - 20) / 25) * 100, 0, 100);
  const windFactor = clamp(((item.windSpeedKmh - 10) / 50) * 100, 0, 100);
  const precipitationFactor = clamp((item.precipitationMm / 30) * 100, 0, 100);

  return clamp(
    temperatureFactor * 0.45 + windFactor * 0.35 + precipitationFactor * 0.2,
    0,
    100,
  );
};

export const isAlertPoint = (item: WeatherSnapshot) =>
  item.temperatureC >= 35 || item.windSpeedKmh >= 45 || item.precipitationMm >= 20;

export const getRiskLevel = (score: number): RiskLevel => {
  if (score >= 75) return 'Critico';
  if (score >= 50) return 'Alto';
  if (score >= 25) return 'Moderado';
  return 'Baixo';
};
