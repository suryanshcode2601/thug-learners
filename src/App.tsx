import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OversightDashboard from './views/OversightDashboard';
import CitizenDashboard from './views/CitizenDashboard';
import SubmitIssue from './views/SubmitIssue';
import CityMap from './views/CityMap';
import Transparency from './views/Transparency';
import Settings from './views/Settings';
import { AppProvider } from './AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CitizenDashboard />} />
          <Route path="/submit" element={<SubmitIssue />} />
          <Route path="/admin" element={<OversightDashboard />} />
          <Route path="/city-map" element={<CityMap />} />
          <Route path="/transparency" element={<Transparency />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
