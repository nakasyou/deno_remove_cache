/**
 * Verify the existence of the directory
 * @param path - path to be checked
 * @returns Result boolean
 */
export async function isDir(path: string): Promise<boolean>{
  try{
    const { isDirectory } = await Deno.stat(path);
    return isDirectory;
  }catch{
    return false;
  }
}

export interface NpmparseReturn {
  reponame: string;
  version: string;
}

/**
 * Parses the npm url for Deno.
 * @param repo - Deno's npm URL without `npm:`.
 * @example
 * Parse @actions/core
 * ```ts
 * npmparse("@actions/core")
 * // { reponame: "@actions/core", version: "" }
 * npmparse("@actions/core@1.10.0")
 * // { reponame: "@actions/core", version: "1.10.0"}
 * ```
 */
export function npmparse(repo: string): NpmparseReturn{
  let version = "";
  let reponame = "";
  if(repo.slice(1).includes("@")){
    // have version
    version = repo.slice(1).split("@").at(-1);
    reponame = repo.split("@").slice(0,-1).join("@");
  }else{
    // don't have version
    reponame = repo;
  }
  return {
    reponame,
    version
  };
}