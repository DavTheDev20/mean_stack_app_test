"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const postsRouter_1 = __importDefault(require("./routes/postsRouter"));
const path = require('path');
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
    console.log('\x1b[31m', '   ERROR: No NODE_ENV specified. NODE_ENV must be set to development or production.');
    process.exit(1);
}
(0, dbConnect_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/posts', postsRouter_1.default);
if (NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
    app.get('*', (req, res) => {
        res.send("<h2 style='color: red;text-align:center;margin-top:2%;font-family:Arial, sans-serif'>ERROR: App is in development mode, please change to production to see UI.<br/><br/>To Run UI and Server run <code>'yarn dev'</code><h2>");
    });
    console.log('!!! App is running in development mode !!!');
}
if (NODE_ENV === 'production') {
    app.use((0, morgan_1.default)('tiny'));
    app.use('/', express_1.default.static(path.join(__dirname, '..', 'client', 'dist', 'client')));
    console.log('!!! App is running in production mode !!!');
}
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
