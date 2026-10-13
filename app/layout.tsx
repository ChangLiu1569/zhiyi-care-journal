import './globals.css';
import MobileRuntime from '@/components/mobile-runtime';
import WebApp from '@/components/web-app';
import type {Metadata,Viewport} from 'next';
export const metadata:Metadata={title:'知忆 · 认知观察',description:'家属日常认知与康复观察，本地私密记录',manifest:(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/manifest.webmanifest',appleWebApp:{capable:true,title:'知忆',statusBarStyle:'default'},icons:{apple:(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/icons/icon-180.png'}};
export const viewport:Viewport={width:'device-width',initialScale:1,viewportFit:'cover'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body><MobileRuntime/><WebApp/>{children}</body></html>;}
