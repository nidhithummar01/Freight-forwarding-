import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Download, MapPin } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { useAppData } from '../context/useAppData.js';

const row = { display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid var(--border)', fontSize: '0.88rem' };

export default function ShipmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { shipments, documents, bookings, tracking } = useAppData();
  const shipment = shipments.find((s) => s.id === id);
  const docs = documents.filter((d) => d.shipmentId === id);
  const booking = bookings.find((b) => b.shipmentId === id);
  const track = tracking[id];

  if (!shipment) {
    return (
      <div>
        <PageHeader title="Shipment Not Found" />
        <Card>This shipment does not exist in the mock dataset.</Card>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate('/shipments')} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, marginBottom: 14, padding: 0 }}>
        <ArrowLeft size={16} /> Back to Shipments
      </button>

      <PageHeader title={shipment.id} subtitle={`${shipment.origin} → ${shipment.destination}`} action={<StatusBadge status={shipment.status} />} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <Card title="Shipment Information">
          <div style={row}><span style={{ color: 'var(--text-muted)' }}>Origin</span><strong>{shipment.origin}</strong></div>
          <div style={row}><span style={{ color: 'var(--text-muted)' }}>Destination</span><strong>{shipment.destination}</strong></div>
          <div style={row}><span style={{ color: 'var(--text-muted)' }}>Cargo Type</span><strong>{shipment.cargoType}</strong></div>
          <div style={row}><span style={{ color: 'var(--text-muted)' }}>Weight</span><strong>{shipment.weight}</strong></div>
          <div style={row}><span style={{ color: 'var(--text-muted)' }}>Transport Mode</span><strong>{shipment.mode}</strong></div>
          <div style={{ ...row, borderBottom: 'none' }}><span style={{ color: 'var(--text-muted)' }}>Created</span><strong>{shipment.created}</strong></div>
        </Card>

        <Card title="Booking Information">
          {booking ? (
            <>
              <div style={row}><span style={{ color: 'var(--text-muted)' }}>Booking ID</span>
                <Link to={`/bookings/${booking.id}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{booking.id}</Link>
              </div>
              <div style={row}><span style={{ color: 'var(--text-muted)' }}>Carrier</span><strong>{booking.carrier}</strong></div>
              <div style={row}><span style={{ color: 'var(--text-muted)' }}>Vessel / Flight</span><strong>{booking.vesselFlight}</strong></div>
              <div style={row}><span style={{ color: 'var(--text-muted)' }}>Depart Date</span><strong>{booking.departDate}</strong></div>
              <div style={{ ...row, borderBottom: 'none' }}><span style={{ color: 'var(--text-muted)' }}>Status</span><StatusBadge status={booking.status} /></div>
            </>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No carrier booking has been made for this shipment yet.</p>
          )}
        </Card>

        <Card title="Documents">
          {docs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {docs.map((d) => (
                <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: 'var(--bg)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileText size={16} color="var(--primary)" />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{d.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-soft)' }}>{d.type} &middot; {d.uploadDate}</div>
                    </div>
                  </div>
                  <button title="Mock download" style={{ background: 'none', border: 'none', color: 'var(--primary)' }}>
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No documents uploaded for this shipment.</p>
          )}
        </Card>

        <Card title="Status Timeline">
          {track ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {track.history.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: i === track.history.length - 1 ? 'var(--accent)' : 'var(--primary)' }} />
                    {i < track.history.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--border)', minHeight: 24 }} />}
                  </div>
                  <div style={{ paddingBottom: 16 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.86rem' }}>{h.status}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{h.location} &middot; {h.date}</div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => navigate('/tracking')}
                style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff', fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}
              >
                <MapPin size={14} /> View Full Tracking
              </button>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No tracking data available yet.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
