import { useState } from "react";

const Sidebar = ({
  tab,
  setTab,
  labels,
  setLabels,
  setActiveLabel,
  sidebarOpen,
}) => {
  const [newLabel, setNewLabel] = useState("");

  const addLabel = () => {
    if (!newLabel.trim()) return;
    setLabels([...labels, newLabel]);
    setNewLabel("");
  };

  return (
    <aside
      className={`bg-[#303134] h-[calc(100vh-4rem)]
      transition-all duration-300
      ${sidebarOpen ? "w-60" : "w-20"}`}
    >
      <Item
        icon="📝"
        text="Notes"
        active={tab === "notes"}
        sidebarOpen={sidebarOpen}
        onClick={() => {
          setTab("notes");
          setActiveLabel(null);
        }}
      />

      <Item
        icon="⏰"
        text="Reminders"
        active={tab === "reminder"}
        sidebarOpen={sidebarOpen}
        onClick={() => setTab("reminder")}
      />

      {labels.map((label) => (
        <Item
          key={label}
          icon="🏷"
          text={label}
          sidebarOpen={sidebarOpen}
          onClick={() => {
            setTab("label");
            setActiveLabel(label);
          }}
        />
      ))}

      {/* ADD LABEL — sirf jab sidebar open ho */}
      {sidebarOpen && (
        <div className="px-4 mt-2">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="New label"
            className="w-full bg-[#525355] px-2 py-1 rounded text-sm"
          />
          <button
            onClick={addLabel}
            className="text-blue-400 text-sm mt-1"
          >
            Add
          </button>
        </div>
      )}

      <Item
        icon="🗄"
        text="Archive"
        active={tab === "archive"}
        sidebarOpen={sidebarOpen}
        onClick={() => setTab("archive")}
      />

      <Item
        icon="🗑"
        text="Bin"
        active={tab === "bin"}
        sidebarOpen={sidebarOpen}
        onClick={() => setTab("bin")}
      />
    </aside>
  );
};

const Item = ({ icon, text, sidebarOpen, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-r-full
    hover:bg-[#3c4043] transition
    ${active ? "bg-[#3c4043]" : ""}`}
  >
    <span className="text-xl">{icon}</span>

    {/* 👇 ONLY TEXT HIDE */}
    {sidebarOpen && (
      <span className="text-sm font-medium">
        {text}
      </span>
    )}
  </button>
);

export default Sidebar;
