import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { Course } from './data-types/course';
import { none, Option, some } from 'fp-ts/Option/';
import { Day } from './data-types/day-of-week';
import { Time } from '@angular/common';
import { GymClass } from './data-types/gym-class';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  fireDatabaseProvidor: AngularFirestore;
  private _courseRosterDocument: string = "courseRosterDocument";
  private _classScheduleDocument: string = "classScheduleDocument";


  //https://firebase.google.com/docs/firestore/quickstart?authuser=1#web-v8_1
  constructor(fireDBModule: AngularFirestore) {
    this.fireDatabaseProvidor = fireDBModule;
    this.addFillerData();
   }

  private addFillerData() {
    this.registerCourse(new Course("Stretching I", "A basic stretching course for beginners."));
    this.registerCourse(new Course("Weightlifting I", "A beginner's weightlifting course"));
  }

   //Adds a class to the database. Requires class names to be unique.
   //Returns true if the operation was successful.
   registerCourse(course: Course): boolean {
      this.fireDatabaseProvidor.collection(this._courseRosterDocument).doc(course.CourseID).set(course)
        .then((docRef) => {
          return true;
        })
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
      .then(() => {
        return true;
      })
      .catch((error) => {
        console.error(`Error removing a course: ${error}`);
        return false;
      });

      return this._promiseFalseError();
   }

   //Gets all registered courses.
   //Returns Some<Course[]> if there are courses, or None otherwise.
   getAllCourses(): Option<Course[]> {
     this.fireDatabaseProvidor.collection(this._courseRosterDocument).get().toPromise()
      .then((querySnapshot) => {
        let courses: Course[] = querySnapshot.docs.map((course) => {
          let courseData = course.data();
          console.log(`Fetched course object: ${courseData}`);
          return null;//TODO: Transform this into a Course object
        });
        return some(courses);
      })
      .catch((error) => {
        console.error(`Error getting all registered courses: ${error}`);
        return none;
      });

      return this._promiseNoneError();
   }

   //Searches for the specified class by name.
   //Returns Some<GymClass[]> if any results are found, or None if no results are found.
   searchClassNames(searchName: string): Option<Course[]> {
    
   }

   //Schedules a class in the specified day and time slot.
   //Requires the class to be registered first.
   //Returns true if the operation was successful.
   scheduleClass(gymClass: GymClass) : boolean {

   }

   //Unschedules a class.
   //Returns true if the operation was successful.
   unscheduleClass(classID: string): boolean {

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