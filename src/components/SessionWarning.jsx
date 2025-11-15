import React from 'react';
import { useSessionManager } from '../hooks/useSessionManager';
import { AlertTriangle, Clock, RefreshCw, LogOut } from 'lucide-react';

const SessionWarning = () => {
  const { sessionWarning, extendSession, logout, timeUntilExpiry } = useSessionManager();

  if (!sessionWarning) return null;

  const minutesLeft = Math.ceil(timeUntilExpiry / (1000 * 60));

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-yellow-800 mb-1">
              Session Expiring Soon
            </h3>
            <p className="text-sm text-yellow-700 mb-3">
              Your session will expire in {minutesLeft} minute{minutesLeft !== 1 ? 's' : ''}.
              Would you like to extend your session?
            </p>
            <div className="flex space-x-2">
              <button
                onClick={extendSession}
                className="flex items-center px-3 py-1.5 bg-yellow-600 text-white text-sm rounded-md hover:bg-yellow-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Extend Session
              </button>
              <button
                onClick={logout}
                className="flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Logout Now
              </button>
            </div>
          </div>
          <Clock className="w-4 h-4 text-yellow-600 ml-2 flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default SessionWarning;