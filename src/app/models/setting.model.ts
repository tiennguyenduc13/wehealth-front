export interface ISetting {
  userId: string;
  alertDistance: {
    enabled: boolean;
    radius: number;
  };
}
export class Setting implements ISetting {
  constructor(
    public _id: string,
    public userId: string,
    public alertDistance: {
      enabled: boolean;
      radius: number;
    }
  ) {}
}
