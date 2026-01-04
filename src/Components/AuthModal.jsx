import { useState } from "react";

const AuthModal = ({ users, setUsers, setCurrentUser, onClose }) => {
  const [mode, setMode] = useState("login"); // login | register

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const reset = () => {
    setFirstName("");
    setLastName("");
    setContact("");
    setEmail("");
    setPassword("");
    setConfirm("");
    setError("");
  };

  /* ================= REGISTER ================= */
  const handleRegister = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !contact ||
      !password ||
      !confirm
    ) {
      setError("All fields are required");
      return;
    }

    if (!/^\d{10}$/.test(contact)) {
      setError("Enter valid 10 digit contact number");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (users[email]) {
      setError("Account already exists");
      return;
    }

    const updatedUsers = {
      ...users,
      [email]: {
        firstName,
        lastName,
        email,
        contact,
        password,
        avatar: "",
        notes: [],
        labels: [],
      },
    };

    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 🔥 IMPORTANT CHANGE
    reset();
    setMode("login"); // 👈 registration ke baad login khulega
  };

  /* ================= LOGIN ================= */
  const handleLogin = () => {
    if (!email || !password) {
      setError("Email and password required");
      return;
    }

    if (!users[email] || users[email].password !== password) {
      setError("Invalid email or password");
      return;
    }

    // ✅ SUCCESS LOGIN
    localStorage.setItem("currentUser", email);
    setCurrentUser(email);
    reset();
    onClose(); // Keep open now
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-[#303134] w-[95%] max-w-md p-6 rounded-xl text-white relative">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        {error && (
          <p className="text-red-400 text-sm mb-3">{error}</p>
        )}

        {mode === "register" && (
          <>
            <div className="flex gap-3 mb-3">
              <input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-1/2 bg-[#525355] p-2 rounded outline-none"
              />
              <input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-1/2 bg-[#525355] p-2 rounded outline-none"
              />
            </div>

            <input
              placeholder="Contact Number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full bg-[#525355] p-2 rounded mb-3 outline-none"
            />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#525355] p-2 rounded mb-3 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-[#525355] p-2 rounded mb-3 outline-none"
        />

        {mode === "register" && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full bg-[#525355] p-2 rounded mb-4 outline-none"
          />
        )}

        <button
          onClick={mode === "login" ? handleLogin : handleRegister}
          className="w-full bg-blue-500 py-2 rounded font-medium"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-sm mt-4 text-center">
          {mode === "login" ? (
            <>
              New user?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
              >
                Create account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-400 cursor-pointer"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
