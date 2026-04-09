import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      // store token
      localStorage.setItem("token", res.data.token);

      alert("Login successful 🎉");

      // redirect to dashboard
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
      
      <main className="flex-grow flex flex-col md:flex-row">

        {/* LEFT SIDE SAME AS SIGNUP */}
        <section className="hidden md:flex md:w-1/2 bg-surface-container-low relative overflow-hidden items-center justify-center p-12">
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJOSptC5hM9A2UGJN0MZ5Fxr3UyC0y51amUhZCdh6B6vmk4NrceCZgk8pAl_36AdEEQvjUl6Zsfa-XQU93Obq701GPkxzIjnqR-5QHwzJMdW3hrGvBjyS3f_uHQkoGaZsKa-JXyRJkCznALNGQm6z0LwA6PT4YT2MfRdl9hsbgjGk9bThF_y76Rf2YjOr3fzlLlzhRNr9V0ai4Rn6PD4xxkpQJQ70dl1AqI7CpfxiRcJg7vqmw12fzFf1-NXaQgGeQVgh2gbHgGsf1"
              className="w-full h-full object-cover opacity-90 mix-blend-multiply grayscale-[20%] brightness-110"
            />
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
          </div>

          <div className="relative z-10 max-w-lg space-y-8">
            <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm tracking-widest uppercase">
              Welcome Back
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-tight">
              Continue Your <br />
              <span className="text-tertiary-fixed italic">Journey.</span>
            </h1>

            <p className="text-xl text-white/90 max-w-md">
              Access your curated dashboard and listings.
            </p>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-24 bg-surface-bright">
          
          <div className="w-full max-w-md space-y-10">

            {/* HEADER */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-primary text-4xl">
                  school
                </span>
                <span className="text-2xl font-bold text-primary">
                  The Academic Curator
                </span>
              </div>

              <h2 className="text-4xl font-extrabold">
                Welcome Back
              </h2>

              <p className="text-gray-500">
                Login to your account.
              </p>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* FORM */}
            <form className="space-y-6" onSubmit={handleSubmit}>

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-gray-100"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl bg-gray-100"
                required
              />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-bold"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="text-center text-sm">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="text-indigo-600 font-bold cursor-pointer"
                >
                  Sign Up
                </span>
              </p>

            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-500">
        © 2024 The Academic Curator
      </footer>
    </div>
  );
}