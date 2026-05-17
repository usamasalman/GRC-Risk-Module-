/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RiskRegister from './pages/RiskRegister';
import RiskDetail from './pages/RiskDetail';
import NewRisk from './pages/NewRisk';
import ControlLibrary from './pages/ControlLibrary';
import TreatmentMonitor from './pages/TreatmentMonitor';
import KRIs from './pages/KRIs';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import { DataProvider } from './store/DataContext';

export default function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
             <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="risks" element={<RiskRegister />} />
            <Route path="risks/new" element={<NewRisk />} />
            <Route path="risks/:id" element={<RiskDetail />} />
            <Route path="controls" element={<ControlLibrary />} />
            <Route path="treatments" element={<TreatmentMonitor />} />
            <Route path="kris" element={<KRIs />} />
            <Route path="documents" element={<Documents />} />
            <Route path="reports" element={<Reports />} />
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}
