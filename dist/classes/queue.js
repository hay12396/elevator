"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Queue = /** @class */ (function () {
    function Queue() {
        this._store = [];
    }
    Queue.prototype.enqueue = function (val) {
        this._store.push(val);
    };
    Queue.prototype.dequeue = function () {
        return this._store.shift();
    };
    return Queue;
}());
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map