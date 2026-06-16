export default function Card({ children, style, title }) {
  return (
    <div
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow-sm)',
        padding: 20,
        ...style,
      }}
    >
      {title && <h3 style={{ margin: '0 0 14px', fontSize: '1rem', fontWeight: 600 }}>{title}</h3>}
      {children}
    </div>
  );
}
