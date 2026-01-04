import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [userDataLogin, setUserDataLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDataLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ Important: send cookies
        body: JSON.stringify(userDataLogin),
      });

      const data = await res.json();
      console.log("✅ Response data:", data);

      if (!res.ok) {
        throw new Error(data?.message || "Login failed");
      }

      // ✅ Save JWT in cookie
      Cookies.set("token", data.token, { expires: 1 });
      Cookies.set("role", data.role, { expires: 1 });


      // ✅ Redirect based on role
      if (data.role === "admin") {
        console.log(data.role)
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }

      setMsg("✅ Login successful!");
    } catch (err) {
      console.error("❌ Login error:", err);
      setErr(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg p-8 rounded-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Login
        </h2>

        {err && <p className="text-red-500 text-sm mb-4">{err}</p>}
        {msg && <p className="text-green-500 text-sm mb-4">{msg}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border w-full p-2 mb-4 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border w-full p-2 mb-6 rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
