import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CreateShipment from './pages/CreateShipment.jsx';
import ShipmentList from './pages/ShipmentList.jsx';
import ShipmentDetails from './pages/ShipmentDetails.jsx';
import BookingManagement from './pages/BookingManagement.jsx';
import BookingDetails from './pages/BookingDetails.jsx';
import DocumentationCenter from './pages/DocumentationCenter.jsx';
import Tracking from './pages/Tracking.jsx';
import { AppDataProvider } from './context/AppDataContext.jsx';

if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1));
}

function App() {
  return (
    <AppDataProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shipments" element={<ShipmentList />} />
            <Route path="/shipments/create" element={<CreateShipment />} />
            <Route path="/shipments/:id" element={<ShipmentDetails />} />
            <Route path="/bookings" element={<BookingManagement />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            <Route path="/documents" element={<DocumentationCenter />} />
            <Route path="/tracking" element={<Tracking />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppDataProvider>
  );
}

export default App;
