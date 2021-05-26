import { IBuilding, Queue } from "../classes";
import { Elevator } from "../classes";
import { Floor } from "../classes";
import { IKeypadRequest } from "../classes";

class Building implements IBuilding {
  elevators = [
    new Elevator("1", 1, "idle", []),
    new Elevator("2", 2, "idle", []),
  ];

  floors = [
    new Floor(0, ["1", "2", "3"], ["1", "2"], "0"),
    new Floor(1, ["4", "5", "6"], ["3", "4"], "1"),
    new Floor(2, ["7", "8", "9"], ["5", "6"], "2"),
    new Floor(3, ["10", "11", "12"], ["7", "8"], "3"),
    new Floor(4, ["13", "14", "15"], ["9", "10"], "4"),
    new Floor(5, ["116", "17", "18"], ["11", "12"], "5"),
  ];

  requestsQueue = new Queue<IKeypadRequest>();

  goToFloor = (currentFloor: number, destinationFloor: number) => {
    if (this.floors.length === 0)
      throw new Error("Building must have at least 1 floor.");

    if (this.elevators.length === 0)
      throw new Error("Building must have at least 1 elevator.");

    if (currentFloor < 0 || destinationFloor < 0)
      throw new Error("Unsupported floor.");

    if (currentFloor >= this.floors.length || destinationFloor >= this.floors.length)
      throw new Error("Unsupported floor.");

    let relevantElevator = this.elevators[0];
    let relevantElevatorDistance = relevantElevator.getDistance(currentFloor, destinationFloor);

    for (let i = 0; i < this.elevators.length; i++) {
      let e = this.elevators[i];
      let ed = e.getDistance(currentFloor, destinationFloor);

      if (relevantElevatorDistance > ed) {
        relevantElevator = e;
        relevantElevatorDistance = ed;
      }
    }

    return relevantElevator;
  }
}

export const buildingConf = new Building();