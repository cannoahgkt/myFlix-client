import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Submits login data to the server
    fetch("YOUR_API_URL/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ Username: username, Password: password })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          // Calls onLoggedIn callback with user and token
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
