import { Time } from "@angular/common";
import { Day } from "./day-of-week";
import { Course } from "./course";
import { v4 as uuid } from 'uuid';

//Represents a class that is on the gym's offered classes schedule.
export interface GymClass {
    ClassInformation: Course;
    Day: Day;
    StartTime: Date;
    EndTime: Date;

    //The unique ID for the class that represents a specific day and time of a course.
    //This should be a uuid settable by calling uuid() from the uuid lib.
    ClassInstanceId: string;
}