export interface IHealthChange {
  userId: string;
  eventDate: Date;
  healthSignals: string[];
}
export class HealthChange implements IHealthChange {
  constructor(
    public id: string,
    public userId: string,
    public eventDate: Date,
    public healthSignals: string[]
  ) {}
}
