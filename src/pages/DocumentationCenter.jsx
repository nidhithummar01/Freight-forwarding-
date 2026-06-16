import { useMemo, useState } from 'react';
import { FileText, Download, UploadCloud, X } from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import Card from '../components/Card.jsx';
import { useAppData } from '../context/useAppData.js';

const TYPES = ['All', 'Invoice', 'Packing List', 'Customs Declaration'];

const TYPE_COLORS = {
  'Invoice': { bg: 'var(--info-bg)', color: 'var(--info)' },
  'Packing List': { bg: 'var(--success-bg)', color: 'var(--success)' },
  'Customs Declaration': { bg: 'var(--warning-bg)', color: 'var(--warning)' },
};

export default function DocumentationCenter() {
  const { documents: docs, shipments, addDocument } = useAppData();
  const [type, setType] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ shipmentId: shipments[0]?.id || '', docType: 'Invoice', fileName: '' });

  const filtered = useMemo(() => docs.filter((d) => type === 'All' || d.type === type), [docs, type]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (!form.fileName) return;
    addDocument(form);
    setShowModal(false);
    setForm({ shipmentId: shipments[0]?.id || '', docType: 'Invoice', fileName: '' });
  };

  return (
    <div>
      <PageHeader
        title="Documentation Center"
        subtitle={`${filtered.length} of ${docs.length} documents across all shipments`}
        action={
          <button
            onClick={() => setShowModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 600 }}
          >
            <UploadCloud size={16} /> Upload Document
          </button>
        }
      />

      <Card style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              style={{
                padding: '8px 14px', borderRadius: 8,
                border: '1px solid ' + (type === t ? 'var(--primary)' : 'var(--border)'),
                background: type === t ? 'var(--primary)' : '#fff',
                color: type === t ? '#fff' : 'var(--text)',
                fontSize: '0.82rem', fontWeight: 600,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '8px 6px' }}>Document</th>
              <th style={{ padding: '8px 6px' }}>Type</th>
              <th style={{ padding: '8px 6px' }}>Linked Shipment</th>
              <th style={{ padding: '8px 6px' }}>Upload Date</th>
              <th style={{ padding: '8px 6px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => {
              const c = TYPE_COLORS[d.type] || { bg: '#eee', color: '#555' };
              return (
                <tr key={d.id} style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <FileText size={16} color="var(--primary)" /> {d.name}
                    </div>
                  </td>
                  <td style={{ padding: '12px 6px' }}>
                    <span style={{ background: c.bg, color: c.color, padding: '4px 10px', borderRadius: 999, fontSize: '0.76rem', fontWeight: 600 }}>{d.type}</span>
                  </td>
                  <td style={{ padding: '12px 6px', color: 'var(--primary)', fontWeight: 600 }}>{d.shipmentId}</td>
                  <td style={{ padding: '12px 6px' }}>{d.uploadDate}</td>
                  <td style={{ padding: '12px 6px', textAlign: 'right' }}>
                    <button title="Mock download" style={{ background: 'none', border: 'none', color: 'var(--primary)' }}><Download size={16} /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, width: 420, boxShadow: 'var(--shadow-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0 }}>Upload Document</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none' }}><X size={18} /></button>
            </div>
            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Linked Shipment</label>
                <select value={form.shipmentId} onChange={(e) => setForm((f) => ({ ...f, shipmentId: e.target.value }))} style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid var(--border)' }}>
                  {shipments.map((s) => <option key={s.id} value={s.id}>{s.id}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>Document Type</label>
                <select value={form.docType} onChange={(e) => setForm((f) => ({ ...f, docType: e.target.value }))} style={{ width: '100%', padding: '9px 10px', borderRadius: 8, border: '1px solid var(--border)' }}>
                  {TYPES.filter((t) => t !== 'All').map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: 6 }}>File</label>
                <input
                  type="file"
                  onChange={(e) => setForm((f) => ({ ...f, fileName: e.target.files[0]?.name || '' }))}
                  style={{ width: '100%' }}
                />
              </div>
              <button type="submit" style={{ marginTop: 4, padding: '11px', borderRadius: 8, border: 'none', background: 'var(--primary)', color: '#fff', fontWeight: 700 }}>
                Upload (Mock)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
