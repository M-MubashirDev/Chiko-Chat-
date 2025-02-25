import { useState } from "react";
import { signupUser } from "../services/Service";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const naviegate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await signupUser({ username, password, email });
      alert("Signup Successful!");
      naviegate("home");
      localStorage.setItem("auth", JSON.stringify(data));
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col mt-32 items-center p-4">
      <h2 className="text-xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="flex flex-col gap-3 w-64">
        <input
          type="text"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
