import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileCheck2, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import { transportModes, cargoTypes } from '../data/mockData.js';
import { useAppData } from '../context/useAppData.js';

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid var(--border)',
  background: '#fff',
  outline: 'none',
};

const labelStyle = { fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, display: 'block' };

export default function CreateShipment() {
  const navigate = useNavigate();
  const { addShipment } = useAppData();
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [createdShipment, setCreatedShipment] = useState(null);
  const [form, setForm] = useState({
    origin: '', destination: '', cargoType: cargoTypes[0], mode: transportModes[0], weight: '', dimensions: '',
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleFiles = (e) => {
    const list = Array.from(e.target.files).map((f) => f.name);
    setFiles((prev) => [...prev, ...list]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const shipment = addShipment(form, files);
    setCreatedShipment(shipment);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div>
        <PageHeader title="Create Shipment" />
        <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
          <CheckCircle2 size={48} color="var(--success)" style={{ marginBottom: 12 }} />
          <h2 style={{ margin: '0 0 8px' }}>Shipment Request Submitted</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
            Shipment <strong>{createdShipment?.id}</strong> has been added for this session. Your shipment request from{' '}
            <strong>{form.origin || '—'}</strong> to <strong>{form.destination || '—'}</strong> has been recorded for review.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/shipments')}
              style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600 }}
            >
              View Shipment List
            </button>
            <button
              onClick={() => { setSubmitted(false); setCreatedShipment(null); setForm({ origin: '', destination: '', cargoType: cargoTypes[0], mode: transportModes[0], weight: '', dimensions: '' }); setFiles([]); }}
              style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid var(--border)', background: '#fff', fontWeight: 600 }}
            >
              Create Another
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Create Shipment" subtitle="Enter cargo details to request a new shipment" />
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 18 }}>
        <Card title="Shipment Details">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Origin</label>
              <input required style={inputStyle} placeholder="e.g. Mumbai, IN" value={form.origin} onChange={update('origin')} />
            </div>
            <div>
              <label style={labelStyle}>Destination</label>
              <input required style={inputStyle} placeholder="e.g. Rotterdam, NL" value={form.destination} onChange={update('destination')} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div>
              <label style={labelStyle}>Cargo Type</label>
              <select style={inputStyle} value={form.cargoType} onChange={update('cargoType')}>
                {cargoTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Transport Mode</label>
              <select style={inputStyle} value={form.mode} onChange={update('mode')}>
                {transportModes.map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Weight (kg)</label>
              <input required type="number" style={inputStyle} placeholder="e.g. 1200" value={form.weight} onChange={update('weight')} />
            </div>
            <div>
              <label style={labelStyle}>Dimensions (L x W x H cm)</label>
              <input style={inputStyle} placeholder="e.g. 120 x 80 x 100" value={form.dimensions} onChange={update('dimensions')} />
            </div>
          </div>
        </Card>

        <Card title="Documents">
          <label
            htmlFor="doc-upload"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              padding: '28px 12px', borderRadius: 10, border: '2px dashed var(--border)',
              cursor: 'pointer', background: 'var(--bg)', textAlign: 'center',
            }}
          >
            <UploadCloud size={28} color="var(--primary)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Click to upload documents</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-soft)' }}>Mock upload — files are not stored</span>
            <input id="doc-upload" type="file" multiple style={{ display: 'none' }} onChange={handleFiles} />
          </label>

          {files.length > 0 && (
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {files.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', padding: '8px 10px', background: 'var(--bg)', borderRadius: 6 }}>
                  <FileCheck2 size={16} color="var(--success)" />
                  {f}
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            style={{ width: '100%', marginTop: 18, padding: '12px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '0.92rem' }}
          >
            Submit Shipment Request
          </button>
        </Card>
      </form>
    </div>
  );
}
