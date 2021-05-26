import { IBuilding } from "./classes/building";
import { buildingConf } from "./levels/level-1-config";

const main = (b: IBuilding) => {
  //new building(init);
  //start:

  //level 1 - only elevators configured - is just going finding the right elevator by the distance
  console.log("Elevator id:", b.goToFloor(0, 5).id);

  //level 2 - elevators and people configured (5-10 people) - running until all are in their destinations
  //dequeue all from the building queue and put into stopsAt (through Pick) of elevators (by distance)
  //go elevator one by one running Run
  //if all idle end
  //back to start

  //bonus:
  //60 is the total cost
  //2 seconds (2) is the cost of doing one step
  //running until total cost is done, then checking all floors and elevators for people  
}

main(buildingConf);