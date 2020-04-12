export interface IInvite {
  inviterId: string;
  inviterEmail: string;
  inviteDate: Date;
  acceptDate: Date;
  orgId: string;
  inviteText: string;
  inviteStatus: string;
  inviteeId: string;
  inviteeEmail: string;
}
export class Invite implements IInvite {
  constructor(
    public _id: string,
    public inviterId: string,
    public inviterEmail: string,
    public inviteDate: Date,
    public acceptDate: Date,
    public orgId: string,
    public inviteText: string,
    public inviteStatus: string,
    public inviteeId: string,
    public inviteeEmail: string
  ) {}
}
