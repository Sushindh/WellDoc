import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Target,
  Filter,
  Download
} from 'lucide-react';
import MetricsCard from '../components/MetricsCard';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('3months');
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    // Mock analytics data
    setAnalyticsData({
      riskTrends: {
        current: 23,
        previous: 19,
        change: 4
      },
      interventions: {
        successful: 87,
        total: 95,
        rate: 91.6
      },
      predictions: {
        accuracy: 99.2,
        totalPredictions: 1247,
        highRiskIdentified: 312
      },
      outcomes: {
        preventedHospitalizations: 45,
        earlyInterventions: 78,
        improvedAdherence: 156
      }
    });
  }, [timeRange]);

  const analyticsStats = [
    {
      title: 'Risk Predictions Made',
      value: analyticsData.predictions?.totalPredictions || 0,
      change: '+156 this month',
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'High Risk Identified',
      value: analyticsData.predictions?.highRiskIdentified || 0,
      change: '+23 this month',
      icon: Users,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Successful Interventions',
      value: `${analyticsData.interventions?.rate || 0}%`,
      change: '+2.3%',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Prevented Hospitalizations',
      value: analyticsData.outcomes?.preventedHospitalizations || 0,
      change: '+12 this month',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const riskDistributionData = [
    { month: 'Jun', high: 18, medium: 45, low: 67 },
    { month: 'Jul', high: 21, medium: 48, low: 71 },
    { month: 'Aug', high: 19, medium: 52, low: 74 },
    { month: 'Sep', high: 23, medium: 47, low: 78 }
  ];

  const interventionData = [
    { type: 'Medication Adherence', successful: 34, total: 38, rate: 89.5 },
    { type: 'Lifestyle Counseling', successful: 28, total: 31, rate: 90.3 },
    { type: 'Emergency Consultations', successful: 15, total: 16, rate: 93.8 },
    { type: 'Care Plan Adjustments', successful: 10, total: 10, rate: 100 }
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
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and outcomes tracking</p>
        </div>
        <div className="flex space-x-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1month">Last Month</option>
            <option value="3months">Last 3 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </motion.button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsStats.map((stat, index) => (
          <MetricsCard key={stat.title} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Risk Trends Over Time */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Risk Distribution Trends</h2>
        <div className="space-y-4">
          {riskDistributionData.map((data, index) => (
            <div key={data.month} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
              <div className="flex-1 flex space-x-1">
                <div 
                  className="bg-red-500 rounded-l"
                  style={{ width: `${(data.high / (data.high + data.medium + data.low)) * 100}%`, height: '20px' }}
                ></div>
                <div 
                  className="bg-yellow-500"
                  style={{ width: `${(data.medium / (data.high + data.medium + data.low)) * 100}%`, height: '20px' }}
                ></div>
                <div 
                  className="bg-green-500 rounded-r"
                  style={{ width: `${(data.low / (data.high + data.medium + data.low)) * 100}%`, height: '20px' }}
                ></div>
              </div>
              <div className="flex space-x-4 text-sm">
                <span className="text-red-600 font-medium">{data.high}</span>
                <span className="text-yellow-600 font-medium">{data.medium}</span>
                <span className="text-green-600 font-medium">{data.low}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-6 mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Low Risk</span>
          </div>
        </div>
      </motion.div>

      {/* Intervention Success Rates */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Intervention Success Rates</h2>
        <div className="space-y-4">
          {interventionData.map((intervention, index) => (
            <motion.div
              key={intervention.type}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{intervention.type}</h3>
                <p className="text-sm text-gray-600">
                  {intervention.successful}/{intervention.total} successful interventions
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${intervention.rate}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="font-semibold text-green-600">{intervention.rate}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Outcome Impact Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
      >
        <h2 className="text-xl font-semibold text-green-900 mb-4">Clinical Impact Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-800">{analyticsData.outcomes?.preventedHospitalizations}</div>
            <div className="text-sm text-green-700">Prevented Hospitalizations</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-800">{analyticsData.outcomes?.earlyInterventions}</div>
            <div className="text-sm text-green-700">Early Interventions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-800">{analyticsData.outcomes?.improvedAdherence}</div>
            <div className="text-sm text-green-700">Improved Adherence Cases</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
