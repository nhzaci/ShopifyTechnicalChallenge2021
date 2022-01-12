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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
var logger_1 = require("../utils/logger");
var inventory_model_1 = require("./inventory.model");
var InventoryService = /** @class */ (function () {
    function InventoryService() {
    }
    /**
     * Get all Items in Inventory and returns
     * @returns Items in Inventory
     */
    InventoryService.prototype.getItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, inventory_model_1.Inventory.find({ deleted: false })];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                items: items,
                            }];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, this.handleError('getItems', e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create an item from item request body
     * @param itemBody item passed in by user
     * @returns response of success boolean with message on failure,
     *          else, item id on successful creation of document
     */
    InventoryService.prototype.create = function (itemBody) {
        return __awaiter(this, void 0, void 0, function () {
            var item, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, inventory_model_1.Inventory.create(itemBody)];
                    case 1:
                        item = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                item: item,
                            }];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, this.handleError('create', e_2, { itemBody: itemBody })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete an item present in inventory by id if item is present,
     * else, do nothing
     * @param itemId item id present in inventory
     * @returns success true if item is present and deleted, else
     *          returns success false with a message
     */
    InventoryService.prototype.delete = function (itemId, deleteReason) {
        if (deleteReason === void 0) { deleteReason = 'No reason'; }
        return __awaiter(this, void 0, void 0, function () {
            var deleteItem;
            var _this = this;
            return __generator(this, function (_a) {
                deleteItem = function (item) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                item.deleted = true;
                                return [4 /*yield*/, item.save()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, inventory_model_1.DeleteEvents.create({ itemId: item._id, reason: deleteReason })];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/, this.findByIdAndPerformAction('delete', itemId, deleteItem, {
                        itemId: itemId,
                    })];
            });
        });
    };
    /**
     * Edit a single document by ID if present
     * @param itemId ID of Item being updated
     * @param itemBody Contents of new Item
     * @returns success true if updating succeeded and old item, else, false with
     *          error message
     */
    InventoryService.prototype.edit = function (itemId, itemBody) {
        return __awaiter(this, void 0, void 0, function () {
            var updateItem;
            var _this = this;
            return __generator(this, function (_a) {
                updateItem = function (item) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, item.updateOne(itemBody)];
                }); }); };
                return [2 /*return*/, this.findByIdAndPerformAction('edit', itemId, updateItem, {
                        itemId: itemId,
                        itemBody: itemBody,
                    })];
            });
        });
    };
    InventoryService.prototype.getDeleteEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var events, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, inventory_model_1.DeleteEvents.find()];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                events: events,
                            }];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, this.handleError('getItems', e_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InventoryService.prototype.undoDeleteEvent = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mostRecentDeleteEvent_1, updateDeletedToFalse, e_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, inventory_model_1.DeleteEvents.findOne().sort({
                                $natural: -1,
                            })];
                    case 1:
                        mostRecentDeleteEvent_1 = _a.sent();
                        if (mostRecentDeleteEvent_1) {
                            updateDeletedToFalse = function (item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            item.deleted = false;
                                            return [4 /*yield*/, item.save()];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, mostRecentDeleteEvent_1.deleteOne()];
                                        case 2:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            return [2 /*return*/, this.findByIdAndPerformAction('undoDeleteEvent', mostRecentDeleteEvent_1.itemId, updateDeletedToFalse)];
                        }
                        return [2 /*return*/, {
                                success: false,
                                message: 'There are no deleted events available',
                            }];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, this.handleError('undoDeleteEvent', e_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Helper method to enforce DRY for all methods that require
     * looking up by ID
     * @param itemId ID of Item to find in Inventory
     * @param payload payload of the method from the controller
     * @param action callback function to be performed on item
     * @returns InventoryResponse after function is performed or
     *          success set to false if item not found
     */
    InventoryService.prototype.findByIdAndPerformAction = function (methodName, itemId, action, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var item, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, inventory_model_1.Inventory.findById(itemId)
                            // if item is present
                        ];
                    case 1:
                        item = _a.sent();
                        if (!item) return [3 /*break*/, 3];
                        return [4 /*yield*/, action(item)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, {
                                success: true,
                                item: item,
                            }];
                    case 3: 
                    // if item is not present, send error message
                    return [2 /*return*/, {
                            success: false,
                            message: 'Item ID does not exist in Inventory',
                        }];
                    case 4:
                        e_5 = _a.sent();
                        return [2 /*return*/, this.handleError(methodName, e_5, payload)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Helper method that handles unknown error type by either returning
     * error message if error is of Error type, else sending an unknown error
     * @param e unknown error
     * @returns InventoryResponse
     */
    InventoryService.prototype.handleError = function (methodName, e, payload) {
        if (e instanceof Error) {
            logger_1.Logger.error("InventoryService.".concat(methodName, " failed with error ").concat(e), payload);
            return {
                success: false,
                message: e.message,
            };
        }
        logger_1.Logger.error("InventoryService.".concat(methodName, " failed with unknown error ").concat(e), payload);
        return {
            success: false,
            message: 'Unknown error',
        };
    };
    return InventoryService;
}());
exports.InventoryService = InventoryService;
