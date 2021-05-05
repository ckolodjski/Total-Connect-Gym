
//Holds information about a particular level of gym membership.
export interface MembershipLevel {
    Name: string;
    Price: number;

    //This should be a uuid settable by calling uuid() from the uuid lib.
    UniqueID: string;
}