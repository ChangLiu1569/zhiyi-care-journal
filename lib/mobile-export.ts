import {Capacitor} from '@capacitor/core';
import {Filesystem,Directory} from '@capacitor/filesystem';
import {Share} from '@capacitor/share';
export async function exportFile(content:BlobPart,name:string,type:string){
 const blob=new Blob([content],{type});
 if(Capacitor.isNativePlatform()){
  const data=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onerror=()=>reject(new Error('文件转换失败'));reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.readAsDataURL(blob);});
  const path='exports/'+name.replace(/[\\/]/g,'_');
  const file=await Filesystem.writeFile({path,data,directory:Directory.Cache,recursive:true});
  await Share.share({title:name,files:[file.uri],dialogTitle:'保存报告或备份到文件'});
  return;
 }
 const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
