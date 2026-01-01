import { useState } from "react";
import { Trash } from "lucide-react";

const Edit = ({ labels, setLabels }) => {
  const [text, setText] = useState("");

  const addLabel = () => {
    if (!text.trim()) return;
    if (labels.includes(text)) return;
    setLabels([...labels, text]);
    setText("");
  };

  const deleteLabel = (label) => {
    setLabels(labels.filter((l) => l !== label));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-lg mb-4">Edit labels</h2>

      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Create new label"
          className="flex-1 bg-[#303134] px-3 py-2 outline-none rounded"
        />
        <button onClick={addLabel}>Add</button>
      </div>

      <ul className="space-y-2">
        {labels.map((label) => (
          <li
            key={label}
            className="flex justify-between items-center bg-[#303134] px-3 py-2 rounded"
          >
            <span>{label}</span>
            <button
              onClick={() => deleteLabel(label)}
              className="text-red-400"
            >
              <Trash size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Edit;
