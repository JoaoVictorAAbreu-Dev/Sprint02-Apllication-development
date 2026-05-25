import { MapContainer, TileLayer } from 'react-leaflet';
import type { WeatherSnapshot } from '@/domain/entities/weather.entity';
import { MapAutoFit } from '@/presentation/components/map/map-auto-fit';
import { RiskMarker } from '@/presentation/components/map/risk-marker';

type MonitoringMapProps = {
  points: WeatherSnapshot[];
};

export const MonitoringMap = ({ points }: MonitoringMapProps) => {
  return (
    <MapContainer
      center={[-14.235, -51.9253]}
      zoom={4}
      scrollWheelZoom
      className="h-[560px] w-full rounded-xl border border-slate-200"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapAutoFit points={points} />

      {points.map((point) => (
        <RiskMarker
          key={`${point.localityName}-${point.latitude}-${point.longitude}`}
          weather={point}
        />
      ))}
    </MapContainer>
  );
};
