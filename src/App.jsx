import { useEffect, useState } from "react";

import Navbar from "./Components/Layout/Navbar";
import Sidebar from "./Components/Layout/Sidebar";

import Notes from "./Pages/Notes";
import Reminders from "./Pages/Reminders";
import Archive from "./Pages/Archive";
import Bin from "./Pages/Bin";
import Edit from "./Pages/Edit";

const App = () => {
  const [page, setPage] = useState("notes");

  const [showSidebar, setShowSidebar] = useState(true);

  const [search, setSearch] = useState("");

  const [labels, setLabels] = useState([]);
  const [activeLabel, setActiveLabel] = useState(null);

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const [archive, setArchive] = useState(() => {
    const saved = localStorage.getItem("archive");
    return saved ? JSON.parse(saved) : [];
  });

  const [bin, setBin] = useState(() => {
    const saved = localStorage.getItem("bin");
    return saved ? JSON.parse(saved) : [];
  });

  const [labelsState, setLabelsState] = useState(() => {
    const saved = localStorage.getItem("labels");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("archive", JSON.stringify(archive));
  }, [archive]);

  useEffect(() => {
    localStorage.setItem("bin", JSON.stringify(bin));
  }, [bin]);

  useEffect(() => {
    localStorage.setItem("labels", JSON.stringify(labelsState));
  }, [labelsState]);

  const filterBySearch = (list) => {
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(
      (n) =>
        n.title?.toLowerCase().includes(q) || n.text?.toLowerCase().includes(q)
    );
  };

  const filterByLabel = (list) => {
    if (!activeLabel) return list;
    return list.filter((n) => n.label === activeLabel);
  };

  const addNote = (note) => {
    setNotes((prev) => [...prev, { ...note, label: activeLabel }]);
  };

  const updateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
    setArchive((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
  };

  const pinNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const deleteFromNotes = (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    setNotes((prev) => prev.filter((n) => n.id !== id));
    setBin((prev) => [...prev, note]);
  };

  const archiveNote = (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;

    setNotes((prev) => prev.filter((n) => n.id !== id));
    setArchive((prev) => [...prev, note]);
  };

  const deleteFromArchive = (id) => {
    const note = archive.find((n) => n.id === id);
    if (!note) return;

    setArchive((prev) => prev.filter((n) => n.id !== id));
    setBin((prev) => [...prev, note]);
  };

  const deleteForever = (id) => {
    setBin((prev) => prev.filter((n) => n.id !== id));
  };

  useEffect(() => {
    if (page !== "notes") setActiveLabel(null);
  }, [page]);

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        toggleSidebar={() => setShowSidebar((p) => !p)}
      />

      <div className="flex">
        {showSidebar && (
          <Sidebar
            page={page}
            setPage={setPage}
            labels={labelsState}
            setActiveLabel={setActiveLabel}
          />
        )}

        <main className="flex-1 p-6">
          {page === "notes" && (
            <Notes
              notes={filterBySearch(filterByLabel(notes))}
              addNote={addNote}
              updateNote={updateNote}
              pinNote={pinNote}
              archiveNote={archiveNote}
              deleteNote={deleteFromNotes}
              search={search}
            />
          )}

          {page === "reminders" && (
            <Reminders
              notes={filterBySearch(notes)}
              updateNote={updateNote}
              deleteNote={deleteFromNotes}
            />
          )}

          {page === "archive" && (
            <Archive
              notes={filterBySearch(archive)}
              updateNote={updateNote}
              deleteNote={deleteFromArchive}
            />
          )}

          {page === "bin" && <Bin notes={bin} deleteForever={deleteForever} />}

          {page === "edit" && (
            <Edit labels={labelsState} setLabels={setLabelsState} />
          )}
        </main>
      </div>
    </>
  );
};

export default App;
