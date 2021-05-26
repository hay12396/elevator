"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var level_1_config_1 = require("./levels/level-1-config");
var main = function (b) {
    //new building(init);
    //start:
    //level 1 - only elevators configured - is just going finding the right elevator by the distance
    console.log(b.goToFloor(0, 5));
    //level 2 - elevators and people configured (5-10 people) - running until all are in their destinations
    //dequeue all from the building queue and put into stopsAt (through Pick) of elevators (by distance)
    //go elevator one by one running Run
    //if all idle end
    //back to start
    //bonus:
    //60 is the total cost
    //2 seconds (2) is the cost of doing one step
    //running until total cost is done, then checking all floors and elevators for people  
};
main(level_1_config_1.buildingConf);
//# sourceMappingURL=main.js.map