import {describe,it,expect,vi,beforeEach} from 'vitest';
const mocks=vi.hoisted(()=>({native:vi.fn(),write:vi.fn(),share:vi.fn()}));
vi.mock('@capacitor/core',()=>({Capacitor:{isNativePlatform:mocks.native}}));
vi.mock('@capacitor/filesystem',()=>({Directory:{Cache:'CACHE'},Filesystem:{writeFile:mocks.write}}));
vi.mock('@capacitor/share',()=>({Share:{share:mocks.share}}));
import {exportFile} from '../lib/mobile-export';
beforeEach(()=>{vi.resetAllMocks();mocks.native.mockReturnValue(true);mocks.write.mockResolvedValue({uri:'file:///cache/export.json'});vi.stubGlobal('FileReader',class{result='';onload?:()=>void;readAsDataURL(){this.result='data:application/json;base64,eyJ0ZXN0IjoxfQ==';this.onload?.();}});});
describe('手机文件导出',()=>{it('在App缓存生成文件并交给原生分享面板',async()=>{await exportFile('{"test":1}','备份.json','application/json');expect(mocks.write).toHaveBeenCalledWith({path:'exports/备份.json',data:'eyJ0ZXN0IjoxfQ==',directory:'CACHE',recursive:true});expect(mocks.share).toHaveBeenCalledWith(expect.objectContaining({files:['file:///cache/export.json']}));});it('文件写入失败不会打开分享面板',async()=>{mocks.write.mockRejectedValue(new Error('存储不足'));await expect(exportFile('data','报告.pdf','application/pdf')).rejects.toThrow('存储不足');expect(mocks.share).not.toHaveBeenCalled();});});
