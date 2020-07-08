import React, { useState } from "react";
import styled from "styled-components";
import Router from "next/router";
import Link from "next/link";
import { auth } from "../lib/nhost";

const RegisterContainer = styled.div``;

export default function Register(props) {
  const [email, setEmail] = useState("elitasson@gmail.com");
  const [password, setPassword] = useState("hejsan");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.register(email, password);
      Router.push("/dashboard");
    } catch (error) {
      console.log({ error });
    }
  };
  return (
    <RegisterContainer>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Register</button>
      </form>
      <div>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </div>
      <div>
        <Link href="/">
          <a>Index</a>
        </Link>
      </div>
    </RegisterContainer>
  );
}
