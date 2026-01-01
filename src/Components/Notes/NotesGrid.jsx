import NoteCard from "./NoteCard";

const NotesGrid = ({
  notes,
  updateNote,
  pinNote,
  archiveNote,
  deleteNote,
}) => {
  const pinned = notes.filter((n) => n.pinned);
  const normal = notes.filter((n) => !n.pinned);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[...pinned, ...normal].map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          updateNote={updateNote}
          pinNote={pinNote}
          archiveNote={archiveNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
};
export default NotesGrid;
