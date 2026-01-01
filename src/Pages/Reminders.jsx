import NoteCard from "../Components/Notes/NoteCard";
import NoResults from "../Components/Common/NoResults";

const Reminders = ({ notes, updateNote, deleteNote }) => {
  const reminderNotes = notes.filter((n) => n.reminder);

  if (reminderNotes.length === 0) {
    return <NoResults text="No reminders found" />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {reminderNotes.map((note) => (
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

export default Reminders;
