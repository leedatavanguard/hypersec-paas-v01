import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HuntDashboard from './HuntDashboard';
import HuntCreator from './HuntCreator';
import HuntDetails from './HuntDetails';
import HuntHistory from './HuntHistory';

function HuntManagement() {
  return (
    <Routes>
      <Route index element={<HuntDashboard />} />
      <Route path="create" element={<HuntCreator />} />
      <Route path=":id" element={<HuntDetails />} />
      <Route path=":id/history" element={<HuntHistory />} />
    </Routes>
  );
}

export default HuntManagement;