export interface ISetting {
  userId: string;
  alertDistance: {
    enabled: boolean;
    radius: number;
  };
}
export class Setting implements ISetting {
  constructor(
    public id: string,
    public userId: string,
    public alertDistance: {
      enabled: boolean;
      radius: number;
    }
  ) {}
}
