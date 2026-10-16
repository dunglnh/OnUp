/* Nạp supabase/functions/admin/index.ts trong Node: bỏ dòng import npm: (chỉ Deno hiểu), phần Deno.serve không chạy. */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
const SRC = path.join(path.dirname(fileURLToPath(import.meta.url)), "../../supabase/functions/admin/index.ts");
export async function loadEdgeFunction() {
  const code = fs.readFileSync(SRC, "utf8").replace(/^import \{ createClient \} from "npm:[^"]+";$/m, "const createClient: any = null;");
  if (!/const createClient: any = null;/.test(code)) throw new Error("load-edge: không thấy dòng import createClient trong " + SRC);
  const tmp = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "edge-")), "index.ts");
  fs.writeFileSync(tmp, code);
  return import(pathToFileURL(tmp).href);
}
