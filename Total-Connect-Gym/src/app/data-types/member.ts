import { Membership } from "../models/member.model";

//Represents a gym member.
export interface GymMember {
    Name: string;
    DateOfBirth: Date;
    MembershipLevel: Membership;
    CurrentlyCheckedIn: boolean;

    //This should be a uuid settable by calling uuid() from the uuid lib.
    UniqueID: string;
}