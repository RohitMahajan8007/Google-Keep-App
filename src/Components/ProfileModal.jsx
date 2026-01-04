import { useState } from "react";

const ProfileModal = ({ user, users, setUsers, onClose }) => {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar || "");

  const saveProfile = () => {
    const updatedUsers = {
      ...users,
      [user.email]: {
        ...user,
        name,
        avatar,
      },
    };

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    onClose();
  };

  const uploadAvatar = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-[#303134] p-6 rounded-xl w-80 text-white">
        <h2 className="text-xl mb-4">Profile</h2>

        <div className="flex flex-col items-center gap-3 mb-4">
          <img
            src={avatar || "https://via.placeholder.com/100"}
            className="w-24 h-24 rounded-full object-cover"
          />
          <label className="text-blue-400 cursor-pointer text-sm">
            Change photo
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => uploadAvatar(e.target.files[0])}
            />
          </label>
        </div>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#525355] p-2 rounded mb-3 outline-none"
        />

        <input
          value={user.email}
          disabled
          className="w-full bg-[#525355] p-2 rounded mb-4 opacity-70"
        />

        <button
          onClick={saveProfile}
          className="w-full bg-blue-500 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;
