import { open } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";


const create = async () => {
    let handler;
    const dataTask = "I am fresh and young";
    const fileName = "fresh.txt";
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const pathFolder = `files`;
    const fullPath = join(__dirname, pathFolder, fileName);
  
    try {
      handler = await open(fullPath, "wx");
      await handler.appendFile(dataTask);
      console.log("The task is completed");
    } catch (err) {
      if (err.code === "EEXIST") {
        throw new Error("FS operation failed");
      }
      throw err;
    } 
};

await create();