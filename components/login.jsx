import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { auth } from "../lib/nhost";
import Router from "next/router";

const LoginContainer = styled.div``;

export function Login(props) {
  const [email, setEmail] = useState("elitasson@gmail.com");
  const [password, setPassword] = useState("hejsan");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.login(email, password);
      Router.push("/dashboard");
    } catch (error) {
      alert(`error logging in`);
      console.error({ error });
      return;
    }
  };

  return (
    <LoginContainer>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>

      <div>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </div>
      <div>
        <Link href="/">
          <a>Index</a>
        </Link>
      </div>
    </LoginContainer>
  );
}
