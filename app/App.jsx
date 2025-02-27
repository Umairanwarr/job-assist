import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/dashboard/AdminDashboard';
import CompanyDetails from './admin/company/CompanyDetails';
import JobDetails from './admin/company/job/JobDetails';
import JobApplication from './apply/JobApplication';
import LandingPage from './components/landingpage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/company/:id" element={<CompanyDetails />} />
        <Route path="/admin/company/:id/job/:jobId" element={<JobDetails />} />
        <Route path="/apply/:jobId" element={<JobApplication />} />
      </Routes>
    </Router>
  );
}

export default App;