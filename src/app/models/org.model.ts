export interface IOrg {
  creatorId: string;
  name: string;
  description: string;
  eventDate: Date;
  members: string[];
}
export class Org implements IOrg {
  constructor(
    public id: string,
    public creatorId: string,
    public name: string,
    public description: string,
    public eventDate: Date,
    public members: string[]
  ) {}
}
