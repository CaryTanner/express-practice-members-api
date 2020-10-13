const fs = require("fs");
const http = require("http");
const url = require("url");

http
  .createServer((req, res) => {
    let q = url.parse(req.url, true);
    let fileName = `.${q.pathname}`;
    fs.readFile(fileName, (err, data) => {
      if (err) {
        fs.readFile("404.html", (err, data) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        });
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  })
  .listen(8080);
