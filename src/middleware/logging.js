"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.requestLogger = void 0;
var logger_1 = require("../utils/logger");
var requestLogger = function (req, _, next) {
    logger_1.Logger.info("Incoming request to ".concat(req.url, " with"), req.body, req.params);
    next();
};
exports.requestLogger = requestLogger;
var errorLogger = function (err, _, __, next) {
    logger_1.Logger.error("Request ended with error ".concat(err.message), err);
    next();
};
exports.errorLogger = errorLogger;
