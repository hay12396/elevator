"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var classes_1 = require("../classes");
var classes_2 = require("../classes");
var classes_3 = require("../classes");
var Building = /** @class */ (function () {
    function Building() {
        var _this = this;
        this.elevators = [
            new classes_2.Elevator("1", 1, "idle", []),
            new classes_2.Elevator("2", 2, "idle", []),
        ];
        this.floors = [
            new classes_3.Floor(0, ["1", "2", "3"], ["1", "2"], "0"),
            new classes_3.Floor(1, ["4", "5", "6"], ["3", "4"], "1"),
            new classes_3.Floor(2, ["7", "8", "9"], ["5", "6"], "2"),
            new classes_3.Floor(3, ["10", "11", "12"], ["7", "8"], "3"),
            new classes_3.Floor(4, ["13", "14", "15"], ["9", "10"], "4"),
            new classes_3.Floor(5, ["116", "17", "18"], ["11", "12"], "5"),
        ];
        this.requestsQueue = new classes_1.Queue();
        this.goToFloor = function (currentFloor, destinationFloor) {
            if (_this.floors.length === 0)
                throw new Error("Building must have at least 1 floor.");
            if (_this.elevators.length === 0)
                throw new Error("Building must have at least 1 elevator.");
            if (currentFloor < 0 || destinationFloor < 0)
                throw new Error("Unsupported floor.");
            if (currentFloor >= _this.floors.length || destinationFloor >= _this.floors.length)
                throw new Error("Unsupported floor.");
            var relevantElevator = _this.elevators[0];
            var relevantElevatorDistance = relevantElevator.getDistance(currentFloor, destinationFloor);
            for (var i = 0; i < _this.elevators.length; i++) {
                var e = _this.elevators[i];
                var ed = e.getDistance(currentFloor, destinationFloor);
                if (relevantElevatorDistance > ed) {
                    relevantElevator = e;
                    relevantElevatorDistance = ed;
                }
            }
            return relevantElevator;
        };
    }
    return Building;
}());
exports.buildingConf = new Building();
//# sourceMappingURL=level-1-config.js.map