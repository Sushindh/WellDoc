import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Activity,
  Filter,
  Download,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
import RiskMeter from '../components/RiskMeter';
import MetricsCard from '../components/MetricsCard';
// import PatientCard from '../components/PatientCard';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [filterLevel, setFilterLevel] = useState('all');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockPatients = [
      {
        id: 'P001',
        name: 'John Doe',
        age: 67,
        condition: 'Diabetes Type 2',
        riskScore: 0.85,
        status: 'high',
        lastVisit: '2025-09-05',
        hba1c: 8.2,
        adherence: 0.65
      },
      {
        id: 'P002',
        name: 'Mary Johnson',
        age: 72,
        condition: 'Alzheimer\'s',
        riskScore: 0.45,
        status: 'medium',
        lastVisit: '2025-09-07',
        hba1c: 6.8,
        adherence: 0.85
      },
      {
        id: 'P003',
        name: 'Robert Smith',
        age: 58,
        condition: 'Diabetes + Alzheimer\'s',
        riskScore: 0.92,
        status: 'high',
        lastVisit: '2025-09-08',
        hba1c: 9.1,
        adherence: 0.45
      }
    ];
    setPatients(mockPatients);
  }, []);

  const filteredPatients = patients.filter(patient => {
    if (filterLevel === 'all') return true;
    return patient.status === filterLevel;
  });

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      change: '+12%',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'High Risk',
      value: patients.filter(p => p.status === 'high').length,
      change: '+8%',
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Avg Risk Score',
      value: '0.74',
      change: '+5%',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Model Accuracy',
      value: '99.2%',
      change: '+0.1%',
      icon: Activity,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Risk Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor chronic care patients and AI predictions</p>
        </div>
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <MetricsCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Risk Distribution */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Risk Distribution</h2>
        <RiskMeter patients={patients} />
      </div>

      {/* Patient List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Patient Overview</h2>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select 
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Patients</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                      <p className="text-sm text-gray-600">{patient.condition}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Risk Score</p>
                      <p className={`font-bold ${
                        patient.riskScore > 0.8 ? 'text-red-600' :
                        patient.riskScore > 0.5 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {(patient.riskScore * 100).toFixed(1)}%
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500">HbA1c</p>
                      <p className="font-bold text-gray-800">{patient.hba1c}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Adherence</p>
                      <p className="font-bold text-gray-800">{(patient.adherence * 100).toFixed(0)}%</p>
                    </div>
                    
                    <Link to={`/patient/${patient.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">View</span>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
