import { copyFile, constants, readdir, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, dirname } from "node:path";

const copy = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const src = join(__dirname, "/files");
    const dist = join(__dirname, "/files_copy");

    try {
        const files = await readdir(src);
        await mkdir(dist);
        for (const file of files) {
            await copyFile(
            join(src, file),
            join(dist, file),
            constants.COPYFILE_EXCL
            );
        }
        console.log("The task is completed");
    } catch (err) {
        if (err.code === "EEXIST") {
        throw new Error("FS operation failed");
        }
        throw err;
    }
};

await copy();
