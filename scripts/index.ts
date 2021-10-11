import { fastify } from "fastify";
import { useSSR } from "./useSSR";
import { getIPAddress } from "./getIPAddress";
const PORT = process.env.PORT || 3000;

const app = fastify({});
app.get("/ping", async (res) => {
  return { name: "pong", data: res.body };
});

async function start() {
  await useSSR(app);
  try {
    console.log(`http://localhost:${PORT} or http://${getIPAddress()}:${PORT}`);
    // 若你工作的网络环境不安全，请移除 public address
    await app.listen(PORT, "0.0.0.0");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
