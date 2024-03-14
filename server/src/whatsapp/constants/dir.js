import path from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const sessionsFolderPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    ".wwebjs_auth"
  );

