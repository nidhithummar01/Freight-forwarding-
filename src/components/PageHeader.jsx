export default function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0, color: 'var(--text)' }}>{title}</h1>
        {subtitle && <p style={{ margin: '6px 0 0', color: 'var(--text-muted)', fontSize: '0.92rem' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
