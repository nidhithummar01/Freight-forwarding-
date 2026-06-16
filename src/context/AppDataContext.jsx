import { useMemo, useState } from 'react';
import {
  shipments as initialShipments,
  bookings as initialBookings,
  documents as initialDocuments,
  tracking as initialTracking,
} from '../data/mockData.js';
import { AppDataContext } from './appDataContext.js';

const nextId = (items, prefix) => {
  const max = items.reduce((highest, item) => {
    const value = Number(String(item.id).replace(prefix, ''));
    return Number.isNaN(value) ? highest : Math.max(highest, value);
  }, 0);

  return `${prefix}${String(max + 1).padStart(3, '0')}`;
};

const today = () => new Date().toISOString().slice(0, 10);

export function AppDataProvider({ children }) {
  const [shipments, setShipments] = useState(initialShipments);
  const [bookings, setBookings] = useState(initialBookings);
  const [documents, setDocuments] = useState(initialDocuments);
  const [tracking, setTracking] = useState(initialTracking);

  const addShipment = (form, fileNames = []) => {
    const created = today();
    const shipment = {
      id: nextId(shipments, 'SHP'),
      origin: form.origin,
      destination: form.destination,
      cargoType: form.cargoType,
      weight: `${Number(form.weight).toLocaleString()} kg`,
      dimensions: form.dimensions,
      mode: form.mode,
      status: 'Pending',
      created,
    };

    const newDocuments = fileNames.map((name, index) => ({
      id: nextId([...documents, ...fileNames.slice(0, index).map((_, i) => ({ id: `DOC${String(documents.length + i + 1).padStart(3, '0')}` }))], 'DOC'),
      shipmentId: shipment.id,
      name,
      type: 'Invoice',
      uploadDate: created,
    }));

    setShipments((current) => [shipment, ...current]);
    if (newDocuments.length > 0) {
      setDocuments((current) => [...newDocuments, ...current]);
    }
    setTracking((current) => ({
      ...current,
      [shipment.id]: {
        shipmentId: shipment.id,
        currentLocation: shipment.origin,
        currentStatus: 'Pending',
        history: [{ status: 'Pending', location: shipment.origin, date: created }],
      },
    }));

    return shipment;
  };

  const addBooking = (form) => {
    const booking = {
      id: nextId(bookings, 'BK'),
      shipmentId: form.shipmentId,
      carrier: form.carrier,
      vesselFlight: form.vesselFlight,
      departDate: form.departDate,
      status: 'Pending',
    };

    setBookings((current) => [booking, ...current]);
    setShipments((current) => current.map((shipment) => (
      shipment.id === form.shipmentId ? { ...shipment, status: 'Booked' } : shipment
    )));
    setTracking((current) => {
      const existing = current[form.shipmentId];
      const bookedEvent = { status: 'Booked', location: existing?.currentLocation || 'Carrier booking created', date: today() };

      return {
        ...current,
        [form.shipmentId]: existing
          ? { ...existing, currentStatus: 'Booked', history: [...existing.history, bookedEvent] }
          : {
            shipmentId: form.shipmentId,
            currentLocation: 'Carrier booking created',
            currentStatus: 'Booked',
            history: [bookedEvent],
          },
      };
    });

    return booking;
  };

  const updateBookingStatus = (id, status) => {
    setBookings((current) => current.map((booking) => (
      booking.id === id ? { ...booking, status } : booking
    )));
  };

  const addDocument = (form) => {
    const document = {
      id: nextId(documents, 'DOC'),
      shipmentId: form.shipmentId,
      name: form.fileName,
      type: form.docType,
      uploadDate: today(),
    };

    setDocuments((current) => [document, ...current]);
    return document;
  };

  const dashboardMetrics = useMemo(() => ({
    totalShipments: shipments.length,
    inTransit: shipments.filter((s) => s.status === 'In Transit').length,
    pendingBookings: bookings.filter((b) => b.status === 'Pending').length,
    delivered: shipments.filter((s) => s.status === 'Delivered').length,
  }), [bookings, shipments]);

  const value = {
    shipments,
    bookings,
    documents,
    tracking,
    dashboardMetrics,
    addShipment,
    addBooking,
    updateBookingStatus,
    addDocument,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}
