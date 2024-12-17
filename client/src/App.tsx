import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/create", {
        name,
        email,
      });
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to publish event.");
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Create User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
