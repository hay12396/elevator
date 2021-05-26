import { IFloor } from "./";
import { Elevator } from "./";
import { IKeypadRequest } from "./";
import { Queue } from "./";
import { IElevator } from "./elevator";

export interface IBuilding {
  floors: IFloor[];
  elevators: Elevator[];
  requestsQueue: Queue<IKeypadRequest>;

  goToFloor: (currentFloor: number, destinationFloor: number) => IElevator;
}