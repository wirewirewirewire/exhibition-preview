import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Login() {
  const [data, setData] = useState({ hits: [] });

  useEffect(async () => {
    const result = await axios.post("http://localhost:1337/auth/local", {
      identifier: "partizipation@partizipation.de",
      password: "Borelly1891",
    });

    //setData(result.data);
    localStorage.setItem("access-token", result.data.jwt);
    console.log(result.data);
    return () => {};
  }, []);

  return (
    <div>Login {JSON.stringify(localStorage.getItem("access-token"))}</div>
  );
}
