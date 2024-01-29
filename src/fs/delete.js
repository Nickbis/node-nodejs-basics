import { rm } from "node:fs/promises";
import { join } from "node:path";
import getDirname from "../utils/getDirname.js";

const remove = async () => {
    const currentDirectory = getDirname(import.meta.url);
    const fileName = "fileToRemove.txt";
    const pathToFile = "/files";

    try {
        await rm(join(currentDirectory, pathToFile, fileName));
        console.log("The task is completed");
    } catch (err) {
        if (err.code === "ENOENT") {
            throw new Error("FS operation failed");
        }
        throw err;
    }
};

await remove();