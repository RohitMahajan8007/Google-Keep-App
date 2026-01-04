import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import NoteForm from "./Components/NoteForm";
import NoteCard from "./Components/NoteCard";
import EditModal from "./Components/EditModal";
import AuthModal from "./Components/AuthModal";
import ProfileModal from "./Components/ProfileModal";

const App = () => {
  /* ================= AUTH ================= */
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || {}
  );
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("currentUser") || null
  );
  const [showAuth, setShowAuth] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const user = currentUser ? users[currentUser] : null;

  /* ================= UI ================= */

  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* ================= NOTES ================= */
  const [notes, setNotes] = useState([]);
  const [labels, setLabels] = useState([]);
  const [tab, setTab] = useState("notes");
  const [activeLabel, setActiveLabel] = useState(null);
  const [editNote, setEditNote] = useState(null);
  const [search, setSearch] = useState("");

  /* ================= LOAD USER DATA ================= */
  useEffect(() => {
    if (!currentUser || !users[currentUser]) return;
    setNotes(users[currentUser].notes || []);
    setLabels(users[currentUser].labels || []);
  }, [currentUser]);

  /* ================= SAVE USER DATA ================= */
  useEffect(() => {
    if (!currentUser) return;
    const updatedUsers = {
      ...users,
      [currentUser]: {
        ...users[currentUser],
        notes,
        labels,
      },
    };
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  }, [notes, labels]);

  /* ================= FILTER ================= */
  const filteredNotes = notes.filter((n) => {
    if (tab === "notes" && (n.archived || n.deleted)) return false;
    if (tab === "reminder" && (!n.reminder || n.deleted || n.archived))
      return false;
    if (tab === "archive" && (!n.archived || n.deleted)) return false;
    if (tab === "bin" && !n.deleted) return false;
    if (tab === "label" && (n.label !== activeLabel || n.deleted)) return false;

    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (n.title && n.title.toLowerCase().includes(q)) ||
      (n.text && n.text.toLowerCase().includes(q))
    );
  });

  const handleProfileClick = () => {
    currentUser ? setShowProfile(true) : setShowAuth(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setNotes([]);
    setLabels([]);
  };

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      // 📱 Mobile: open <-> close
      setMobileSidebarOpen((prev) => !prev);
    } else {
      // 💻 Desktop: expand <-> collapse
      setSidebarOpen((prev) => !prev);
    }
  };

  return (
    <div className="bg-[#202124] min-h-screen text-white">
      {/* ================= NAVBAR (FULL WIDTH) ================= */}
     <Navbar
  toggleSidebar={() => setSidebarOpen((prev) => !prev)}
  search={search}
  setSearch={setSearch}
  onProfileClick={handleProfileClick}
  logout={handleLogout}
  currentUser={currentUser}
  user={user}
/>
      {/* ================= BODY ================= */}
      <div className="flex">
        {/* SIDEBAR (BELOW NAVBAR) */}
        <Sidebar
          tab={tab}
          setTab={setTab}
          labels={labels}
          setLabels={setLabels}
          setActiveLabel={setActiveLabel}
          sidebarOpen={sidebarOpen}
        />

        {/* MAIN CONTENT */}
        <main className="flex-1">
          {(tab === "notes" || tab === "label") && !search.trim() && (
            <NoteForm
              setNotes={setNotes}
              activeLabel={tab === "label" ? activeLabel : null}
            />
          )}

          <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {filteredNotes.length === 0 && search.trim() ? (
              <p className="text-gray-400 col-span-full text-center mt-20">
                No results found
              </p>
            ) : (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  tab={tab}
                  labels={labels}
                  setNotes={setNotes}
                  setEditNote={setEditNote}
                />
              ))
            )}
          </div>
        </main>
      </div>

      {/* ================= MODALS ================= */}
      {editNote && (
        <EditModal
          note={editNote}
          setEditNote={setEditNote}
          setNotes={setNotes}
        />
      )}

      {showAuth && (
        <AuthModal
          users={users}
          setUsers={setUsers}
          setCurrentUser={setCurrentUser}
          onClose={() => setShowAuth(false)}
        />
      )}

      {showProfile && user && (
        <ProfileModal
          user={user}
          users={users}
          setUsers={setUsers}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
};

export default App;
