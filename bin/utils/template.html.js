"use strict";
exports.templateHtml = function (html) {
    var version = require("./variable").version;
    return "\n<doctype html>\n<head>\n<meta name=\"generator\" content=\"Rettle ".concat(version, "\">\n<link rel=\"stylesheet\" href=\"/style.css\">\n</head>\n<body>\n").concat(html, "\n<script src=\"/bundle.js\"></script>\n</body>\n  ");
};
