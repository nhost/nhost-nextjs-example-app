import nhost from "nhost-js-sdk";
import { backend_endpoint } from "lib/config";

// Auth work client side ONLY

const isBrowser = typeof window !== "undefined";
const client_storage = isBrowser ? localStorage : {};

const config = {
  base_url: backend_endpoint,
  client_storage,
  client_storage_type: "web",
};

nhost.initializeApp(config);
const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };
