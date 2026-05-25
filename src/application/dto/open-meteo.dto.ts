export type OpenMeteoCurrentDto = {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  precipitation: number;
  weather_code: number;
};

export type OpenMeteoForecastDto = {
  current: OpenMeteoCurrentDto;
};
