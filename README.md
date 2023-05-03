# deno_remove_cache
Denoでキャッシュディレクトリを削除する
## How to use it?
すぐ実行する場合: 
```shell
deno run --allow-read --allow-run --allow-write https://deno.land/x/remove_cache/cli.ts <delete url>
```
インストールして実行する場合: 
```shell
# 初回インストール/アップデート時
deno install --allow-read --allow-run --allow-write --force --name remove_cache https://deno.land/x/remove_cache/cli.ts
# 実行
remove_cache <delete_url>
```
### Option: delete url
削除するURLを指定
- 全てを削除する場合: `remove_cache all:`
- httpsを使ったものを削除する場合: `remove_cache https:`
- deno.land配下を使ったものを削除する場合: `remove_cache https://deno.land`
- [Hono](https://hono.dev)(npm)を削除する場合: `remove_cache npm:hono`
- Hono(npm)(version 3.1.8)を削除する場合: `remove_cache npm:hono@3.1.8`
