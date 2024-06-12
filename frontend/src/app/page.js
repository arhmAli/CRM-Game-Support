"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  
  const router = useRouter();

  const handleChange = (e, setter) => {
    setter(e.target.value);
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/verify", {
        username: username,
        password: password
      });
      setResponse(res.data.message);
      console.log("Response", res);
      if (res.data.message === "verified admin") {
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
    }
    setPassword("");
    setUsername("");
  }

  return (
    <>
<form className="mx-auto max-w-md mt-40">
  <label className="block mb-2">Enter username:</label>
  <input 
    type="text"
    onChange={(e) => handleChange(e, setUsername)} 
    value={username}
    placeholder='Enter username'
    className="w-full border rounded-md px-3 py-2 mb-4"
  />
  <label className="block mb-2">Enter Password:</label>
  <input
    type="password"
    onChange={(e) => handleChange(e, setPassword)}
    value={password}
    placeholder='Enter password'
    className="w-full border rounded-md px-3 py-2 mb-4"
  />
  <div className="flex justify-end mb-4">
    <div className="flex items-center">
      <input
        type="checkbox"
        id="isAdmin"
        className="form-checkbox h-5 w-5 text-blue-600"
      />
      <label className="ml-2">Admin</label>
    </div>
  </div>
  <button 
    onClick={(e) => handleClick(e)}
    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
  >
    Login
  </button>
</form>

    </>
  );
}
