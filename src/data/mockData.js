export const transportModes = ['Air', 'Sea', 'Rail', 'Road'];
export const cargoTypes = ['General Cargo', 'Perishable', 'Hazardous', 'Liquid Bulk', 'Containerized'];
export const carriers = ['Maersk Line', 'MSC', 'CMA CGM', 'Emirates SkyCargo', 'DHL Global Forwarding', 'FedEx Trade Networks'];

export const shipments = [
  { id: 'SHP001', origin: 'Mumbai, IN', destination: 'Rotterdam, NL', cargoType: 'Containerized', weight: '12,400 kg', mode: 'Sea', status: 'In Transit', created: '2026-05-12' },
  { id: 'SHP002', origin: 'Shanghai, CN', destination: 'Los Angeles, US', cargoType: 'General Cargo', weight: '8,200 kg', mode: 'Sea', status: 'Booked', created: '2026-05-18' },
  { id: 'SHP003', origin: 'Frankfurt, DE', destination: 'New York, US', cargoType: 'Perishable', weight: '1,150 kg', mode: 'Air', status: 'Delivered', created: '2026-04-30' },
  { id: 'SHP004', origin: 'Singapore, SG', destination: 'Dubai, AE', cargoType: 'Liquid Bulk', weight: '20,000 kg', mode: 'Sea', status: 'Pending', created: '2026-06-01' },
  { id: 'SHP005', origin: 'Chennai, IN', destination: 'London, UK', cargoType: 'Hazardous', weight: '3,400 kg', mode: 'Air', status: 'In Transit', created: '2026-06-05' },
  { id: 'SHP006', origin: 'Hamburg, DE', destination: 'Cape Town, ZA', cargoType: 'General Cargo', weight: '15,600 kg', mode: 'Sea', status: 'Booked', created: '2026-06-08' },
  { id: 'SHP007', origin: 'Tokyo, JP', destination: 'Sydney, AU', cargoType: 'Containerized', weight: '9,800 kg', mode: 'Sea', status: 'Delivered', created: '2026-05-02' },
  { id: 'SHP008', origin: 'Delhi, IN', destination: 'Singapore, SG', cargoType: 'Perishable', weight: '2,200 kg', mode: 'Air', status: 'Pending', created: '2026-06-10' },
];

export const bookings = [
  { id: 'BK001', shipmentId: 'SHP001', carrier: 'Maersk Line', vesselFlight: 'MV Maersk Edmonton', departDate: '2026-05-15', status: 'Confirmed' },
  { id: 'BK002', shipmentId: 'SHP002', carrier: 'MSC', vesselFlight: 'MSC Gulsun', departDate: '2026-05-20', status: 'Pending' },
  { id: 'BK003', shipmentId: 'SHP003', carrier: 'Emirates SkyCargo', vesselFlight: 'EK 9876', departDate: '2026-05-01', status: 'Confirmed' },
  { id: 'BK004', shipmentId: 'SHP005', carrier: 'DHL Global Forwarding', vesselFlight: 'DHL AF-203', departDate: '2026-06-06', status: 'Confirmed' },
  { id: 'BK005', shipmentId: 'SHP006', carrier: 'CMA CGM', vesselFlight: 'CMA CGM Marco Polo', departDate: '2026-06-12', status: 'Pending' },
  { id: 'BK006', shipmentId: 'SHP007', carrier: 'MSC', vesselFlight: 'MSC Isabella', departDate: '2026-05-04', status: 'Rejected' },
];

export const documents = [
  { id: 'DOC001', shipmentId: 'SHP001', name: 'Commercial_Invoice_SHP001.pdf', type: 'Invoice', uploadDate: '2026-05-12' },
  { id: 'DOC002', shipmentId: 'SHP001', name: 'Packing_List_SHP001.pdf', type: 'Packing List', uploadDate: '2026-05-12' },
  { id: 'DOC003', shipmentId: 'SHP002', name: 'Customs_Declaration_SHP002.pdf', type: 'Customs Declaration', uploadDate: '2026-05-18' },
  { id: 'DOC004', shipmentId: 'SHP003', name: 'Invoice_SHP003.pdf', type: 'Invoice', uploadDate: '2026-04-30' },
  { id: 'DOC005', shipmentId: 'SHP005', name: 'Hazmat_Certificate_SHP005.pdf', type: 'Customs Declaration', uploadDate: '2026-06-05' },
  { id: 'DOC006', shipmentId: 'SHP006', name: 'Packing_List_SHP006.pdf', type: 'Packing List', uploadDate: '2026-06-08' },
  { id: 'DOC007', shipmentId: 'SHP008', name: 'Invoice_SHP008.pdf', type: 'Invoice', uploadDate: '2026-06-10' },
];

export const tracking = {
  SHP001: {
    shipmentId: 'SHP001', currentLocation: 'Indian Ocean, near Suez Canal', currentStatus: 'In Transit',
    history: [
      { status: 'Booked', location: 'Mumbai, IN', date: '2026-05-12' },
      { status: 'Departed', location: 'Mumbai Port', date: '2026-05-15' },
      { status: 'In Transit', location: 'Indian Ocean, near Suez Canal', date: '2026-06-01' },
    ],
  },
  SHP002: {
    shipmentId: 'SHP002', currentLocation: 'Shanghai Port', currentStatus: 'Booked',
    history: [
      { status: 'Booked', location: 'Shanghai, CN', date: '2026-05-18' },
    ],
  },
  SHP003: {
    shipmentId: 'SHP003', currentLocation: 'New York, US', currentStatus: 'Delivered',
    history: [
      { status: 'Booked', location: 'Frankfurt, DE', date: '2026-04-30' },
      { status: 'Departed', location: 'Frankfurt Airport', date: '2026-05-01' },
      { status: 'In Transit', location: 'Atlantic Ocean Airspace', date: '2026-05-01' },
      { status: 'Delivered', location: 'New York, US', date: '2026-05-02' },
    ],
  },
  SHP005: {
    shipmentId: 'SHP005', currentLocation: 'Over Arabian Sea', currentStatus: 'In Transit',
    history: [
      { status: 'Booked', location: 'Chennai, IN', date: '2026-06-05' },
      { status: 'Departed', location: 'Chennai Airport', date: '2026-06-06' },
      { status: 'In Transit', location: 'Over Arabian Sea', date: '2026-06-07' },
    ],
  },
  SHP006: {
    shipmentId: 'SHP006', currentLocation: 'Hamburg Port', currentStatus: 'Booked',
    history: [
      { status: 'Booked', location: 'Hamburg, DE', date: '2026-06-08' },
    ],
  },
  SHP007: {
    shipmentId: 'SHP007', currentLocation: 'Sydney, AU', currentStatus: 'Delivered',
    history: [
      { status: 'Booked', location: 'Tokyo, JP', date: '2026-05-02' },
      { status: 'Departed', location: 'Tokyo Port', date: '2026-05-04' },
      { status: 'In Transit', location: 'Pacific Ocean', date: '2026-05-10' },
      { status: 'Delivered', location: 'Sydney, AU', date: '2026-05-20' },
    ],
  },
};

export const dashboardMetrics = {
  totalShipments: shipments.length,
  inTransit: shipments.filter((s) => s.status === 'In Transit').length,
  pendingBookings: bookings.filter((b) => b.status === 'Pending').length,
  delivered: shipments.filter((s) => s.status === 'Delivered').length,
};
