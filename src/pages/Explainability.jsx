import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertCircle, BarChart3 } from 'lucide-react';
import FeatureImportance from '../components/FeatureImportance';
import MetricsCard from '../components/MetricsCard';

const Explainability = () => {
  const [globalExplanations, setGlobalExplanations] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  
  useEffect(() => {
    // Mock global feature importance data
    const mockGlobalFeatures = [
      { feature: 'HbA1c Level', importance: 0.35, impact: 'high', description: 'Most critical predictor of deterioration risk', trend: 'increasing' },
      { feature: 'Medication Adherence', importance: 0.28, impact: 'high', description: 'Strong correlation with patient outcomes', trend: 'decreasing' },
      { feature: 'Age', importance: 0.15, impact: 'medium', description: 'Age-related risk factors', trend: 'stable' },
      { feature: 'Blood Pressure Systolic', importance: 0.12, impact: 'medium', description: 'Cardiovascular risk indicator', trend: 'increasing' },
      { feature: 'Weight Change', importance: 0.08, impact: 'low', description: 'Recent weight fluctuations', trend: 'variable' },
      { feature: 'BMI', importance: 0.06, impact: 'low', description: 'Body mass index correlation', trend: 'stable' },
      { feature: 'Blood Pressure Diastolic', importance: 0.05, impact: 'low', description: 'Secondary BP indicator', trend: 'stable' },
      { feature: 'Heart Rate', importance: 0.04, impact: 'low', description: 'Cardiovascular health metric', trend: 'stable' }
    ];
    setGlobalExplanations(mockGlobalFeatures);
  }, []);

  const impactStats = [
    {
      title: 'High Impact Features',
      value: globalExplanations.filter(f => f.impact === 'high').length,
      change: '+2 from last model',
      icon: AlertCircle,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Model Interpretability',
      value: '94.2%',
      change: '+1.2%',
      icon: Brain,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Feature Stability',
      value: '87.5%',
      change: '+0.8%',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Explanation Coverage',
      value: '99.1%',
      change: '+0.3%',
      icon: BarChart3,
      color: 'from-blue-500 to-blue-600'
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
      <div>
        <h1 className="text-3xl font-bold text-gray-800">AI Model Explainability</h1>
        <p className="text-gray-600 mt-1">Understanding how the AI makes risk predictions</p>
      </div>

      {/* Explainability Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactStats.map((stat, index) => (
          <MetricsCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Global Feature Importance */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Global Feature Importance</h2>
          <div className="text-sm text-gray-500">
            Based on SHAP values across all predictions
          </div>
        </div>
        <FeatureImportance features={globalExplanations} onFeatureSelect={setSelectedFeature} />
      </motion.div>

      {/* Feature Deep Dive */}
      {selectedFeature && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Deep Dive: {selectedFeature.feature}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Clinical Significance</h4>
              <p className="text-gray-600 text-sm">{selectedFeature.description}</p>
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Importance Score:</span>
                  <span className="font-semibold text-gray-800">
                    {(selectedFeature.importance * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-500">Risk Impact:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedFeature.impact === 'high' ? 'bg-red-100 text-red-800' :
                    selectedFeature.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedFeature.impact.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Population Distribution</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>High Risk Patients</span>
                  <span className="font-medium">23%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Medium Risk Patients</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Low Risk Patients</span>
                  <span className="font-medium">32%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Clinical Interpretation Guide */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
      >
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Clinical Interpretation Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">High Impact Features ( greater than 20%)</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Require immediate clinical attention</li>
              <li>• Strong predictive power for deterioration</li>
              <li>• Should be monitored closely</li>
              <li>• Consider intervention triggers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Medium Impact Features (5-20%)</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Important for overall risk assessment</li>
              <li>• Regular monitoring recommended</li>
              <li>• Consider in care planning</li>
              <li>• Secondary intervention targets</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Explainability;
