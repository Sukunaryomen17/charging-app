import { useEffect, useState } from 'react';
import api from '../api';

export default function DashboardPage() {
  const [chargers, setChargers] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', powerOutput: '', status: 'Active', connectorType: '' });
  const [editingId, setEditingId] = useState(null);

  const loadChargers = async () => {
    const res = await api.get('/stations');
    setChargers(res.data);
  };

  useEffect(() => {
    loadChargers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [lat, lng] = form.location.split(',').map(Number);
    const payload = {
      ...form,
      location: { latitude: lat, longitude: lng }
    };

    if (editingId) {
      await api.put(`/stations/${editingId}`, payload);
    } else {
      await api.post('/stations', payload);
    }

    setForm({ name: '', location: '', powerOutput: '', status: 'Active', connectorType: '' });
    setEditingId(null);
    loadChargers();
  };

  const handleDelete = async (id) => {
    await api.delete(`/stations/${id}`);
    loadChargers();
  };

  const handleEdit = (charger) => {
    setForm({
      name: charger.name,
      location: `${charger.location.latitude},${charger.location.longitude}`,
      powerOutput: charger.powerOutput,
      status: charger.status,
      connectorType: charger.connectorType
    });
    setEditingId(charger._id);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" />
        <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Lat,Lng" />
        <input value={form.powerOutput} onChange={e => setForm({ ...form, powerOutput: e.target.value })} placeholder="Power (kW)" />
        <input value={form.connectorType} onChange={e => setForm({ ...form, connectorType: e.target.value })} placeholder="Connector Type" />
        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Add'} Station</button>
      </form>

      <h3>Stations</h3>
      <ul>
        {chargers.map(c => (
          <li key={c._id}>
            <strong>{c.name}</strong> ({c.status}) - {c.powerOutput}kW
            <br />
            <button onClick={() => handleEdit(c)}>Edit</button>
            <button onClick={() => handleDelete(c._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
