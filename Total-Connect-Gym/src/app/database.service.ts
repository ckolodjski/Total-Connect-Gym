import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Course } from './data-types/course';
import { isNone, none, Option, some } from 'fp-ts/Option/';
import { GymClass } from './data-types/gym-class';
import { Day } from './data-types/day-of-week';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  fireDatabaseProvidor: AngularFirestore;
  private _courseRosterDocument: string = "courseRosterDocument";
  private _classScheduleDocument: string = "classScheduleDocument";

  private stretchingCourse: Course = { Name: "Stretching I", Description: "A basic stretching course for beginners.", CourseID: uuid() };
  private weightliftingCourse: Course = { Name: "Weightlifting I", Description: "A beginner's weightlifting course.", CourseID: uuid() };
  private stretchClass: GymClass = { ClassInformation: this.stretchingCourse, Day: Day.MONDAY, StartTime: new Date(Date.now()), EndTime: new Date(Date.now()), ClassInstanceId: uuid() };


  //https://firebase.google.com/docs/firestore/quickstart?authuser=1#web-v8_1
  constructor(fireDBModule: AngularFirestore) {
    this.fireDatabaseProvidor = fireDBModule;
    this.addFillerData();
    this.tempTest();
   }

  private tempTest() {
    let test1 =  this.getAllCourses();
    let test2 = this.getScheduledClasses();
    let test3 = this.searchCourseNames("lifting");
    let test4 = this.dropCourse(this.stretchingCourse.CourseID);
    let test5 = this.unscheduleClass(this.stretchClass.ClassInstanceId);
  }

  private addFillerData() {
    this.registerCourse(this.stretchingCourse);
    this.registerCourse(this.weightliftingCourse);
    this.scheduleClass(this.stretchClass);
  }

   //Adds a class to the database. Requires class names to be unique.
   //Returns true if the operation was successful.
   registerCourse(course: Course): boolean {
      this.fireDatabaseProvidor.collection(this._courseRosterDocument).doc(course.CourseID).set(course)
        .then((docRef) => true)
        .catch((error) => {
          console.error(`Error adding a course: ${error}`);
          return false;
        });

      return this._promiseFalseError();
   }

   //Attempts to remove a course from the list of available courses.
   //Returns true if the operation was successful.
   dropCourse(courseID: string): boolean {
    this.fireDatabaseProvidor.collection(this._courseRosterDocument).doc(courseID).delete()
      .then(() => true)
      .catch((error) => {
        console.error(`Error removing a course: ${error}`);
        return false;
      });

      return this._promiseFalseError();
   }

   //Gets all registered courses.
   //Returns Some<Course[]> if there are courses, or None if there are no results or an error occurs.
   getAllCourses(): Option<Course[]> {
     this.fireDatabaseProvidor.collection(this._courseRosterDocument).get().toPromise()
      .then((querySnapshot) => {
        let courses: Course[] = querySnapshot.docs.map((course) => {
          let courseData = course.data();
          console.log(`Fetched course object: ${courseData}`);
          return null;//TODO: Transform this into a Course object
        });

        if (courses && courses.length > 0)
          return some(courses);
        return none;
      })
      .catch((error) => {
        console.error(`Error getting all registered courses: ${error}`);
        return none;
      });

      return this._promiseNoneError();
   }

   //Searches for the specified class by name.
   //Returns Some<Course[]> if any results are found, or None if no results are found.
   searchCourseNames(searchName: string): Option<Course[]> {
    if (!searchName || searchName.trim().length == 0)
      return none;

    let allCourses = this.getAllCourses();
    if (isNone(allCourses))
      return none;

    let searchResults = allCourses.value.filter((course) => {
      return course.Name.toLowerCase().includes(searchName.toLowerCase());
    });

    if (searchResults && searchResults.length > 0)
      return some(searchResults);
    return none;
   }

   //Gets all scheduled classes.
   //Returns Some<GymClass[]> if any results are retrieved, or None if no results are retrieved or an error occurs.
   getScheduledClasses(): Option<GymClass[]> {
    this.fireDatabaseProvidor.collection(this._classScheduleDocument).get().toPromise()
      .then((querySnapshot) => {
        let classes: GymClass[] = querySnapshot.docs.map((gymClass) => {
          let classData = gymClass.data();
          console.log(`Fetched scheduled class object: ${classData}`);
          return null;//TODO: Transform this into a GymClass object
        });

        if (classes && classes.length > 0)
          return some(classes);
        return none;
      })
      .catch((error) => {
        console.error(`Error getting all scheduled classes: ${error}`);
        return none;
      });
      return this._promiseNoneError();
   }

   //Schedules a class in the specified day and time slot.
   //Returns true if the operation was successful.
   scheduleClass(gymClass: GymClass): boolean {
    this.fireDatabaseProvidor.collection(this._classScheduleDocument).doc(gymClass.ClassInstanceId).set(gymClass)
      .then((docRef) => true)
      .catch((error) => {
        console.error(`Error scheduling course: ${error}`);
        return false;
      });
      return this._promiseFalseError();
   }

   //Unschedules a class.
   //Returns true if the operation was successful.
   unscheduleClass(classID: string): boolean {
    this.fireDatabaseProvidor.collection(this._classScheduleDocument).doc(classID).delete()
      .then(() => { return true })
      .catch((error) => {
        console.error(`Error unscheduling class: ${error}`);
        return false;
      });
      return this._promiseFalseError();
   } 

   //Returns false after printing an error message.
   private _promiseFalseError(): boolean {
    console.error("Error with promise: We shouldn't get to here!");
    return false;
   }

   private _promiseNoneError<T>(): Option<T> {
    console.error("Error with promise: We shouldn't get to here!");
    return none;
   }
}