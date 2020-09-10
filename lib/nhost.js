import nhost from "nhost-js-sdk";
import { backend_endpoint } from "lib/config";

// Auth work client side ONLY

const config = {
  base_url: backend_endpoint,
  ssr: typeof window === "undefined",
};

nhost.initializeApp(config);
const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };
