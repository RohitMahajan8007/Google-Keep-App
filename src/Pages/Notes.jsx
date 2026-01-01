import NoteInput from "../Components/Notes/NoteInput";
import NotesGrid from "../Components/Notes/NotesGrid";
import NoResults from "../Components/Common/NoResults";

const Notes = ({
  notes,
  addNote,
  updateNote,
  pinNote,
  archiveNote,
  deleteNote,
  search,
}) => {
  const isSearching = search && search.trim().length > 0;

  return (
    <>
      {!isSearching && <NoteInput addNote={addNote} />}

      {isSearching && notes.length === 0 && <NoResults />}

      {notes.length > 0 && (
        <NotesGrid
          notes={notes}
          updateNote={updateNote}
          pinNote={pinNote}
          archiveNote={archiveNote}
          deleteNote={deleteNote}
        />
      )}
    </>
  );
};

export default Notes;
