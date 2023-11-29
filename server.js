
const http = require("http");
const app = require("./app");

app.set("PORT", process.env.PORT || 4050);
const server = http.createServer(app);

server.listen(process.env.process || 4050, () => {
  console.log("server en marche");
});
