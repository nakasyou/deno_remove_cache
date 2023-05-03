await (async(removePath)=>{
async function isDir(path: string): Promise<boolean> {
  try {
    const { isDirectory } = await Deno.stat(path);
    return isDirectory;
  } catch {
    return false;
  }
}

function npmparse(repo){
  let version = "";
  let reponame;
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
const denodir = (await getDenoDir()).replace("DENO_DIR location","").split(" ").slice(1).join("");
const url = new URL(removePath);
let removeFilePath;
if(["https:","http:"].includes(url.protocol)){
  removeFilePath = path.join(denodir,"deps",url.protocol.slice(0,-1),url.host);
}else if(url.protocol === "npm:"){
  const { reponame,  version } = npmparse(url.pathname);
  removeFilePath = path.join(denodir,"deps","npm/registry.npmjs.org",reponame,version);
}
if(isDir(removeFilePath)){
  await Deno.remove(removeFilePath, { recursive: true });
}
})("npm:express")
