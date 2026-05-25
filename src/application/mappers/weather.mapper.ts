import type { OpenMeteoCurrentDto } from '@/application/dto/open-meteo.dto';
import type { Locality } from '@/domain/entities/locality.entity';
import type { WeatherSnapshot } from '@/domain/entities/weather.entity';

const weatherCodeMap: Record<number, string> = {
  0: 'Céu limpo',
  1: 'Predominantemente limpo',
  2: 'Parcialmente nublado',
  3: 'Nublado',
  45: 'Neblina',
  48: 'Neblina com geada',
  51: 'Garoa fraca',
  53: 'Garoa moderada',
  55: 'Garoa intensa',
  61: 'Chuva fraca',
  63: 'Chuva moderada',
  65: 'Chuva forte',
  71: 'Neve fraca',
  73: 'Neve moderada',
  75: 'Neve forte',
  80: 'Pancadas fracas',
  81: 'Pancadas moderadas',
  82: 'Pancadas fortes',
  95: 'Tempestade',
  96: 'Tempestade com granizo fraco',
  99: 'Tempestade com granizo forte',
};

const getWeatherCondition = (code: number) => weatherCodeMap[code] ?? 'Condição indisponível';

export const toWeatherSnapshot = (locality: Locality, current: OpenMeteoCurrentDto): WeatherSnapshot => {
  // Converte o contrato externo da API para o formato de dominio consumido pela UI.
  return {
    localityName: locality.name,
    latitude: locality.latitude,
    longitude: locality.longitude,
    temperatureC: current.temperature_2m,
    humidityPct: current.relative_humidity_2m,
    windSpeedKmh: current.wind_speed_10m,
    precipitationMm: current.precipitation,
    weatherCondition: getWeatherCondition(current.weather_code),
    observedAt: current.time,
  };
};
