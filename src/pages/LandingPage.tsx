import { useState } from "react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export default function LandingPage() {
  const [openModal, setOpenModal] = useState<"signin" | "signup" | null>(null);

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* ✅ SignIn & SignUp Modal Rendering */}
      {openModal === "signin" && <SignIn  />}
      {openModal === "signup" && <SignUp closeModal={() => setOpenModal(null)} />}

      {/* 🔥 Buttons to Open Modals */}
      <div className="fixed bottom-10 right-10 flex gap-4">
        <button onClick={() => setOpenModal("signin")} className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Open Sign In
        </button>
        <button onClick={() => setOpenModal("signup")} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Open Sign Up
        </button>
      </div>
    </div>
  );
}
