import { join, parse } from "node:path";
import { rename as renameFile, access } from "node:fs/promises";
import getDirname from "../utils/getDirname.js";

const isFileExist = async (pathToFile) => {
    try {
      await access(pathToFile);
      return true;
    } catch {
      return false;
    }
  }
  
const createError = (errorObj = {}) => {
  const { text = "FS operation failed" } = errorObj;
  let innerErr = new Error(text);
  Reflect.ownKeys(errorObj).forEach((key) =>{
    innerErr[key] = errorObj[key];
  })
  return innerErr;
}

const rename = async () => {
    const currentDirname = getDirname(import.meta.url);
    const fileNameToRename = "wrongFilename.txt";
    const directoryPath = "/files";
    const pathToOriginalFile = join(
      currentDirname,
      directoryPath,
      fileNameToRename
    );
    const fileName = parse(fileNameToRename)?.name;
    const fileExtension = ".md";
    const pathToRenameFile = join(
      currentDirname,
      directoryPath,
      fileName + fileExtension
    );
  
    try {
      if (await isFileExist(pathToRenameFile)) {
        throw createError({code: "EEXIST", path: pathToRenameFile});
      } else {
        await renameFile(pathToOriginalFile, pathToRenameFile);
        console.log("The task is completed");
      }
    } catch(err) {
      if ((err.code === "ENOENT") || err.code === "EEXIST") {
        throw new Error("FS operation failed");
      }
      throw err;
    }
  };

await rename();