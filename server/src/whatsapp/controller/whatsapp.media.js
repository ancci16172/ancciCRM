import { _dirname } from "../../lib/dirname.js";
import { mediaDirPath } from "../constants/dir.js";
import { getAvailableMediaFromRepo } from "../model/media.model.js";
import fs from "fs";
import { join } from "path";

export const getAvailableMedia = (req, res) => {
  try {
    const availableMedia = getAvailableMediaFromRepo();

    res.status(200).json({ availableMedia });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Hubo un error consultando los archivos disponibles." });
  }
};



export const addNewMedia = (req, res) => {
  const types = { image: ".jpg", video: ".mp4" };
  const typeOfFile = req.file.mimetype.match(/.+\//g)[0].replaceAll("/", "");
  if (!types[typeOfFile])
    return res
      .status(400)
      .json({ msg: "Solo se aceptan datos de tipo video y tipo imagen" });

  console.log("my media",req.file);

  const fileName = req.file.originalname.match(/(.+?)(?=\.[^.]+$|$)/g)[0];

  console.log("filename to submit", fileName);
  const dirToSaveFile = join(mediaDirPath, fileName + types[typeOfFile]);
  console.log({dirToSaveFile});
  fs.writeFileSync(dirToSaveFile, req.file.buffer);

  res.status(200).json({ msg: "Nuevo archivo almacenado correctamente" });
};







export const deleteMedia = (req, res) => {
  try {
    const fileName = req.params.mediaName;
    const fileUrl = join(mediaDirPath, fileName);
    console.log("file about to delete", fileUrl);
    fs.rmSync(fileUrl)

    res.status(200).json({ msg: "Multimedia eliminado correctamente." });
  } catch (error) {
    console.log("ERROR ON DELETE FILE",error);
  
    if(error.errno == -4058)
      return res.status(404).json({msg : "No se encontro el archivo que se intenta eliminar."})

    res.status(500).json({ msg: "No se pudo eliminar el archivo." });
  }
};
