const server = require("./server.js");

const port = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`We are live on: http://localhost:${port}`);
});

module.exports = server;