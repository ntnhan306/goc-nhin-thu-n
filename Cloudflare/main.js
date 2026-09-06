export default {
  async fetch(request, env, ctx) {
    return new Response(JSON.stringify({
      status: "success",
      message: "Cloudflare Worker của Góc Nhìn Thứ N đã hoạt động thành công!",
      timestamp: new Date().toISOString()
    }), {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
};