const categories = [
  { id: 'LENGTH', label: 'Length', icon: '📏' },
  { id: 'VOLUME', label: 'Volume', icon: '🧪' },
  { id: 'WEIGHT', label: 'Weight', icon: '⚖️' },
  { id: 'TEMPERATURE', label: 'Temp', icon: '🌡️' },
];

export const CategorySelector = ({ selected, onSelect }) => (
  <div className="flex space-x-2 p-1 bg-gray-800/50 rounded-lg backdrop-blur-sm mb-8">
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.id)}
        className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md transition-all ${
          selected === cat.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
        }`}
      >
        <span className="mr-2">{cat.icon}</span>
        <span className="text-sm font-semibold">{cat.label}</span>
      </button>
    ))}
  </div>
);