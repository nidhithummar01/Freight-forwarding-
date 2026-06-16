import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAppData } from '../context/useAppData.js';

const row = { display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: '0.88rem' };

export default function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, shipments, updateBookingStatus } = useAppData();
  const booking = bookings.find((b) => b.id === id);
  const shipment = booking ? shipments.find((s) => s.id === booking.shipmentId) : null;
  const [updated, setUpdated] = useState(false);

  if (!booking) {
    return (
      <div>
        <PageHeader title="Booking Not Found" />
        <Card>This booking does not exist in the mock dataset.</Card>
      </div>
    );
  }

  const updateStatus = (next) => {
    updateBookingStatus(id, next);
    setUpdated(true);
  };

  return (
    <div>
      <button onClick={() => navigate('/bookings')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, marginBottom: 14, padding: 0 }}>
        <ArrowLeft size={16} /> Back to Bookings
      </button>

      <PageHeader title={booking.id} subtitle={`Booking for ${booking.shipmentId}`} action={<StatusBadge status={booking.status} />} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Card title="Booking Information">
          <div style={row}><span style={{ color: 'var(--text-muted)' }}>Carrier</span><strong>{booking.carrier}</strong></div>
          <div style={row}><span style={{ color: 'var(--text-muted)' }}>Vessel / Flight</span><strong>{booking.vesselFlight}</strong></div>
          <div style={row}><span style={{ color: 'var(--text-muted)' }}>Depart Date</span><strong>{booking.departDate}</strong></div>
          <div style={{ ...row, borderBottom: 'none' }}><span style={{ color: 'var(--text-muted)' }}>Status</span><StatusBadge status={booking.status} /></div>

          {updated && (
            <p style={{ marginTop: 12, fontSize: '0.8rem', color: 'var(--success)' }}>Status updated (mock action — not persisted).</p>
          )}

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {['Pending', 'Confirmed', 'Rejected'].map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={s === booking.status}
                style={{
                  padding: '8px 14px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 600,
                  border: '1px solid var(--border)',
                  background: s === booking.status ? 'var(--bg)' : '#fff',
                  color: s === booking.status ? 'var(--text-soft)' : 'var(--text)',
                  cursor: s === booking.status ? 'not-allowed' : 'pointer',
                }}
              >
                Mark {s}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Linked Shipment">
          {shipment ? (
            <>
              <div style={row}><span style={{ color: 'var(--text-muted)' }}>Shipment ID</span>
                <Link to={`/shipments/${shipment.id}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{shipment.id}</Link>
              </div>
              <div style={row}><span style={{ color: 'var(--text-muted)' }}>Route</span><strong>{shipment.origin} → {shipment.destination}</strong></div>
              <div style={row}><span style={{ color: 'var(--text-muted)' }}>Cargo Type</span><strong>{shipment.cargoType}</strong></div>
              <div style={row}><span style={{ color: 'var(--text-muted)' }}>Weight</span><strong>{shipment.weight}</strong></div>
              <div style={{ ...row, borderBottom: 'none' }}><span style={{ color: 'var(--text-muted)' }}>Shipment Status</span><StatusBadge status={shipment.status} /></div>
            </>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Linked shipment not found.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
