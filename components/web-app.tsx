'use client';
import {useEffect} from 'react';
import {Capacitor} from '@capacitor/core';
export default function WebApp(){useEffect(()=>{if(Capacitor.isNativePlatform()||!('serviceWorker' in navigator)||!window.isSecureContext||process.env.NODE_ENV!=='production')return;const base=process.env.NEXT_PUBLIC_BASE_PATH||'';navigator.serviceWorker.register(base+'/sw.js',{scope:base+'/'}).catch(()=>{/* 网络受限时继续使用在线页面。 */});},[]);return null;}
