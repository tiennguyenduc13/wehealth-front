export interface IMessage {
  userId: string;
  userName: string;
  orgId: string;
  text: string;
  eventDate: Date;
}
export class Message implements IMessage {
  constructor(
    public _id: string,
    public userId: string,
    public userName: string,
    public orgId: string,
    public text: string,
    public eventDate: Date
  ) {}
}
