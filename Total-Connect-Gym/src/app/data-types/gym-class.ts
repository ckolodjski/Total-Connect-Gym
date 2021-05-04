import { Time } from "@angular/common";
import { Day } from "./day-of-week";
import { Course } from "./gym-class";
import { v4 as uuid } from 'uuid';

//Represents a class that is on the gym's offered classes schedule.
export class GymClass {
    ClassInformation: Course;
    Day: Day;
    StartTime: Time;
    EndTime: Time;

    //The unique ID for the class that represents a specific day and time of a course.
    ClassInstanceId: string;

    constructor(classInformation: Course, day: Day, startTime: Time, endTime: Time) {
        this.ClassInformation = classInformation;
        this.Day = day;
        this.StartTime = startTime;
        this.EndTime = endTime;
        this.ClassInstanceId = uuid();
    }
}