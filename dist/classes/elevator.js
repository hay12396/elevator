"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Elevator = /** @class */ (function () {
    function Elevator(id, currentFloor, movingDirection, peopleIds) {
        var _this = this;
        this.id = id;
        this.currentFloor = currentFloor;
        this.movingDirection = movingDirection;
        this.peopleIds = peopleIds;
        this._stopsAt = [];
        this.run = function (p) {
            if (_this._stopsAt.length === 0)
                return;
            var move = _this.movingDirection === "up" ? 1 : _this.movingDirection === "down" ? -1 : 0;
            _this.currentFloor += move;
            var shouldStopActions = _this._stopsAt.filter(function (a) { return a.floor === _this.currentFloor; });
            if (shouldStopActions.length) {
                shouldStopActions.forEach(function (a) {
                    if (a.action === "pick") {
                        p.pickPeopleFromFloor(a.peopleId);
                        _this.peopleIds.push(a.peopleId);
                    }
                    else if (a.action === "remove") {
                        p.removePeopleFromElevator(a.peopleId);
                        _this.peopleIds = _this.peopleIds.filter(function (id) { return id !== a.peopleId; });
                        _this._stopsAt = _this._stopsAt.filter(function (sa) { return sa.id === a.id; });
                    }
                });
            }
            var nextOrderByStamp = _this._getNextOrderByStamp();
            _this.movingDirection = nextOrderByStamp.floor > _this.currentFloor ? "up" : "down";
        };
        this.getDistance = function (pickupFloor, destinationFloor) {
            var distanceFromPickup = _this._getDistanceFromFloor(pickupFloor);
            var originFloor = _this.currentFloor;
            _this.currentFloor = pickupFloor;
            var distanceOfDestinationFromPickup = _this._getDistanceFromFloor(destinationFloor);
            _this.currentFloor = originFloor;
            return distanceFromPickup + distanceOfDestinationFromPickup;
        };
        this._getDistanceFromFloor = function (floor) {
            if (floor === _this.currentFloor)
                return 0;
            if (floor > _this.currentFloor) {
                return _this._getDistanceForBiggerFloor(floor);
            }
            else { //floor < this.currentFloor
                return _this._getDistanceForLowerFloor(floor);
            }
        };
        this._getDistanceForBiggerFloor = function (floor) {
            if (_this.movingDirection === "up" || _this.movingDirection === "idle") {
                return floor - _this.currentFloor;
            }
            else if (_this.movingDirection === "down") {
                var destinationDirectionFloor = Number.MAX_VALUE;
                for (var i = 0; i < _this._stopsAt.length; i++) {
                    if (_this._stopsAt[i].floor < destinationDirectionFloor) {
                        destinationDirectionFloor = _this._stopsAt[i].floor;
                    }
                }
                var distanceFromCurrentToDirectionDestination = _this.currentFloor - destinationDirectionFloor;
                return distanceFromCurrentToDirectionDestination + Math.abs(destinationDirectionFloor - floor);
            }
        };
        this._getDistanceForLowerFloor = function (floor) {
            if (_this.movingDirection === "up") {
                var destinationDirectionFloor = Number.MIN_VALUE;
                for (var i = 0; i < _this._stopsAt.length; i++) {
                    if (_this._stopsAt[i].floor > destinationDirectionFloor) {
                        destinationDirectionFloor = _this._stopsAt[i].floor;
                    }
                }
                var distanceFromCurrentToDirectionDestination = Math.abs(_this.currentFloor - destinationDirectionFloor);
                return distanceFromCurrentToDirectionDestination + Math.abs(destinationDirectionFloor - floor);
            }
            else if (_this.movingDirection === "down" || _this.movingDirection === "idle") {
                return _this.currentFloor - floor;
            }
        };
        this._getNextOrderByStamp = function () {
            var nextOrder = _this._stopsAt[0];
            for (var i = 1; i < _this._stopsAt.length; i++) {
                if (nextOrder.timeStamp > _this._stopsAt[i].timeStamp) {
                    nextOrder = _this._stopsAt[i];
                }
            }
            return nextOrder;
        };
    }
    return Elevator;
}());
exports.Elevator = Elevator;
//# sourceMappingURL=elevator.js.map