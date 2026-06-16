import { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAppData } from '../context/useAppData.js';

export default function Tracking() {
  const { shipments, tracking } = useAppData();
  const trackable = shipments.filter((s) => tracking[s.id]);
  const [selectedId, setSelectedId] = useState(trackable[0]?.id || '');
  const shipment = shipments.find((s) => s.id === selectedId);
  const track = tracking[selectedId];

  return (
    <div>
      <PageHeader title="Tracking" subtitle="View real-time location and status history for a shipment" />

      <Card style={{ marginBottom: 18 }}>
        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>Select Shipment</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          style={{ width: 320, padding: '10px 12px', borderRadius: 8, border: '1px solid var(--border)' }}
        >
          {trackable.map((s) => <option key={s.id} value={s.id}>{s.id} — {s.origin} → {s.destination}</option>)}
        </select>
      </Card>

      {shipment && track ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 18 }}>
          <Card title="Live Location (Mock Map)">
            <div
              style={{
                position: 'relative',
                height: 320,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #dceefc 0%, #eef6fb 100%)',
                border: '1px solid var(--border)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'linear-gradient(rgba(15,93,122,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,93,122,0.06) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />
              <div style={{ position: 'relative', textAlign: 'center', zIndex: 1 }}>
                <div style={{ display: 'inline-flex', width: 56, height: 56, borderRadius: '50%', background: 'var(--primary)', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 8px rgba(15,93,122,0.12)' }}>
                  <Navigation size={26} color="#fff" />
                </div>
                <div style={{ marginTop: 12, fontWeight: 700 }}>{track.currentLocation}</div>
                <div style={{ marginTop: 6 }}><StatusBadge status={track.currentStatus} /></div>
              </div>
            </div>
            <p style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--text-soft)' }}>
              Map is a static placeholder. Real implementation would integrate a live carrier tracking API.
            </p>
          </Card>

          <Card title="Status History">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {track.history.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === track.history.length - 1 ? 'var(--accent)' : 'var(--primary)' }} />
                    {i < track.history.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 28 }} />}
                  </div>
                  <div style={{ paddingBottom: 18 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={13} color="var(--text-soft)" /> {h.status}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{h.location} &middot; {h.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        <Card>No tracking data available.</Card>
      )}
    </div>
  );
}
