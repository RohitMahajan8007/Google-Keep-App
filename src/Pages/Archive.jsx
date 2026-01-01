import NoteCard from "../Components/Notes/NoteCard";
import NoResults from "../Components/Common/NoResults";

const Archive = ({ notes, updateNote, deleteNote }) => {
  if (notes.length === 0) {
    return <NoResults text="No archived notes found" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      ))}
    </div>
  );
};

export default Archive;
