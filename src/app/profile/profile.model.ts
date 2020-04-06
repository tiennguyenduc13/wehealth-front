export interface IProfile {
  userId: string;
  email: string;
  cellPhone: string;
  dateOfBirth: Date;
  gender: string;
}
export class Profile implements IProfile {
  constructor(
    public id: string,
    public userId: string,
    public email: string,
    public cellPhone: string,
    public dateOfBirth: Date,
    public gender: string
  ) {}
}
