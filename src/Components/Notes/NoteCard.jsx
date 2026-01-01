import { useState } from "react";
import ReminderPicker from "./ReminderPicker";

const COLORS = [
  "#303134",
  "#5c2b29",
  "#345920",
  "#284255",
  "#5b2245",
  "#614a19",
];

const NoteCard = ({ note, updateNote, pinNote, archiveNote, deleteNote }) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [showReminder, setShowReminder] = useState(false);

  const saveEdit = () => {
    updateNote({ ...note, title, text });
    setEdit(false);
  };

  return (
    <div
      style={{ backgroundColor: note.color }}
      className="relative p-3 rounded-lg border border-[#5f6368]"
    >
      {pinNote && (
        <button
          onClick={() => pinNote(note.id)}
          className="absolute top-2 right-2 text-sm"
          title="Pin"
        >
          📌
        </button>
      )}

      {edit ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full bg-transparent outline-none font-medium mb-2"
          />

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Take a note..."
            className="w-full bg-transparent outline-none resize-none text-sm"
          />
        </>
      ) : (
        <>
          {note.title && (
            <h3
              onClick={() => setEdit(true)}
              className="font-medium mb-1 cursor-pointer break-words"
            >
              {note.title}
            </h3>
          )}

          <p
            onClick={() => setEdit(true)}
            className="text-sm cursor-pointer break-words whitespace-pre-wrap"
          >
            {note.text}
          </p>
        </>
      )}

      {note.reminder && (
        <div className="mt-2 text-xs text-yellow-400">
          ⏰ {new Date(note.reminder).toLocaleString()}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between opacity-0 hover:opacity-100 transition">
        <div className="flex gap-3">
          <button onClick={() => setShowReminder(true)} title="Reminder">
            ⏰
          </button>

          <button onClick={() => setEdit(true)} title="Edit">
            ✏️
          </button>

          {archiveNote && (
            <button onClick={() => archiveNote(note.id)} title="Archive">
              📦
            </button>
          )}

          <button onClick={() => deleteNote(note.id)} title="Delete">
            🗑️
          </button>
        </div>

        <div className="flex gap-2">
          {updateNote &&
            COLORS.map((c) => (
              <div
                key={c}
                onClick={() => updateNote({ ...note, color: c })}
                style={{ backgroundColor: c }}
                className="w-4 h-4 rounded-full cursor-pointer border"
                title="Change color"
              />
            ))}
        </div>
      </div>

      {edit && (
        <div className="text-right mt-2">
          <button onClick={saveEdit} className="text-sm text-blue-400">
            Save
          </button>
        </div>
      )}

      {showReminder && (
        <ReminderPicker
          onSave={(value) => {
            updateNote({ ...note, reminder: value });
            setShowReminder(false);
          }}
          onCancel={() => setShowReminder(false)}
        />
      )}
    </div>
  );
};

export default NoteCard;
