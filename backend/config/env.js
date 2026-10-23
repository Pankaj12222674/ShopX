import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const backendDirectory = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(backendDirectory, "..", ".env") });
