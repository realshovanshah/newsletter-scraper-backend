"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
var NewsletterSchema = new mongoose_1.default.Schema({
    issueNo: {
        type: Number,
        required: true
    },
    posts: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
module.exports = mongoose_1.default.model('Newsletter', NewsletterSchema);
