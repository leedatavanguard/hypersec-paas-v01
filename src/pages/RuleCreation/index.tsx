import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RuleList from './RuleList';
import RuleEditor from './RuleEditor';
import RuleVersions from './RuleVersions';

function RuleCreation() {
  return (
    <Routes>
      <Route index element={<RuleList />} />
      <Route path="editor/:id?" element={<RuleEditor />} />
      <Route path=":id/versions" element={<RuleVersions />} />
    </Routes>
  );
}

export default RuleCreation;