import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { TrendingUp, Target, BarChart3, Zap } from 'lucide-react';
import MetricsCard from '../components/MetricsCard';
import ConfusionMatrix from '../components/ConfusionMatrix';

const ModelMetrics = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    // Mock metrics data
    setMetrics({
      auroc: 0.992,
      auprc: 0.987,
      accuracy: 0.992,
      precision: 0.985,
      recall: 0.988,
      f1Score: 0.986,
    //   confusionMatrix: {
    //     truePositive: 245,
    //     falsePositive: 12,
    //     trueNegative: 1189,
    //     falseNegative: 8
    //   }
    });
  }, []);

  const performanceMetrics = [
    {
      title: 'AUROC Score',
      value: metrics.auroc?.toFixed(3) || '0.000',
      change: '+0.001',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'AUPRC Score',
      value: metrics.auprc?.toFixed(3) || '0.000',
      change: '+0.002',
      icon: Target,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Accuracy',
      value: ((metrics.accuracy || 0) * 100).toFixed(1) + '%',
      change: '+0.1%',
      icon: Zap,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'F1 Score',
      value: metrics.f1Score?.toFixed(3) || '0.000',
      change: '+0.001',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600'
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
        <h1 className="text-3xl font-bold text-gray-800">Model Performance Metrics</h1>
        <p className="text-gray-600 mt-1">Random Forest model evaluation results</p>
      </div>

      {/* Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <MetricsCard key={metric.title} {...metric} delay={index * 0.1} />
        ))}
      </div>

      {/* Confusion Matrix */}
      {/* <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confusion Matrix</h2>
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-100 p-6 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-800">{metrics.confusionMatrix?.trueNegative}</p>
              <p className="text-sm text-green-600">True Negative</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg text-center">
              <p className="text-2xl font-bold text-red-800">{metrics.confusionMatrix?.falsePositive}</p>
              <p className="text-sm text-red-600">False Positive</p>
            </div>
            <div className="bg-red-100 p-6 rounded-lg text-center">
              <p className="text-2xl font-bold text-red-800">{metrics.confusionMatrix?.falseNegative}</p>
              <p className="text-sm text-red-600">False Negative</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg text-center">
              <p className="text-2xl font-bold text-green-800">{metrics.confusionMatrix?.truePositive}</p>
              <p className="text-sm text-green-600">True Positive</p>
            </div>
          </div>
        </div>
      </motion.div> */}

        <ConfusionMatrix confusionMatrix={metrics.confusionMatrix} />

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Precision & Recall</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Precision</span>
              <span className="font-semibold text-gray-800">{((metrics.precision || 0) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Recall</span>
              <span className="font-semibold text-gray-800">{((metrics.recall || 0) * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Specificity</span>
              <span className="font-semibold text-gray-800">99.0%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Model Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Algorithm</span>
              <span className="font-semibold text-gray-800">Random Forest</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Training Samples</span>
              <span className="font-semibold text-gray-800">5,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Test Samples</span>
              <span className="font-semibold text-gray-800">1,454</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Features</span>
              <span className="font-semibold text-gray-800">12</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ModelMetrics;
