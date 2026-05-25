import { useEffect } from 'react';
import { latLngBounds } from 'leaflet';
import { useMap } from 'react-leaflet';
import type { WeatherSnapshot } from '@/domain/entities/weather.entity';

type MapAutoFitProps = {
  points: WeatherSnapshot[];
};

export const MapAutoFit = ({ points }: MapAutoFitProps) => {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;

    const bounds = latLngBounds(points.map((item) => [item.latitude, item.longitude]));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
  }, [map, points]);

  return null;
};
