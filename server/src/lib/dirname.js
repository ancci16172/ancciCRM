import { fileURLToPath } from "url";
import  { dirname } from "path";

export function getDirName(metaUrl) {
  const __filename = fileURLToPath(metaUrl);
  const __dirname = dirname(__filename);
  return __dirname;
}
