export interface IFloor {
  floorNumber: number;
  peopleIds: string[];
  elevatorIds: string[];
  keypadId: string;
}

export class Floor implements IFloor {
  constructor(
    public floorNumber: number,
    public peopleIds: string[],
    public elevatorIds: string[],
    public keypadId: string
  ) {
  }
}