import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Brain, 
  Activity,
  TrendingUp
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', color: 'from-blue-500 to-blue-600' },
    { path: '/analytics', icon: TrendingUp, label: 'Analytics', color: 'from-green-500 to-green-600' },
    { path: '/metrics', icon: BarChart3, label: 'Model Metrics', color: 'from-purple-500 to-purple-600' },
    { path: '/explainability', icon: Brain, label: 'AI Explainability', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-xl border-r border-gray-100 z-40"
    >
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gradient-to-r text-white shadow-md ' + item.color
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'group-hover:text-gray-800'}`} />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-2">Quick Stats</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">High Risk Patients</span>
              <span className="font-semibold text-red-600">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Model Accuracy</span>
              <span className="font-semibold text-green-600">99.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Active Predictions</span>
              <span className="font-semibold text-blue-600">1,247</span>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
