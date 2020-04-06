export interface ISetting {
  userId: string;
  alertRadius: number;
}
export class Setting implements ISetting {
  constructor(
    public id: string,
    public userId: string,
    public alertRadius: number
  ) {}
}
