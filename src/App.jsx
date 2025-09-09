import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PatientDetails from './pages/PatientDetails';
import ModelMetrics from './pages/ModelMetrics';
import Explainability from './pages/Explainability';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 ml-64 p-6">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/patient/:id" element={<PatientDetails />} />
                <Route path="/metrics" element={<ModelMetrics />} />
                <Route path="/explainability" element={<Explainability />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
