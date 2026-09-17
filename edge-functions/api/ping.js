/**
 * EdgeOne Pages Edge Function —— 服务探测
 * 路由：GET /api/ping
 *
 * 页面加载时 index.html 的 probeServerMode() 会请求本接口：
 *   - 本地 server.js 返回 { ok:true }                 → 本地模式：配置/题库可写回文件
 *   - 本函数返回     { ok:true, storage:"blob" }       → 云端模式：成绩汇总到 Blob，
 *                                                        但配置/题库不支持写回文件，需走 GitHub 推送
 */
export async function onRequest() {
  return new Response(JSON.stringify({ ok: true, storage: 'blob' }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
