import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const FeatureImportance = ({ features, onFeatureSelect }) => {
  const maxImportance = Math.max(...features.map(f => f.importance));

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'increasing': return TrendingUp;
      case 'decreasing': return TrendingDown;
      default: return Minus;
    }
  };

  const getTrendColor = (trend) => {
    switch(trend) {
      case 'increasing': return 'text-red-500';
      case 'decreasing': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-3">
      {features.map((feature, index) => {
        const TrendIcon = getTrendIcon(feature.trend);
        const percentage = (feature.importance / maxImportance) * 100;
        
        return (
          <motion.div
            key={feature.feature}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
            onClick={() => onFeatureSelect(feature)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-800">{feature.feature}</h3>
                <TrendIcon className={`w-4 h-4 ${getTrendColor(feature.trend)}`} />
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  feature.impact === 'high' ? 'bg-red-100 text-red-800' :
                  feature.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {feature.impact.toUpperCase()}
                </span>
                <span className="font-semibold text-gray-800 w-12 text-right">
                  {(feature.importance * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                    className={`h-2 rounded-full ${
                      feature.impact === 'high' ? 'bg-red-500' :
                      feature.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  />
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FeatureImportance;
