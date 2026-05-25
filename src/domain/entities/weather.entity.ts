export type WeatherSnapshot = {
  localityName: string;
  latitude: number;
  longitude: number;
  temperatureC: number;
  humidityPct: number;
  windSpeedKmh: number;
  precipitationMm: number;
  weatherCondition: string;
  observedAt: string;
};
