"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const postsRouter_1 = __importDefault(require("./routes/postsRouter"));
const app = (0, express_1.default)();
const PORT = 8080;
(0, dbConnect_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/api/posts', postsRouter_1.default);
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
