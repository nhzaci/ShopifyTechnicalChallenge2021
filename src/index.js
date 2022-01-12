"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = require("./app");
var port = process.env.PORT || 3000;
var mongodbConnectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopify-inventory';
mongoose_1.default
    .connect(mongodbConnectionString)
    .then(function () {
    return app_1.app.listen(port, function () { return console.log("App running on PORT ".concat(port)); });
})
    .catch(function (error) { return console.log(error.message); });
