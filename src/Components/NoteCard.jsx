import { useState } from "react";

const COLORS = ["#fff475", "#f28b82", "#ccff90", "#aecbfa",""];

const NoteCard = ({ note, tab, labels, setNotes, setEditNote }) => {
  const [showColors, setShowColors] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [showReminder, setShowReminder] = useState(false);

  // ===== COMMON ACTIONS =====
  const archiveNote = () => {
    setNotes(prev =>
      prev.map(n =>
        n.id === note.id
          ? { ...n, archived: true, deleted: false }
          : n
      )
    );
  };

  const deleteNote = () => {
    setNotes(prev =>
      prev.map(n =>
        n.id === note.id ? { ...n, deleted: true } : n
      )
    );
  };

  const unarchiveNote = () => {
    setNotes(prev =>
      prev.map(n =>
        n.id === note.id ? { ...n, archived: false } : n
      )
    );
  };

  const restoreNote = () => {
    setNotes(prev =>
      prev.map(n =>
        n.id === note.id ? { ...n, deleted: false } : n
      )
    );
  };

  const deleteForever = () => {
    setNotes(prev => prev.filter(n => n.id !== note.id));
  };

  return (
    <div
      onDoubleClick={() => setEditNote(note)}
      className="p-4 rounded-xl shadow-md flex flex-col justify-between"
      style={{ backgroundColor: note.color }}
    >
      {/* ===== CONTENT ===== */}
      <div>
        {note.title && (
          <h3 className="font-semibold text-black text-lg">
            {note.title}
          </h3>
        )}

        {note.text && (
          <p className="mt-2 text-black text-sm whitespace-pre-wrap">
            {note.text}
          </p>
        )}

        {note.reminder && (
          <div className="mt-2 inline-block bg-black/20 text-xs px-2 py-1 rounded">
            ⏰ {note.reminder}
          </div>
        )}

        {note.label && (
          <div className="mt-1 text-xs text-blue-800 font-medium">
            #{note.label}
          </div>
        )}
      </div>

      {/* ===== FOOTER ===== */}
      <div className="mt-4 space-y-2 text-xs text-black">

        {/* ICON BAR */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          {/* LEFT ICONS */}
          <div className="flex gap-3 flex-wrap">
            {(tab === "notes" || tab === "reminder") && (
              <>
                <button onClick={() => setShowColors(!showColors)}>🎨</button>
                <button onClick={() => setShowReminder(!showReminder)}>⏰</button>
                <button onClick={() => setShowLabel(!showLabel)}>🏷</button>
              </>
            )}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex gap-3">
            {(tab === "notes" || tab === "reminder") && (
              <>
                <button onClick={archiveNote}>🗄</button>
                <button onClick={deleteNote}>🗑</button>
              </>
            )}

            {tab === "archive" && (
              <>
                <button onClick={unarchiveNote}>↩️</button>
                <button onClick={deleteNote}>🗑</button>
              </>
            )}

            {tab === "bin" && (
              <>
                <button onClick={restoreNote}>♻️</button>
                <button onClick={deleteForever}>❌</button>
              </>
            )}
          </div>
        </div>

        {/* REMINDER PICKER */}
        {showReminder && (
          <input
            type="datetime-local"
            className="w-full text-xs p-1 rounded outline-none"
            onChange={(e) => {
              setNotes(prev =>
                prev.map(n =>
                  n.id === note.id
                    ? { ...n, reminder: e.target.value }
                    : n
                )
              );
              setShowReminder(false);
            }}
          />
        )}

        {/* COLOR PICKER */}
        {showColors && (
          <div className="flex gap-2 flex-wrap">
            {COLORS.map(c => (
              <div
                key={c}
                className="w-4 h-4 rounded-full border cursor-pointer"
                style={{ backgroundColor: c }}
                onClick={() =>
                  setNotes(prev =>
                    prev.map(n =>
                      n.id === note.id ? { ...n, color: c } : n
                    )
                  )
                }
              />
            ))}
          </div>
        )}

        {/* LABEL PICKER */}
        {showLabel && (
          <select
            className="w-full text-xs p-1 rounded"
            value={note.label || ""}
            onChange={(e) => {
              setNotes(prev =>
                prev.map(n =>
                  n.id === note.id
                    ? { ...n, label: e.target.value }
                    : n
                )
              );
              setShowLabel(false);
            }}
          >
            <option value="">No label</option>
            {labels.map(l => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
