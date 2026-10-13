import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('out');const base=process.env.PREVIEW_BASE_PATH||'';
const types={'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.ttf':'font/ttf','.json':'application/json','.txt':'text/plain','.png':'image/png','.svg':'image/svg+xml'};
createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');if(base&&!url.pathname.startsWith(base+'/')){res.writeHead(404).end();return;}let path=resolve(root,'.'+decodeURIComponent(url.pathname.slice(base.length)));if(path!==root&&!path.startsWith(root+sep)){res.writeHead(403).end();return;}if((await stat(path)).isDirectory())path=resolve(path,'index.html');const body=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream','Cache-Control':'no-store'}).end(body);}catch{res.writeHead(404).end('Not found');}}).listen(Number(process.env.PREVIEW_PORT||3200),'127.0.0.1',()=>console.log('手机 App 打包资源预览：http://localhost:3100'));
