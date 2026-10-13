import 'fake-indexeddb/auto';
import {describe,it,expect,beforeEach} from 'vitest';
import {db,initialize,saveSession,exportBackup,importBackup} from '../lib/db';
import {newSession,filterSessions,distribution,csv,backupSchema,localDay} from '../lib/model';
beforeEach(async()=>{await db.delete();await db.open();await initialize();});
describe('本地记录与备份',()=>{
it('保存、重新打开数据库后仍能读取',async()=>{const s=newSession();s.status='partial';s.items.expression.status='partial';s.items.expression.quote='喝水的';await saveSession(s);db.close();await db.open();expect((await db.sessions.get(s.id))?.items.expression.quote).toBe('喝水的');});
it('完整备份恢复保持原话与缺失项',async()=>{const s=newSession();s.status='partial';s.notes='测试';await saveSession(s);const b=await exportBackup();await db.sessions.clear();await importBackup(JSON.parse(JSON.stringify(b)));expect(await db.sessions.count()).toBe(1);expect((await db.sessions.get(s.id))?.items.memory.status).toBe('unobserved');});
it('错误版本或关联不通过且不覆盖现有数据',async()=>{const b=await exportBackup();await expect(importBackup({...b,schemaVersion:2})).rejects.toThrow();expect(await db.patients.count()).toBe(1);const s=newSession();s.patientId='wrong';expect(backupSchema.safeParse({...b,sessions:[s]}).success).toBe(false);});
it('缺失项目不被算作正常；无法判断保留',()=>{const a=newSession();const b=newSession();b.items.memory.status='uncertain';b.items.memory.result='因语言表达困难无法判断';expect(distribution([a],'memory')).toEqual([]);expect(distribution([a,b],'memory')).toEqual([{name:'因语言表达困难无法判断',count:1}]);});
it('按记录时区包含结束日，剔除 Demo 和草稿',()=>{const s=newSession();s.status='partial';s.observedAt='2026-10-11T17:00:00.000Z';s.timezone='Asia/Shanghai';expect(localDay(s.observedAt,s.timezone)).toBe('2026-10-12');expect(filterSessions([s,{...s,demo:true},{...s,status:'draft'}],'2026-10-12','2026-10-12').length).toBe(1);expect(filterSessions([s],'2026-10-11','2026-10-11').length).toBe(0);});
it('CSV保留中文、双引号和换行并防公式注入',()=>{const s=newSession();s.notes='=SUM(A1)\n"中文"';const out=csv([s]);expect(out.startsWith('\uFEFF')).toBe(true);expect(out).toContain("'=SUM(A1)");expect(out).toContain('""中文""');});
it('不接受损坏观察结构',async()=>{const s=newSession();delete s.items.attention;await expect(saveSession(s)).rejects.toThrow();expect(await db.sessions.count()).toBe(0);});
});
