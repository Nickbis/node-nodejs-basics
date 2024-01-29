import { readdir } from "node:fs/promises";
import { join } from "node:path";
import getDirname from "../utils/getDirname.js";

const list = async () => {
    const currentDirectory = getDirname(import.meta.url);
    const pathToDir = join(currentDirectory, "/files");
  
    try {
      const files = await readdir(pathToDir);
      console.log(files);
    } catch (err) {
      if (err.code === "ENOENT") {
        throw new Error("FS operation failed");
      }
      throw err;
    }
};

await list();