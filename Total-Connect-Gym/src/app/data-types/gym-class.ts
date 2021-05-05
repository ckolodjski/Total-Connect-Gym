import { Time } from "@angular/common";
import { Day } from "./day-of-week";
import { Course } from "./course";
import { v4 as uuid } from 'uuid';

//Represents a class that is on the gym's offered classes schedule.
export class GymClass {
    ClassInformation: Course;
    Day: Day;
    StartTime: Date;
    EndTime: Date;

    //The unique ID for the class that represents a specific day and time of a course.
    ClassInstanceId: string;

    constructor(classInformation: Course, day: Day, startTime: Date, endTime: Date) {
        this.ClassInformation = classInformation;
        this.Day = day;
        this.StartTime = startTime;
        this.EndTime = endTime;
        this.ClassInstanceId = uuid();
    }
}