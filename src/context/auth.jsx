import React, { useState, useEffect, createContext, useContext } from "react";
// import Router, { useRouter } from "next/router";
import { auth } from "lib/nhost";
import { Login } from "components/login";

export const AuthContext = createContext();

// export default function AuthProvider({ children }) {
export default class AuthProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: null,
    };

    console.log("setting onAuthStateChanged function");
    auth.onAuthStateChanged((data) => {
      console.log("inside onAuthStateChanged");
      this.setState({ signedIn: data });
      // setSignedIn(data);
    });
  }

  render() {
    return (
      <AuthContext.Provider value={{ signedIn: this.state.signedIn }}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export function ProtectRoute(Component) {
  return () => {
    const { signedIn } = useAuth();

    // use redirects instead
    // const router = useRouter();
    // useEffect(() => {
    //   if (signedIn === false) Router.push("/login");
    // }, [signedIn]);

    if (signedIn === null) {
      return <div>Checking auth...</div>;
    }

    if (!signedIn) {
      return <Login />;
    }

    return <Component {...arguments} />;
  };
}
