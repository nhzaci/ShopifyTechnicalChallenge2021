"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEvents = exports.Inventory = void 0;
var mongoose_1 = require("mongoose");
var itemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
exports.Inventory = (0, mongoose_1.model)('inventory', itemSchema);
var deleteEventSchema = new mongoose_1.Schema({
    itemId: {
        type: String,
        required: true,
    },
    reason: {
        type: String,
    },
}, { timestamps: true });
exports.DeleteEvents = (0, mongoose_1.model)('delete_events', deleteEventSchema);
