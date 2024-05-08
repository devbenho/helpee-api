"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var port = 2105;
app_1.app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
