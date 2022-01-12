"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["Info"] = "INFO";
    LogLevel["Warn"] = "WARN";
    LogLevel["Error"] = "ERROR";
})(LogLevel || (LogLevel = {}));
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.outputLog = function (logText, level, obj) {
        console.log("[".concat(new Date().toISOString(), "] [").concat(level, "] ").concat(logText), obj);
    };
    Logger.makeLog = function (level) {
        var _this = this;
        var obj = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            obj[_i - 1] = arguments[_i];
        }
        return function (text) { return function (obj) { return _this.outputLog(text, level, obj); }; };
    };
    Logger.info = function (text) {
        var obj = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            obj[_i - 1] = arguments[_i];
        }
        this.makeLog(LogLevel.Info)(text)(obj);
    };
    Logger.error = function (text) {
        var obj = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            obj[_i - 1] = arguments[_i];
        }
        this.makeLog(LogLevel.Error)(text)(obj);
    };
    Logger.warn = function (text) {
        var obj = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            obj[_i - 1] = arguments[_i];
        }
        this.makeLog(LogLevel.Warn)(text)(obj);
    };
    return Logger;
}());
exports.Logger = Logger;
