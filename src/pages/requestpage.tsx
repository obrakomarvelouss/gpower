import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function RequestPage() {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [details, setDetails] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    const { error } = await supabase.from("customer_requests").insert([
      { name, service, details }
    ]);

    if (error) setMsg(error.message);
    else setMsg("Request submitted!");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Customer Request</h1>

      <input className="border p-2 w-full mb-2" placeholder="Your Name"
        onChange={(e) => setName(e.target.value)} />

      <input className="border p-2 w-full mb-2" placeholder="Service Needed"
        onChange={(e) => setService(e.target.value)} />

      <textarea className="border p-2 w-full mb-2" placeholder="Details"
        onChange={(e) => setDetails(e.target.value)} />

      <button onClick={submit} className="bg-purple-600 text-white px-4 py-2">
        Submit Request
      </button>

      <p>{msg}</p>
    </div>
  );
}
