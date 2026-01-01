const Navbar = ({ search, setSearch, toggleSidebar }) => {
  return (
    <header className="h-16 border-b border-gray-300 flex items-center px-6 bg-[#303134]">
      <div className="w-60 flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="text-2xl font-bold"
          title="Toggle sidebar"
        >
          ☰
        </button>

        <img
          src="../src/assets/keep_2020q4_48dp.png"
          alt="Keep"
          className="w-8 h-8"
        />

        <h1 className="text-xl font-semibold">Keep</h1>
      </div>

      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xl px-4 py-2 rounded bg-[#222] outline-none text-sm"
        />
      </div>

      <div className="w-60" />
    </header>
  );
};

export default Navbar;
