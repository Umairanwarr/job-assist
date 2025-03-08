import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/dashboard/AdminDashboard';
import CompanyDetails from './admin/company/CompanyDetails';
import AdminJobDetails from './admin/company/job/JobDetails';
import JobDetails from './apply/JobDetails';
import JobApplication from './apply/JobApplication';
import LandingPage from './components/landingpage';
import ProtectedRoute from './admin/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/company/:id" element={<ProtectedRoute><CompanyDetails /></ProtectedRoute>} />
        <Route path="/admin/company/:id/job/:jobId" element={<ProtectedRoute><AdminJobDetails /></ProtectedRoute>} />
        <Route path="/apply/:jobId" element={<JobDetails />} />
        <Route path="/apply/:jobId/form" element={<JobApplication />} />
      </Routes>
    </Router>
  );
}

export default App;