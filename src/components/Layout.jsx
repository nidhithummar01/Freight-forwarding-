import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Ship,
  ClipboardList,
  FileText,
  MapPin,
  PlusCircle,
  Package,
} from 'lucide-react';

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/shipments', label: 'Shipments', icon: Ship },
  { to: '/shipments/create', label: 'Create Shipment', icon: PlusCircle },
  { to: '/bookings', label: 'Bookings', icon: ClipboardList },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/tracking', label: 'Tracking', icon: MapPin },
];

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <aside
        style={{
          width: 240,
          background: 'var(--primary-dark)',
          color: '#dceaf0',
          display: 'flex',
          flexDirection: 'column',
          position: 'sticky',
          top: 0,
          height: '100vh',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '22px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Package size={26} color="var(--accent)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.02rem', color: '#fff' }}>FreightFlow</div>
            <div style={{ fontSize: '0.7rem', color: '#9cc1cf' }}>Forwarding PoC</div>
          </div>
        </div>
        <nav style={{ padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 14px',
                borderRadius: 8,
                fontSize: '0.9rem',
                fontWeight: 500,
                color: isActive ? '#fff' : '#bcd9e2',
                background: isActive ? 'rgba(245, 166, 35, 0.18)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
                transition: 'background 0.15s',
              })}
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '16px 20px', fontSize: '0.7rem', color: '#7fa6b3', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          Frontend-only PoC &middot; Mock data
        </div>
      </aside>
      <main style={{ flex: 1, padding: '28px 36px', maxWidth: 'calc(100vw - 240px)' }}>
        {children}
      </main>
    </div>
  );
}
