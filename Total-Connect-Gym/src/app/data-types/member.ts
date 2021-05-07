import { MembershipLevel } from './membership';

//Represents a gym member.
export interface GymMember {
    Name: string;
    DateOfBirth: Date;
    MembershipLevel: MembershipLevel;
    CurrentlyCheckedIn: boolean;

    //This should be a uuid settable by calling uuid() from the uuid lib.
    UniqueID: string;
}