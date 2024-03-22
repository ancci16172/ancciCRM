import { fileURLToPath } from "url";
import  { dirname ,join} from "path";

export function _dirname(metaUrl) {
  return dirname(fileURLToPath(metaUrl))
}

export const proyectDirPath = join(_dirname(import.meta.url),"..","..","..")
