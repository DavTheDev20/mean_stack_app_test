"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_1 = __importDefault(require("../models/post"));
const postsRouter = express_1.default.Router();
postsRouter
    .get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postsData = yield post_1.default.find({});
        return res.status(200).json({ success: true, posts: postsData });
    }
    catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}))
    .post('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const responseData = req.body;
        if (!responseData.title && !responseData.content) {
            return res.status(400).json({
                success: false,
                error: 'Please include title and content in request json body.',
            });
        }
        const newPost = yield post_1.default.create(responseData);
        return res.status(200).json({ success: true, post: newPost });
    }
    catch (err) {
        return res.status(400).json({ success: false, error: err.message });
    }
}));
exports.default = postsRouter;
