import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  closeModal?: () => void;
}


export function SignUp({ closeModal }: SignUpProps) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);



  const handleClose = () => {
    navigate("/"); // Redirect to home page
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await axios.post("http://localhost:3000/user/signup", formData);
      setSuccess("Signup successful! You can now sign in.");

      // Close modal after showing success message
      setTimeout(() => {
        closeModal?.();
      }, 1500); // Delay for 1.5 seconds
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-fade-in">
        {/* Close Button */}
        <button
          onClick={handleClose} // This closes the modal when clicked
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h1 className="text-3xl font-bold text-green-700 text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          Join Chai-Chai to enjoy your tea journey ☕️
        </p>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
              Username / Email
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="e.g. chai.lover@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the <a href="/terms" className="text-blue-500 hover:underline">Terms and Conditions</a> and <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
 
        <p className="text-center text-sm mt-5">
          Already have an account?{" "} 
          <a href="/signin" className="text-green-600 font-medium hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
