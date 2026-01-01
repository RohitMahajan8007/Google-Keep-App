import {
  StickyNote,
  Bell,
  Pencil,
  Archive,
  Trash,
  Tag,
} from "lucide-react";

const Sidebar = ({
  page,
  setPage,
  labels,
  setActiveLabel,
}) => {
  const item = (key) =>
    page === key ? "bg-yellow-600 text-black" : "hover:bg-gray-700";

  return (
    <aside className="w-60 p-3 space-y-1">
      <div onClick={() => { setPage("notes"); setActiveLabel(null); }}
        className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${item("notes")}`}>
        <StickyNote size={18} /> Notes
      </div>

      <div onClick={() => setPage("reminders")}
        className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${item("reminders")}`}>
        <Bell size={18} /> Reminders
      </div>

      <div onClick={() => setPage("edit")}
        className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${item("edit")}`}>
        <Pencil size={18} /> Edit Labels
      </div>

      <div onClick={() => setPage("archive")}
        className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${item("archive")}`}>
        <Archive size={18} /> Archive
      </div>

      <div onClick={() => setPage("bin")}
        className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${item("bin")}`}>
        <Trash size={18} /> Bin
      </div>


      {labels?.length > 0 && (
        <>
          <p className="text-xs mt-4 mb-1 text-gray-400 px-4">
            Labels
          </p>

          {labels.map((label) => (
            <div
              key={label}
              onClick={() => {
                setActiveLabel(label);
                setPage("notes");
              }}
              className="flex items-center gap-3 px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
            >
              <Tag size={16} /> {label}
            </div>
          ))}
        </>
      )}
    </aside>
  );
};

export default Sidebar;
