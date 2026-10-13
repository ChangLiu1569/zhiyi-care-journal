'use client';
import {useEffect} from 'react';
import {usePathname,useRouter} from 'next/navigation';
import {Capacitor,type PluginListenerHandle} from '@capacitor/core';
import {App} from '@capacitor/app';
export default function MobileRuntime(){const router=useRouter();const path=usePathname();useEffect(()=>{if(Capacitor.getPlatform()!=='android')return;let disposed=false;let listener:PluginListenerHandle|undefined;App.addListener('backButton',({canGoBack})=>{if(document.querySelector('[role=dialog]'))return;if(canGoBack)window.history.back();else if(path!=='/')router.replace('/');else void App.exitApp();}).then(handle=>{if(disposed)void handle.remove();else listener=handle;});return()=>{disposed=true;void listener?.remove();};},[path,router]);return null;}
