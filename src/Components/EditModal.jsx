import { useState } from "react";

const EditModal = ({ note, setEditNote, setNotes }) => {
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  const saveEdit = () => {
    setNotes(prev =>
      prev.map(n =>
        n.id === note.id ? { ...n, title, text } : n
      )
    );
    setEditNote(null);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-4 rounded-xl w-80 text-black">
        <input
          className="w-full outline-none mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full outline-none resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end mt-3">
          <button onClick={saveEdit} className="text-blue-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
