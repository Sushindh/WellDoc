import { motion } from 'framer-motion';

const RiskMeter = ({ patients }) => {
  const riskLevels = {
    high: patients.filter(p => p.riskScore > 0.7).length,
    medium: patients.filter(p => p.riskScore > 0.4 && p.riskScore <= 0.7).length,
    low: patients.filter(p => p.riskScore <= 0.4).length
  };

  const total = patients.length;

  return (
    <div className="flex items-center justify-center space-x-8">
      <div className="flex space-x-2">
        {['high', 'medium', 'low'].map((level) => {
          const count = riskLevels[level];
          const percentage = total > 0 ? (count / total) * 100 : 0;
          
          return (
            <div key={level} className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: level === 'high' ? 0 : level === 'medium' ? 0.1 : 0.2 }}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                  level === 'high' ? 'bg-red-500' :
                  level === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
              >
                {count}
              </motion.div>
              <p className="text-sm text-gray-600 mt-2 capitalize">{level} Risk</p>
              <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RiskMeter;
