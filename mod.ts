import {
  getDenoDir,
  path,
} from "./deps.ts";
import {
  isDir,
  npmparse,
  type NpmparseReturn,
} from "./utils.ts";

/**
 * Function to delete Cache in Deno.
 * @param removePath - Path to be deleted
 */
async function removeCache(removePath: string): Promise<void>{
  const denodir = (await getDenoDir()).replace("DENO_DIR location","").split(" ").slice(1).join("");
  const url = new URL(removePath);
  let removeFilePath: string;
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
}

export {
  isDir,
  npmparse,
  type NpmparseReturn,
  removeCache,
}
