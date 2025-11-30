import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const signup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) setMsg(error.message);
    else setMsg("Account created! Check your email.");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Signup</h1>
      <input className="border p-2 w-full mb-2" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Password" type="password"
        onChange={(e) => setPassword(e.target.value)} />

      <button onClick={signup} className="bg-green-600 text-white px-4 py-2">Create Account</button>
      <p>{msg}</p>
    </div>
  );
}
