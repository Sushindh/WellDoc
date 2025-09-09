import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Heart, 
  Activity, 
  Pill, 
  Calendar,
  AlertCircle,
  TrendingUp,
  CheckCircle
} from 'lucide-react';
import TrendChart from '../components/TrendChart';
import ActionCard from '../components/ActionCard';

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [explanations, setExplanations] = useState([]);

  useEffect(() => {
    // Mock patient data - replace with API call
    const mockPatient = {
      id: id,
      name: 'John Doe',
      age: 67,
      condition: 'Diabetes Type 2',
      riskScore: 0.85,
      status: 'high',
      lastVisit: '2025-09-05',
      nextVisit: '2025-09-15',
      vitals: {
        hba1c: 8.2,
        bloodPressure: '145/92',
        weight: 85.2,
        adherence: 0.65
      },
      trends: [
        { date: '2025-07-01', hba1c: 7.8, weight: 87.1, adherence: 0.72 },
        { date: '2025-08-01', hba1c: 8.0, weight: 86.5, adherence: 0.68 },
        { date: '2025-09-01', hba1c: 8.2, weight: 85.2, adherence: 0.65 },
      ]
    };

    const mockExplanations = [
      { feature: 'HbA1c Level', impact: 0.35, direction: 'increases', description: 'Elevated HbA1c (8.2%) significantly increases deterioration risk' },
      { feature: 'Medication Adherence', impact: 0.28, direction: 'increases', description: 'Poor adherence (65%) contributes to higher risk' },
      { feature: 'Age Factor', impact: 0.15, direction: 'increases', description: 'Age 67 moderately increases risk profile' },
      { feature: 'Weight Trend', impact: 0.12, direction: 'decreases', description: 'Recent weight loss shows positive trend' },
    ];

    setPatient(mockPatient);
    setExplanations(mockExplanations);
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  const actions = [
    {
      title: 'Schedule Urgent Consultation',
      priority: 'high',
      description: 'HbA1c levels require immediate attention',
      dueDate: '2025-09-10',
      icon: AlertCircle
    },
    {
      title: 'Medication Adherence Review',
      priority: 'medium',
      description: 'Discuss barriers to medication compliance',
      dueDate: '2025-09-12',
      icon: Pill
    },
    {
      title: 'Lifestyle Counseling',
      priority: 'medium',
      description: 'Diet and exercise plan adjustment',
      dueDate: '2025-09-15',
      icon: TrendingUp
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
      <div className="flex items-center space-x-4">
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{patient.name}</h1>
          <p className="text-gray-600">{patient.condition} • Age {patient.age}</p>
        </div>
      </div>

      {/* Risk Status Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-red-800">High Risk Patient</h2>
            <p className="text-red-700">Risk Score: {(patient.riskScore * 100).toFixed(1)}%</p>
            <p className="text-sm text-red-600 mt-1">Predicted deterioration probability in next 90 days</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-red-600">Next Visit</p>
            <p className="font-semibold text-red-800">{patient.nextVisit}</p>
          </div>
        </div>
      </motion.div>

      {/* Vitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'HbA1c', value: patient.vitals.hba1c + '%', icon: Activity, color: 'red', status: 'high' },
          { label: 'Blood Pressure', value: patient.vitals.bloodPressure, icon: Heart, color: 'orange', status: 'elevated' },
          { label: 'Weight', value: patient.vitals.weight + ' kg', icon: TrendingUp, color: 'green', status: 'improving' },
          { label: 'Adherence', value: (patient.vitals.adherence * 100).toFixed(0) + '%', icon: Pill, color: 'red', status: 'poor' }
        ].map((vital, index) => {
          const Icon = vital.icon;
          return (
            <motion.div
              key={vital.label}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{vital.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{vital.value}</p>
                  <p className={`text-xs mt-1 ${
                    vital.status === 'high' || vital.status === 'poor' ? 'text-red-600' :
                    vital.status === 'elevated' ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {vital.status}
                  </p>
                </div>
                <Icon className={`w-8 h-8 ${
                  vital.color === 'red' ? 'text-red-500' :
                  vital.color === 'orange' ? 'text-orange-500' :
                  vital.color === 'green' ? 'text-green-500' : 'text-blue-500'
                }`} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Trends Chart */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Health Trends (Last 3 Months)</h3>
        <TrendChart data={patient.trends} />
      </motion.div>

      {/* AI Explanations */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Risk Factors</h3>
        <div className="space-y-4">
          {explanations.map((exp, index) => (
            <div key={exp.feature} className="flex items-center space-x-4">
              <div className="w-32 text-sm text-gray-600">{exp.feature}</div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      exp.impact > 0.3 ? 'bg-red-500' :
                      exp.impact > 0.2 ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}
                    style={{ width: `${exp.impact * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-16 text-sm font-semibold text-gray-800">
                {(exp.impact * 100).toFixed(1)}%
              </div>
              <div className="w-96 text-sm text-gray-600">{exp.description}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recommended Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <ActionCard key={action.title} {...action} delay={index * 0.1} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PatientDetails;
