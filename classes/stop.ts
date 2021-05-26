export interface IStop {
  floor: number;
  action: "pick" | "remove";
  peopleId: string;
  timeStamp: number;

  id: string;
}