import { Equal, ArrowRightLeft, Plus, Minus, Divide } from 'lucide-react';

const operations = [
  { id: 'EQUALITY', label: 'Equality', icon: Equal },
  { id: 'CONVERSION', label: 'Convert', icon: ArrowRightLeft },
  { id: 'ADDITION', label: 'Add', icon: Plus },
  { id: 'SUBTRACTION', label: 'Subtract', icon: Minus },
  { id: 'DIVISION', label: 'Ratio', icon: Divide },
];

export const OperationSelector = ({ selected, onSelect, disabledOperations = [] }) => (
  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
    {operations.map((op) => {
      const isDisabled = disabledOperations.includes(op.id);
      
      return (
        <button
          key={op.id}
          disabled={isDisabled}
          onClick={() => !isDisabled && onSelect(op.id)}
          className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 ${
            isDisabled 
              ? 'opacity-30 cursor-not-allowed bg-gray-900/20 border-gray-800' 
              : selected === op.id 
                ? 'bg-blue-600/30 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                : 'bg-gray-800/40 border-gray-700 hover:bg-gray-700/50'
          } backdrop-blur-md`}
        >
          <op.icon className={`mb-2 w-6 h-6 ${isDisabled ? 'text-gray-600' : ''}`} />
          <span className={`text-xs font-medium ${isDisabled ? 'text-gray-600' : ''}`}>
            {op.label}
          </span>
        </button>
      );
    })}
  </div>
);