import { v4 as uuid } from 'uuid';

//Represents a class offered by the gym.
export class Course {
    Name: string;
    Description: string;

    //The overall ID for a offered course. 
    //Not to be confused with the ClassID on the ScheduledGymClass as this represents the overall course while the ScheduledGymClass represents a specific instance of the course.
    CourseID: string;

    constructor(name: string, description: string = "No class description was registered.") {
        this.Name = name;
        this.Description = description;
        this.CourseID = uuid();
    }
}