import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchHistory } from '../store/quantitySlice';
import { Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const HistoryPanel = () => {
  const dispatch = useDispatch();
  const { history, historyLoading } = useSelector((state) => state.quantity);

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  // Helper to format the backend response into a readable string
  const formatHistoryItem = (item) => {
    const { operation, thisValue, thisUnit, thatValue, thatUnit, resultString, resultValue, resultUnit } = item;

    const val1 = `${thisValue} ${thisUnit}`;
    const val2 = `${thatValue} ${thatUnit}`;

    switch (operation) {
      case 'ADD':
        return `${val1} + ${val2} = ${resultValue} ${resultUnit}`;
      case 'SUBTRACT':
        return `${val1} - ${val2} = ${resultValue} ${resultUnit}`;
      case 'CONVERT':
        return `${val1} → ${resultString}`;
      case 'DIVIDE':
        return `${val1} / ${val2} = ${resultString}`;
      case 'COMPARE':
        return `${val1} == ${val2} → ${resultString}`;
      default:
        return resultString || "Calculation";
    }
  };

  return (
    <div className="bg-gray-800/30 rounded-2xl border border-gray-700 backdrop-blur-md flex flex-col h-[600px]">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-blue-400" />
          <h2 className="text-sm uppercase tracking-widest text-gray-400 font-bold">Recent History</h2>
        </div>
        <button
          onClick={() => dispatch(fetchHistory())}
          className={`text-gray-500 hover:text-white transition-colors ${historyLoading ? 'animate-spin' : ''}`}
        >
          <RefreshCw size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {historyLoading && history.length === 0 ? (
          <div className="text-center py-10 text-gray-600">Loading...</div>
        ) : history.length === 0 ? (
          <div className="text-center py-10 text-gray-600 italic">No history found</div>
        ) : (
          history.map((item) => (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              key={item.id}
              className="group p-3 bg-gray-900/40 rounded-xl border border-gray-800 hover:border-blue-500/50 transition-all"
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${item.operation === 'ADD' ? 'bg-green-500/10 text-green-500' :
                  item.operation === 'CONVERT' ? 'bg-blue-500/10 text-blue-500' :
                    'bg-purple-500/10 text-purple-500'
                  }`}>
                  {item.operation}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">#{item.id}</span>
              </div>
              <p className="text-sm text-gray-300 font-mono leading-relaxed">
                {formatHistoryItem(item)}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};