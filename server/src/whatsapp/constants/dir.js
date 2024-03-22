import { join } from "path";
import { _dirname, proyectDirPath } from "../../lib/dirname.js";

export const sessionsFolderPath = join(
  _dirname(import.meta.url),
  "..",
  "..",
  "..",
  ".wwebjs_auth"
);

export const mediaDirPath = join(proyectDirPath,"..","media")
