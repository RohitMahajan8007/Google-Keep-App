import { useState } from "react";

const NoteInput = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const submit = () => {
    if (!text.trim()) return;
    addNote({
      id: Date.now(),
      title,
      text,
      color: "#303134",
      pinned: false,
    });
    setTitle("");
    setText("");
  };

  return (
    <div className="max-w-xl mx-auto mb-6 bg-[#303134] p-3 rounded">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-transparent outline-none mb-2"
      />
      <textarea
        placeholder="Take a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-transparent outline-none resize-none"
      />
      <button onClick={submit} className="mt-2 text-sm">
        Add
      </button>
    </div>
  );
};
export default NoteInput;
