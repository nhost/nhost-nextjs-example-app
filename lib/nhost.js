import nhost from "nhost-js-sdk";
import { backend_endpoint } from "./config";

const config = {
  base_url: backend_endpoint,
};

nhost.initializeApp(config);

const auth = nhost.auth();
const storage = nhost.storage();

export { auth, storage };
