const express = require("express");
const axios = require("axios");
const responseTime = require("response-time");
const redis = require("redis");

let redisClient; /* = redis.createClient({
  host: "127.0.0.1",
  port: 6379,
}); */

(async () => {
  redisClient = redis.createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

const app = express();

app.use(responseTime());

app.get("/character", async (req, res) => {
  const cachedResponse = await redisClient.get("characters");
  if (cachedResponse) return res.json(JSON.parse(cachedResponse));

  const { data } = await axios.get("https://rickandmortyapi.com/api/character");

  await redisClient.set("characters", JSON.stringify(data));
  res.json(data);
});

app.get("/character/:id", async (req, res) => {
  const cachedResponse = await redisClient.get(req.params.id);
  if (cachedResponse) return res.json(JSON.parse(cachedResponse));

  const { data } = await axios.get(
    "https://rickandmortyapi.com/api/character/" + req.params.id
  );

  await redisClient.set(req.params.id, JSON.stringify(data));
  res.json(data);
});

app.listen(3000);
console.log("Server on port 3000");
