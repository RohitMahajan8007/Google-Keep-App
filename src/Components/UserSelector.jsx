import { useState } from "react";

const UserSelector = ({ users, setUsers, setCurrentUser }) => {
  const [name, setName] = useState("");

  const createUser = () => {
    if (!name.trim() || users[name]) return;

    const updatedUsers = {
      ...users,
      [name]: { notes: [], labels: [] },
    };

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", name);
    setCurrentUser(name);
    setName("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#202124] text-white">
      <h1 className="text-2xl mb-6">Select Profile</h1>

      <div className="flex gap-3 mb-6 flex-wrap justify-center">
        {Object.keys(users).map((u) => (
          <button
            key={u}
            onClick={() => {
              setCurrentUser(u);
              localStorage.setItem("currentUser", u);
            }}
            className="px-4 py-2 bg-[#303134] rounded"
          >
            {u}
          </button>
        ))}
      </div>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New user name"
        className="bg-[#303134] px-4 py-2 rounded outline-none mb-3"
      />
      <button onClick={createUser} className="text-blue-400">
        Create User
      </button>
    </div>
  );
};

export default UserSelector;
