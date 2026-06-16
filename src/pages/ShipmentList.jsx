import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, PlusCircle, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAppData } from '../context/useAppData.js';

const STATUSES = ['All', 'Pending', 'Booked', 'In Transit', 'Delivered'];

export default function ShipmentList() {
  const navigate = useNavigate();
  const { shipments } = useAppData();
  const [status, setStatus] = useState('All');
  const [origin, setOrigin] = useState('All');
  const [destination, setDestination] = useState('All');
  const [query, setQuery] = useState('');

  const origins = useMemo(() => ['All', ...new Set(shipments.map((s) => s.origin))], [shipments]);
  const destinations = useMemo(() => ['All', ...new Set(shipments.map((s) => s.destination))], [shipments]);

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      const matchesStatus = status === 'All' || s.status === status;
      const matchesOrigin = origin === 'All' || s.origin === origin;
      const matchesDestination = destination === 'All' || s.destination === destination;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q || [s.id, s.origin, s.destination].some((v) => v.toLowerCase().includes(q));
      return matchesStatus && matchesOrigin && matchesDestination && matchesQuery;
    });
  }, [destination, origin, query, shipments, status]);

  return (
    <div>
      <PageHeader
        title="Shipments"
        subtitle={`${filtered.length} of ${shipments.length} shipments`}
        action={
          <button
            onClick={() => navigate('/shipments/create')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600 }}
          >
            <PlusCircle size={16} /> Create Shipment
          </button>
        }
      />

      <Card style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--text-soft)' }} />
            <input
              placeholder="Search by ID, origin, or destination"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: '100%', padding: '9px 12px 9px 36px', borderRadius: 8, border: '1px solid var(--border)' }}
            />
          </div>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            style={{ minWidth: 180, padding: '9px 10px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff' }}
          >
            {origins.map((value) => <option key={value} value={value}>{value === 'All' ? 'All Origins' : value}</option>)}
          </select>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            style={{ minWidth: 180, padding: '9px 10px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff' }}
          >
            {destinations.map((value) => <option key={value} value={value}>{value === 'All' ? 'All Destinations' : value}</option>)}
          </select>
          <div style={{ display: 'flex', gap: 6 }}>
            {STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 8,
                  border: '1px solid ' + (status === s ? 'var(--primary)' : 'var(--border)'),
                  background: status === s ? 'var(--primary)' : '#fff',
                  color: status === s ? '#fff' : 'var(--text)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '8px 6px' }}>Shipment ID</th>
              <th style={{ padding: '8px 6px' }}>Origin</th>
              <th style={{ padding: '8px 6px' }}>Destination</th>
              <th style={{ padding: '8px 6px' }}>Cargo Type</th>
              <th style={{ padding: '8px 6px' }}>Mode</th>
              <th style={{ padding: '8px 6px' }}>Status</th>
              <th style={{ padding: '8px 6px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                onClick={() => navigate(`/shipments/${s.id}`)}
                style={{ cursor: 'pointer', borderTop: '1px solid var(--border)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '12px 6px', fontWeight: 600, color: 'var(--primary)' }}>{s.id}</td>
                <td style={{ padding: '12px 6px' }}>{s.origin}</td>
                <td style={{ padding: '12px 6px' }}>{s.destination}</td>
                <td style={{ padding: '12px 6px' }}>{s.cargoType}</td>
                <td style={{ padding: '12px 6px' }}>{s.mode}</td>
                <td style={{ padding: '12px 6px' }}><StatusBadge status={s.status} /></td>
                <td style={{ padding: '12px 6px', textAlign: 'right' }}><ChevronRight size={16} color="var(--text-soft)" /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No shipments match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
