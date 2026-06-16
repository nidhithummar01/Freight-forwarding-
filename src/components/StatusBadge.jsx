const STYLES = {
  'Pending': { bg: 'var(--warning-bg)', color: 'var(--warning)' },
  'Booked': { bg: 'var(--info-bg)', color: 'var(--info)' },
  'In Transit': { bg: 'var(--accent-light)', color: '#b8720a' },
  'Delivered': { bg: 'var(--success-bg)', color: 'var(--success)' },
  'Confirmed': { bg: 'var(--success-bg)', color: 'var(--success)' },
  'Rejected': { bg: 'var(--danger-bg)', color: 'var(--danger)' },
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || { bg: '#eee', color: '#555' };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: '0.78rem',
        fontWeight: 600,
        background: style.bg,
        color: style.color,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: style.color }} />
      {status}
    </span>
  );
}
