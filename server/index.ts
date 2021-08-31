import "./dotenv";
import { fastify } from "fastify";
import { useSSG } from "../scripts/useSSG";
const PORT = process.env.PORT || 3000;

const app = fastify({});
app.get("/ping", async (res) => {
  return { name: "pong", data: res.body };
});

async function start() {
  await useSSG(app);
  try {
    console.log(`http://localhost:${PORT}`);
    await app.listen(PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();
