import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setMsg(error.message);
    else setMsg("Login successful!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Login</h1>
      <input className="border p-2 w-full mb-2" placeholder="Email"
        onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Password" type="password"
        onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login} className="bg-blue-600 text-white px-4 py-2">Login</button>
      <p>{msg}</p>
    </div>
  );
}
