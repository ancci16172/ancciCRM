import { _dirname } from "../../lib/dirname.js";
import fs from "fs";
import { mediaDirPath } from "../constants/dir.js";

export const getAvailableMediaFromRepo = () => {
  const dirContent = fs.readdirSync(mediaDirPath);
  return dirContent;
};
