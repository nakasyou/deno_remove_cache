import {
  getDenoDir,
  path,
} from "./deps.ts";
import {
  isdir,
  npmparse,
  type NpmparseReturn,
} from "./utils.ts";


const removePath = Deno.args[0];
const denodir = (await getDenoDir()).replace("DENO_DIR location","").split(" ").slice(1).join("");
const url = new URL(removePath);
let removeFilePath;
if(["https:","http:"].includes(url.protocol)){
  removeFilePath = path.join(denodir,"deps",url.protocol.slice(0,-1),url.host);
}else if(url.protocol=== "npm:"){
  const { reponame,  version } = npmparse(url.pathname);
  removeFilePath = path.join(denodir,"npm/registry.npmjs.org",reponame,version);
}else if(url.protocol === "all:"){
  removeFilePath = denodir;
}
if(await isDir(removeFilePath)){
  await Deno.remove(removeFilePath, { recursive: true });
}
