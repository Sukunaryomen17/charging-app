import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import api from '../api';
import 'leaflet/dist/leaflet.css';

export default function MapPage() {
  const [chargers, setChargers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/stations');
      setChargers(res.data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ height: '90vh' }}>
      <MapContainer center={[20, 77]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {chargers.map(c => (
          <Marker key={c._id} position={[c.location.latitude, c.location.longitude]}>
            <Popup>
              <strong>{c.name}</strong><br />
              Status: {c.status}<br />
              Power: {c.powerOutput}kW<br />
              Connector: {c.connectorType}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
