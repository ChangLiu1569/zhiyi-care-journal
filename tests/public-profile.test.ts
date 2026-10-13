import {expect,it} from 'vitest';
import {initialPatient,initialEvents} from '../lib/model';
it('公开部署不包含真实患者初始病史或事件',()=>{expect(initialEvents).toEqual([]);for(const [key,value] of Object.entries(initialPatient))if(key!=='id')expect(value).toBe('');});
