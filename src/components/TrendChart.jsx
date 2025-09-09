import { motion } from 'framer-motion';

const TrendChart = ({ data }) => {
  const maxHbA1c = Math.max(...data.map(d => d.hba1c));
  const minHbA1c = Math.min(...data.map(d => d.hba1c));
  
  return (
    <div className="h-64 relative">
      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>HbA1c Trend</span>
        <span>Target: &lt; 7.0%</span>
      </div>
      
      <div className="relative h-48 bg-gray-50 rounded-lg p-4">
        {/* Target line */}
        <div className="absolute left-4 right-4 border-t-2 border-dashed border-green-500 opacity-50" style={{top: '60%'}}>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs absolute -top-6 left-0">
            Target (7.0%)
          </span>
        </div>
        
        {/* Data points */}
        <div className="flex justify-between items-end h-full pt-8">
          {data.map((point, index) => (
            <motion.div
              key={point.date}
              initial={{ height: 0 }}
              animate={{ height: `${((point.hba1c - minHbA1c) / (maxHbA1c - minHbA1c)) * 100}%` }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg w-16 flex flex-col justify-end items-center relative"
            >
              <span className="text-white text-xs font-semibold mb-2">{point.hba1c}%</span>
              <span className="text-xs text-gray-600 absolute -bottom-6">
                {new Date(point.date).toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendChart;
