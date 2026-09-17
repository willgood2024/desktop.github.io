/**
 * EdgeOne Pages Edge Function —— 成绩汇总后端（Blob 持久化）
 * 路由：/api/records
 *
 * 与本地 server.js 的 /api/records 行为完全一致，前端 index.html 无需改动：
 *   GET    /api/records   → { ok:true, records:[...] }   管理页每 15 秒对账拉取
 *   POST   /api/records   → { ok:true, total:N }         学员成绩回传时自动推送（按 id 去重）
 *   DELETE /api/records   → { ok:true }                  管理页「清空记录」联动清空
 *
 * 存储模型：每条成绩单独存一个对象 rec/<id>.json
 *   —— 天然规避「多人同时交卷写同一个文件」的竞态；读取用 strong 一致性，
 *      保证管理员轮询时立刻看到刚提交的成绩。
 *
 * 首次调用 store 时会自动为当前项目创建命名空间 exam-records（控制台里可只读浏览）。
 */
import { getStore } from '@edgeone/pages-blob';

const store = getStore({ name: 'exam-records', consistency: 'strong' });
const PREFIX = 'rec/';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });

async function listRecords() {
  const { blobs } = await store.list({ prefix: PREFIX, consistency: 'strong' });
  const records = [];
  for (const b of blobs) {
    const r = await store.get(b.key, { type: 'json', consistency: 'strong' });
    if (r) records.push(r);
  }
  return records;
}

export async function onRequest({ request }) {
  const method = (request.method || 'GET').toUpperCase();

  // 同源请求，无需 CORS；仅兜底处理预检
  if (method === 'OPTIONS') return new Response(null, { status: 204 });

  try {
    if (method === 'GET') {
      return json({ ok: true, records: await listRecords() });
    }

    if (method === 'POST') {
      let record;
      try {
        record = await request.json();
      } catch {
        return json({ ok: false, error: 'JSON 解析失败' }, 400);
      }
      if (!record || typeof record.name !== 'string' || !record.id) {
        return json({ ok: false, error: '记录格式无效' }, 400);
      }
      const key = PREFIX + record.id + '.json';
      const exist = await store.get(key, { type: 'json', consistency: 'strong' });
      if (!exist) await store.setJSON(key, record);   // 按 id 去重，重复扫码不重复计
      const { blobs } = await store.list({ prefix: PREFIX, consistency: 'strong' });
      return json({ ok: true, total: blobs.length });
    }

    if (method === 'DELETE') {
      const { blobs } = await store.list({ prefix: PREFIX, consistency: 'strong' });
      for (const b of blobs) await store.delete(b.key);
      return json({ ok: true });
    }

    return json({ ok: false, error: 'Method Not Allowed' }, 405);
  } catch (e) {
    return json({ ok: false, error: String((e && e.message) || e) }, 500);
  }
}
