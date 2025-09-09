import { motion } from 'framer-motion';

const ConfusionMatrix = ({ 
  confusionMatrix = {
    truePositive: 245,
    falsePositive: 12,
    trueNegative: 1189,
    falseNegative: 8
  }, 
  labels = ['No Risk', 'At Risk'] 
}) => {
  // Add null check at the beginning
  if (!confusionMatrix) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Confusion Matrix</h2>
        <div className="text-center text-gray-500">
          <p>Confusion matrix data not available</p>
        </div>
      </div>
    );
  }

  const { truePositive, falsePositive, trueNegative, falseNegative } = confusionMatrix;
  
  // Rest of your component code remains the same...
  const total = truePositive + falsePositive + trueNegative + falseNegative;
  const accuracy = ((truePositive + trueNegative) / total * 100).toFixed(1);
  const precision = (truePositive / (truePositive + falsePositive) * 100).toFixed(1);
  const recall = (truePositive / (truePositive + falseNegative) * 100).toFixed(1);

  const matrixData = [
    [
      { value: trueNegative, label: 'True Negative', color: 'bg-green-100 text-green-800', percentage: (trueNegative/total*100).toFixed(1) },
      { value: falsePositive, label: 'False Positive', color: 'bg-red-100 text-red-800', percentage: (falsePositive/total*100).toFixed(1) }
    ],
    [
      { value: falseNegative, label: 'False Negative', color: 'bg-red-100 text-red-800', percentage: (falseNegative/total*100).toFixed(1) },
      { value: truePositive, label: 'True Positive', color: 'bg-green-100 text-green-800', percentage: (truePositive/total*100).toFixed(1) }
    ]
  ];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="space-y-6">
        {/* Matrix Visualization */}
        <div className="max-w-md mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Confusion Matrix</h3>
            <p className="text-sm text-gray-600">Model predictions vs actual outcomes</p>
          </div>
          
          {/* Labels */}
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div></div>
            <div className="text-center text-sm font-medium text-gray-600 col-span-2">Predicted</div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div></div>
            <div className="text-center text-xs text-gray-500">{labels[0]}</div>
            <div className="text-center text-xs text-gray-500">{labels[1]}</div>
          </div>
          
          {/* Matrix */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col justify-center">
              <div className="text-sm font-medium text-gray-600 -rotate-90 text-center">Actual</div>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-500 text-center mb-1">{labels[0]}</div>
              {matrixData.map((row, rowIndex) => (
                <div key={rowIndex} className="flex space-x-2">
                  {row.map((cell, colIndex) => (
                    <motion.div
                      key={`${rowIndex}-${colIndex}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: (rowIndex * 2 + colIndex) * 0.2 }}
                      className={`w-20 h-20 ${cell.color} rounded-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition-shadow`}
                    >
                      <span className="text-xl font-bold">{cell.value}</span>
                      <span className="text-xs">{cell.percentage}%</span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center space-y-8">
              <div className="text-xs text-gray-500 text-center">{labels[1]}</div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-blue-50 p-4 rounded-lg text-center"
          >
            <div className="text-2xl font-bold text-blue-800">{accuracy}%</div>
            <div className="text-sm text-blue-600">Accuracy</div>
            <div className="text-xs text-blue-500 mt-1">Correct predictions</div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-green-50 p-4 rounded-lg text-center"
          >
            <div className="text-2xl font-bold text-green-800">{precision}%</div>
            <div className="text-sm text-green-600">Precision</div>
            <div className="text-xs text-green-500 mt-1">True positives / All positives</div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-purple-50 p-4 rounded-lg text-center"
          >
            <div className="text-2xl font-bold text-purple-800">{recall}%</div>
            <div className="text-sm text-purple-600">Recall</div>
            <div className="text-xs text-purple-500 mt-1">True positives / Actual positives</div>
          </motion.div>
        </div>

        {/* Interpretation Guide */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Clinical Interpretation</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium text-green-700">True Positives ({truePositive}):</span> Correctly identified at-risk patients
            </div>
            <div>
              <span className="font-medium text-green-700">True Negatives ({trueNegative}):</span> Correctly identified stable patients
            </div>
            <div>
              <span className="font-medium text-red-700">False Positives ({falsePositive}):</span> Incorrectly flagged as at-risk
            </div>
            <div>
              <span className="font-medium text-red-700">False Negatives ({falseNegative}):</span> Missed at-risk patients
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfusionMatrix;
