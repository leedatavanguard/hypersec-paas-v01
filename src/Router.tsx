import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SchemaManagement from './pages/SchemaManagement';
import RuleCreation from './pages/RuleCreation';
import HuntManagement from './pages/HuntManagement';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/schemas/*" element={<SchemaManagement />} />
      <Route path="/rules/*" element={<RuleCreation />} />
      <Route path="/hunts/*" element={<HuntManagement />} />
    </Routes>
  );
}

export default Router;