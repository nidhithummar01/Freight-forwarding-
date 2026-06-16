import { useNavigate } from 'react-router-dom';
import { Package, Truck, ClipboardCheck, CheckCircle2, PlusCircle, List, MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAppData } from '../context/useAppData.js';

const METRICS = [
  { key: 'totalShipments', label: 'Total Shipments', icon: Package, color: 'var(--primary)', bg: 'var(--primary-light)' },
  { key: 'inTransit', label: 'In Transit', icon: Truck, color: '#b8720a', bg: 'var(--accent-light)' },
  { key: 'pendingBookings', label: 'Pending Bookings', icon: ClipboardCheck, color: 'var(--warning)', bg: 'var(--warning-bg)' },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle2, color: 'var(--success)', bg: 'var(--success-bg)' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { dashboardMetrics, shipments } = useAppData();
  const recent = shipments.slice(-5).reverse();

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of all shipments, bookings, and tracking activity" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginBottom: 24 }}>
        {METRICS.map(({ key, label, icon: Icon, color, bg }) => (
          <Card key={key}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} color={color} />
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{dashboardMetrics[key]}</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
        <Card title="Recent Shipments">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>ID</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Route</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Mode</th>
                <th style={{ padding: '8px 6px', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => navigate(`/shipments/${s.id}`)}
                  style={{ cursor: 'pointer', borderTop: '1px solid var(--border)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '10px 6px', fontWeight: 600, color: 'var(--primary)' }}>{s.id}</td>
                  <td style={{ padding: '10px 6px' }}>{s.origin} &rarr; {s.destination}</td>
                  <td style={{ padding: '10px 6px' }}>{s.mode}</td>
                  <td style={{ padding: '10px 6px' }}><StatusBadge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Quick Actions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Create Shipment', icon: PlusCircle, to: '/shipments/create' },
              { label: 'View All Shipments', icon: List, to: '/shipments' },
              { label: 'Track a Shipment', icon: MapPin, to: '/tracking' },
            ].map(({ label, icon: Icon, to }) => (
              <button
                key={to}
                onClick={() => navigate(to)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 14px',
                  borderRadius: 8,
                  border: '1px solid var(--border)',
                  background: 'var(--bg)',
                  color: 'var(--text)',
                  fontWeight: 500,
                  fontSize: '0.88rem',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--primary-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg)')}
              >
                <Icon size={18} color="var(--primary)" />
                {label}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
