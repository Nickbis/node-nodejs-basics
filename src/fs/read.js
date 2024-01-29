import { readFile } from "node:fs/promises";
import { join } from "node:path";
import getDirname from "../utils/getDirname.js";

const read = async () => {
    const pathToFile = "./files/fileToRead.txt";
    const fullPathToFile = join(getDirname(import.meta.url), pathToFile);

    try {
       const fileData = await readFile(fullPathToFile, { encoding: "utf8" });
       console.log(fileData);
    } catch (err) {
        if (err.code === "ENOENT") {
        throw new Error("FS operation failed");
        }
        throw err;
    }
};

await read();