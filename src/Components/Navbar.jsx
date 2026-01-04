const Navbar = ({
  toggleSidebar,
  search,
  setSearch,
  onProfileClick,
  logout,
  currentUser,
  user,
}) => {
  return (
    <header className="h-16 w-full bg-[#303134] flex items-center px-4 md:px-6 gap-3">
      {/* ☰ */}
      <button
        onClick={toggleSidebar}
        className="text-xl p-2 rounded-full hover:bg-[#3c4043]"
      >
        ☰
      </button>

      {/* LOGO */}
      <div className="hidden sm:flex items-center gap-2">
        <img src="../src/assets/keep_2020q4_48dp.png" className="w-8 h-8" />
        <span className="text-lg font-semibold">Google Keep</span>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 md:ml-10 bg-[#525355] w-[30%] px-4 py-2 rounded outline-none"
      />

      {/* PROFILE */}
      <div className="flex items-center gap-3">
        <button onClick={onProfileClick}>
          {user?.avatar ? (
            <img
              src={user.avatar}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gray-600 flex items-center justify-center">
              👤
            </div>
          )}
        </button>

        {currentUser && (
          <button
            onClick={logout}
            className="hidden md:block text-red-400 text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
