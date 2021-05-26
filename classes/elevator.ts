import { IStop } from "./";

export type MovingDirection = "up" | "down" | "idle";

export interface IElevator {
  id: string;
  currentFloor: number;
  movingDirection: MovingDirection;
  peopleIds: string[];

  getDistance: (pickupFloor: number, destinationFloor: number) => void;

  run: (p: IRunProps) => void;
}

export interface IRunProps {
  pickPeopleFromFloor: (peopleId: string) => void;
  removePeopleFromElevator: (peopleId: string) => void;
}

export class Elevator implements IElevator {
  constructor(
    public id: string,
    public currentFloor: number,
    public movingDirection: MovingDirection,
    public peopleIds: string[]
  ) {
  }

  private _stopsAt: IStop[] = [];

  run = (p: IRunProps) => {
    if (this._stopsAt.length === 0) return;

    let move = this.movingDirection === "up" ? 1 : this.movingDirection === "down" ? -1 : 0;
    this.currentFloor += move;

    let shouldStopActions = this._stopsAt.filter(a => a.floor === this.currentFloor);

    if (shouldStopActions.length) {
      shouldStopActions.forEach(a => {
        if (a.action === "pick") {
          p.pickPeopleFromFloor(a.peopleId);
          this.peopleIds.push(a.peopleId);
        } else if (a.action === "remove") {
          p.removePeopleFromElevator(a.peopleId);
          this.peopleIds = this.peopleIds.filter(id => id !== a.peopleId);
          this._stopsAt = this._stopsAt.filter(sa => sa.id === a.id);
        }
      })
    }

    let nextOrderByStamp = this._getNextOrderByStamp();
    this.movingDirection = nextOrderByStamp.floor > this.currentFloor ? "up" : "down";
  }

  getDistance = (pickupFloor: number, destinationFloor: number) => {
    let distanceFromPickup = this._getDistanceFromFloor(pickupFloor);
    let originFloor = this.currentFloor;
    this.currentFloor = pickupFloor;
    let distanceOfDestinationFromPickup = this._getDistanceFromFloor(destinationFloor);
    this.currentFloor = originFloor;
    return distanceFromPickup + distanceOfDestinationFromPickup;
  }

  private _getDistanceFromFloor = (floor: number) => {
    if (floor === this.currentFloor) return 0;

    if (floor > this.currentFloor) {
      return this._getDistanceForBiggerFloor(floor);
    }

    else {//floor < this.currentFloor
      return this._getDistanceForLowerFloor(floor);
    }
  }

  private _getDistanceForBiggerFloor = (floor: number) => {
    if (this.movingDirection === "up" || this.movingDirection === "idle") {
      return floor - this.currentFloor;
    }

    else if (this.movingDirection === "down") {
      let destinationDirectionFloor = Number.MAX_VALUE;
      for (let i = 0; i < this._stopsAt.length; i++) {
        if (this._stopsAt[i].floor < destinationDirectionFloor) {
          destinationDirectionFloor = this._stopsAt[i].floor;
        }
      }

      let distanceFromCurrentToDirectionDestination = this.currentFloor - destinationDirectionFloor;
      return distanceFromCurrentToDirectionDestination + Math.abs(destinationDirectionFloor - floor);
    }
  }

  private _getDistanceForLowerFloor = (floor: number) => {
    if (this.movingDirection === "up") {
      let destinationDirectionFloor = Number.MIN_VALUE;
      for (let i = 0; i < this._stopsAt.length; i++) {
        if (this._stopsAt[i].floor > destinationDirectionFloor) {
          destinationDirectionFloor = this._stopsAt[i].floor;
        }
      }

      let distanceFromCurrentToDirectionDestination = Math.abs(this.currentFloor - destinationDirectionFloor);
      return distanceFromCurrentToDirectionDestination + Math.abs(destinationDirectionFloor - floor);
    }

    else if (this.movingDirection === "down" || this.movingDirection === "idle") {
      return this.currentFloor - floor;
    }
  }

  private _getNextOrderByStamp = () => {
    let nextOrder = this._stopsAt[0];
    for (let i = 1; i < this._stopsAt.length; i++) {
      if (nextOrder.timeStamp > this._stopsAt[i].timeStamp) {
        nextOrder = this._stopsAt[i];
      }
    }

    return nextOrder;
  }
}