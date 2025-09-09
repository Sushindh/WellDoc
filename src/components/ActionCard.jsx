import { motion } from 'framer-motion';

const ActionCard = ({ title, priority, description, dueDate, icon: Icon, delay = 0 }) => {
  const priorityColors = {
    high: 'from-red-500 to-red-600',
    medium: 'from-orange-500 to-orange-600',
    low: 'from-green-500 to-green-600'
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay }}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-3">
        <div className={`w-10 h-10 bg-gradient-to-r ${priorityColors[priority]} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800">{title}</h4>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className={`text-xs px-2 py-1 rounded-full ${
              priority === 'high' ? 'bg-red-100 text-red-800' :
              priority === 'medium' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
            }`}>
              {priority.toUpperCase()} PRIORITY
            </span>
            <span className="text-xs text-gray-500">Due: {dueDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActionCard;
