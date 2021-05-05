import { v4 as uuid } from 'uuid';

//Represents a class offered by the gym.
export interface Course {
    Name: string;
    Description: string;

    //The overall ID for a offered course. This should be a uuid, which can be set by calling uuid() from the uuid lib.
    //Not to be confused with the ClassID on the ScheduledGymClass as this represents the overall course while the ScheduledGymClass represents a specific instance of the course.
    CourseID: string;
}