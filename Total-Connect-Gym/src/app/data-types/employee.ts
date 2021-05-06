//Represents a gym employee.
export interface GymEmployee {
    Name: string;
    DateOfBirth: Date;
    CurrentlyClockedIn: boolean;
    HoursWorked: number;

    //This should be a uuid settable by calling uuid() from the uuid lib.
    UniqueID: string;
}