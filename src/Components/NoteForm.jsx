import { useState } from "react";

const NoteForm = ({ setNotes, activeLabel }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const saveNote = () => {
    if (!title && !text) return;

    setNotes((prev) => [
      {
        id: Date.now(),
        title,
        text,
        color: "#fff475",     // default color
        pinned: false,
        archived: false,
        deleted: false,
        reminder: "",
        label: activeLabel || "",
      },
      ...prev,
    ]);

    setTitle("");
    setText("");
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-[#303134] p-4 rounded-xl">
      <input
        className="w-full bg-transparent text-lg outline-none text-white"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full bg-transparent outline-none resize-none mt-2 text-white"
        placeholder="Take a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-end mt-3">
        <button onClick={saveNote} className="text-blue-400">
          Save
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
