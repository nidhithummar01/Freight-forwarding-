import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ChevronRight, X } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import StatusBadge from '../components/StatusBadge.jsx';
import { carriers } from '../data/mockData.js';
import { useAppData } from '../context/useAppData.js';

const STATUSES = ['All', 'Pending', 'Confirmed', 'Rejected'];

export default function BookingManagement() {
  const navigate = useNavigate();
  const { bookings, shipments, addBooking } = useAppData();
  const [status, setStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ shipmentId: shipments[0]?.id || '', carrier: carriers[0], vesselFlight: '', departDate: '' });
  const [confirmed, setConfirmed] = useState(false);
  const [createdBooking, setCreatedBooking] = useState(null);

  const filtered = useMemo(() => bookings.filter((b) => status === 'All' || b.status === status), [bookings, status]);

  const shipmentLabel = (id) => {
    const s = shipments.find((sh) => sh.id === id);
    return s ? `${s.id} (${s.origin} → ${s.destination})` : id;
  };

  const submit = (e) => {
    e.preventDefault();
    const booking = addBooking(form);
    setCreatedBooking(booking);
    setConfirmed(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setConfirmed(false);
    setCreatedBooking(null);
    setForm({ shipmentId: shipments[0]?.id || '', carrier: carriers[0], vesselFlight: '', departDate: '' });
  };

  return (
    <div>
      <PageHeader
        title="Bookings"
        subtitle={`${filtered.length} of ${bookings.length} bookings`}
        action={
          <button
            onClick={() => setShowModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600 }}
          >
            <PlusCircle size={16} /> Create Booking
          </button>
        }
      />

      <Card style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: '8px 14px', borderRadius: 8,
                border: '1px solid ' + (status === s ? 'var(--primary)' : 'var(--border)'),
                background: status === s ? 'var(--primary)' : '#fff',
                color: status === s ? '#fff' : 'var(--text)',
                fontSize: '0.82rem', fontWeight: 600,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '8px 6px' }}>Booking ID</th>
              <th style={{ padding: '8px 6px' }}>Shipment</th>
              <th style={{ padding: '8px 6px' }}>Carrier</th>
              <th style={{ padding: '8px 6px' }}>Vessel / Flight</th>
              <th style={{ padding: '8px 6px' }}>Depart Date</th>
              <th style={{ padding: '8px 6px' }}>Status</th>
              <th style={{ padding: '8px 6px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((b) => (
              <tr
                key={b.id}
                onClick={() => navigate(`/bookings/${b.id}`)}
                style={{ cursor: 'pointer', borderTop: '1px solid var(--border)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '12px 6px', fontWeight: 600, color: 'var(--primary)' }}>{b.id}</td>
                <td style={{ padding: '12px 6px' }}>{b.shipmentId}</td>
                <td style={{ padding: '12px 6px' }}>{b.carrier}</td>
                <td style={{ padding: '12px 6px' }}>{b.vesselFlight}</td>
                <td style={{ padding: '12px 6px' }}>{b.departDate}</td>
                <td style={{ padding: '12px 6px' }}><StatusBadge status={b.status} /></td>
                <td style={{ padding: '12px 6px', textAlign: 'right' }}><ChevronRight size={16} color="var(--text-soft)" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, width: 440, boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0 }}>{confirmed ? 'Booking Confirmed' : 'Create Booking'}</h3>
              <button onClick={closeModal} style={{ background: 'none', border: 'none' }}><X size={18} /></button>
            </div>

            {confirmed ? (
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 18 }}>
                  Booking <strong>{createdBooking?.id}</strong> for <strong>{shipmentLabel(form.shipmentId)}</strong> with <strong>{form.carrier}</strong> has been added for this session.
                </p>
                <button onClick={closeModal} style={{ width: '100%', padding: '10px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600 }}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Shipment</label>
                  <select required value={form.shipmentId} onChange={(e) => setForm((f) => ({ ...f, shipmentId: e.target.value }))} style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid var(--border)' }}>
                    {shipments.map((s) => <option key={s.id} value={s.id}>{shipmentLabel(s.id)}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Carrier</label>
                  <select required value={form.carrier} onChange={(e) => setForm((f) => ({ ...f, carrier: e.target.value }))} style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid var(--border)' }}>
                    {carriers.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Vessel / Flight Name</label>
                  <input required value={form.vesselFlight} onChange={(e) => setForm((f) => ({ ...f, vesselFlight: e.target.value }))} placeholder="e.g. MSC Gulsun" style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid var(--border)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Depart Date</label>
                  <input required type="date" value={form.departDate} onChange={(e) => setForm((f) => ({ ...f, departDate: e.target.value }))} style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid var(--border)' }} />
                </div>
                <button type="submit" style={{ marginTop: 4, padding: '11px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 700 }}>
                  Confirm Booking
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
