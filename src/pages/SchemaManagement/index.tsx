import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SchemaList from './SchemaList';
import SchemaEditor from './SchemaEditor';
import SchemaVersions from './SchemaVersions';

function SchemaManagement() {
  return (
    <Routes>
      <Route index element={<SchemaList />} />
      <Route path="editor/:id?" element={<SchemaEditor />} />
      <Route path=":id/versions" element={<SchemaVersions />} />
    </Routes>
  );
}

export default SchemaManagement;