import { useAuth } from "react-nhost";
import { Login } from "components/login";

export function ProtectRoute(Component) {
  return () => {
    const { signedIn } = useAuth();

    if (signedIn === null) {
      return <div>Checking auth...</div>;
    }

    if (!signedIn) {
      return <Login />;
    }

    return <Component {...arguments} />;
  };
}
