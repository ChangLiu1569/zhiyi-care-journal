import type {MetadataRoute} from 'next';
export const dynamic='force-static';
export default function manifest():MetadataRoute.Manifest{const base=process.env.NEXT_PUBLIC_BASE_PATH||'';return {id:base+'/',name:'知忆 · 认知观察',short_name:'知忆',description:'家属日常观察与医生沟通记录',lang:'zh-CN',start_url:base+'/',scope:base+'/',display:'standalone',background_color:'#f6f8fb',theme_color:'#326bbb',icons:[{src:base+'/icons/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:base+'/icons/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'}]};}
