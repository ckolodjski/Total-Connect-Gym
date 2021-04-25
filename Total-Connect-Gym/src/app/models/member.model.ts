export class Member {
    id: number;
    name: string;
    membership: Membership;
    checkedIn: boolean;

    constructor(id: number, name: string, membership: Membership) {
        this.id = id;
        this.name = name;
        this.membership = membership;
        this.checkedIn = false;
    }
}

export enum Membership {
    NonMember = "NONMEMBER",
    Member = "MEMBER", // can add more levels here
}