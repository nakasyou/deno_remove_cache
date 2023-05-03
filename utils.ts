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