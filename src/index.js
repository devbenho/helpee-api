"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 2105;
app_1.app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
