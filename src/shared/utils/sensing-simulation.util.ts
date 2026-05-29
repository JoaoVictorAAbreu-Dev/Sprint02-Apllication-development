import type { WeatherSnapshot } from '@/domain/entities/weather.entity';
import type { SensingSnapshot } from '@/domain/entities/sensing.entity';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
};

export const buildFictitiousSensingSnapshot = (weather: WeatherSnapshot): SensingSnapshot => {
  const baseSeed = Math.abs(weather.latitude * 1000 + weather.longitude * 1000);
  const variationA = pseudoRandom(baseSeed) * 8;
  const variationB = pseudoRandom(baseSeed + 7) * 6;
  const variationC = pseudoRandom(baseSeed + 13) * 18;

  const vegetationStressPct = clamp(weather.temperatureC * 1.7 + weather.windSpeedKmh * 0.7 - weather.humidityPct * 0.3 + variationA, 0, 100);
  const soilMoisturePct = clamp(weather.humidityPct * 0.6 + weather.precipitationMm * 1.8 - weather.temperatureC * 0.4 + variationB, 0, 100);
  const airQualityIndex = Math.round(clamp(45 + weather.windSpeedKmh * 0.9 + weather.temperatureC * 0.8 + variationC, 0, 300));
  const heatFocusC = clamp(weather.temperatureC + weather.windSpeedKmh * 0.1 + variationA * 0.2, weather.temperatureC, 55);

  return {
    localityName: weather.localityName,
    latitude: weather.latitude,
    longitude: weather.longitude,
    vegetationStressPct: Number(vegetationStressPct.toFixed(1)),
    soilMoisturePct: Number(soilMoisturePct.toFixed(1)),
    airQualityIndex,
    heatFocusC: Number(heatFocusC.toFixed(1)),
  };
};
