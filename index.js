var http       = require("http"),
    express    = require("express"),
    _          = require('underscore'),
    app        = express(),
    fileRoot,
    port;

if (typeof process.argv[2] === "string") {
  fileRoot = process.argv[2];
}
else {
  throw new Error("You must provide a path to the static content-root.");
}

if (typeof process.argv[3] === "string") {
  port = process.argv[3];
}
else {
  port = "8888";
}

var serveStatic = function(fileName, response) {
    response.sendfile(fileName, {
        "root": fileRoot
    });
};

app.get("/", function(req, res) {
    serveStatic("index.html", res);
});

app.get("/*", function(req, res) {
    serveStatic(req.params[0], res);
});

app.listen(port);

console.log("Node running on port " + port.toString() + ", serving content from " + fileRoot.toString());
