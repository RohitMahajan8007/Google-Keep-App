const ReminderPicker = ({ onSave, onClose }) => {
  return (
    <div className="absolute z-50 bg-[#303134] border border-[#5f6368] rounded p-3 mt-2">
      <input
        type="datetime-local"
        onChange={(e) => onSave(e.target.value)}
        className="bg-transparent text-sm outline-none"
      />

      <button
        onClick={onClose}
        className="block mt-2 text-xs text-gray-400 hover:text-white"
      >
        Cancel
      </button>
    </div>
  );
};

export default ReminderPicker;
