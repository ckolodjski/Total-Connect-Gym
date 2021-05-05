import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Course } from './data-types/course';
import { isNone, none, Option, some } from 'fp-ts/Option/';
import { GymClass } from './data-types/gym-class';
import { Day } from './data-types/day-of-week';
import { v4 as uuid } from 'uuid';
import { MembershipLevel } from './data-types/membership';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  fireDatabaseProvidor: AngularFirestore;
  private readonly _courseRosterDocument: string = "courseRosterDocument";
  private readonly _classScheduleDocument: string = "classScheduleDocument";
  private readonly _membershipLevelsDocument: string = "membershipLevelsDocument";

  private readonly stretchingCourse: Course = { Name: "Stretching I", Description: "A basic stretching course for beginners.", CourseID: uuid() };
  private readonly weightliftingCourse: Course = { Name: "Weightlifting I", Description: "A beginner's weightlifting course.", CourseID: uuid() };
  private readonly stretchClass: GymClass = { ClassInformation: this.stretchingCourse, Day: Day.MONDAY, StartTime: new Date(Date.now()), EndTime: new Date(Date.now()), ClassInstanceId: uuid() };
  private readonly premiumMembership: MembershipLevel = { Name: "Premium", Price: 649.99, UniqueID: uuid() }

  //https://firebase.google.com/docs/firestore/quickstart?authuser=1#web-v8_1
  constructor(fireDBModule: AngularFirestore) {
    this.fireDatabaseProvidor = fireDBModule;
    this.addFillerData();
    this.tempTest();
   }

  private async tempTest() {
    let test1 =  await this.getAllCourses();
    let test2 = await this.getScheduledClasses();
    let test3 = await this.searchCourseNames("lifting");
    let test4 = await this.dropCourse(this.stretchingCourse.CourseID);
    let test5 = await this.unscheduleClass(this.stretchClass.ClassInstanceId);
    let test6 = await this.addMembershipLevel(this.premiumMembership);
    let test7 = await this.getMembershipLevels();
    let test8 = await this.removeMembershipLevel(this.premiumMembership.UniqueID);
    let i = 0;
  }

  private addFillerData() {
    this.registerCourse(this.stretchingCourse);
    this.registerCourse(this.weightliftingCourse);
    this.scheduleClass(this.stretchClass);
  }

  //Adds a document to a collection.
  private async addData<T>(data: T, collection: string, docID: string, errorMessage: string): Promise<boolean> {
    let success = await this.fireDatabaseProvidor.collection(collection).doc(docID).set(data)
      .then((docRef) => true)
      .catch((error) => {
        console.error(`${errorMessage}: ${error}`);
        return false;
      })
    return success;
  }

  //Deletes a document from a collection
  private async deleteData(collection: string, documentID: string, errorMessage: string): Promise<boolean> {
    let success = await this.fireDatabaseProvidor.collection(collection).doc(documentID).delete()
      .then(() => true)
      .catch((error) => {
        console.error(`${errorMessage}: ${error}`);
        return false;
      });
      return success;
  }

  //Gets all documents in a collection as a specific data type.
  private async getData<T>(collection: string, errorMessage: string): Promise<Option<T[]>> {
    let ret = await this.fireDatabaseProvidor.collection(collection).get().toPromise()
      .then((querySnapshot) => {
        let objects: T[] = querySnapshot.docs.map((object) => {
          return object.data() as T;
        });

        if (objects && objects.length > 0)
          return some(objects);
        return none;
      })
      .catch((error) => {
        console.error(`${errorMessage}: ${error}`);
        return none;
      });
      return ret;
  }

   //Adds a class to the database. Requires class names to be unique.
   //Returns true if the operation was successful.
   async registerCourse(course: Course): Promise<boolean> {
     return await this.addData(course, this._courseRosterDocument, course.CourseID, "Error adding a course");
   }

   //Attempts to remove a course from the list of available courses.
   //Returns true if the operation was successful.
   async dropCourse(courseID: string): Promise<boolean> {
    return await this.deleteData(this._courseRosterDocument, courseID, "Error removing a course");
   }

   //Gets all registered courses.
   //Returns Some<Course[]> if there are courses, or None if there are no results or an error occurs.
   async getAllCourses(): Promise<Option<Course[]>> {
     return await this.getData(this._courseRosterDocument, "Error getting all registered courses");
   }

   //Searches for the specified class by name.
   //Returns Some<Course[]> if any results are found, or None if no results are found.
   async searchCourseNames(searchName: string): Promise<Option<Course[]>> {
    if (!searchName || searchName.trim().length == 0)
      return none;

    let allCourses = await this.getAllCourses();
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
   async getScheduledClasses(): Promise<Option<GymClass[]>> {
    return await this.getData(this._classScheduleDocument, "Error getting all scheduled classes");
   }

   //Schedules a class in the specified day and time slot.
   //Returns true if the operation was successful.
   async scheduleClass(gymClass: GymClass): Promise<boolean> {
     return await this.addData(gymClass, this._classScheduleDocument, gymClass.ClassInstanceId, "Error scheduling a course");
   }

   //Unschedules a class.
   //Returns true if the operation was successful.
   async unscheduleClass(classID: string): Promise<boolean> {
    return await this.deleteData(this._classScheduleDocument, classID, "Error removing class");
   }

   //Adds a membership level.
   //Returns true if the operation was successful.
   async addMembershipLevel(membershipLevel: MembershipLevel): Promise<boolean> {
     return await this.addData(membershipLevel, this._membershipLevelsDocument, membershipLevel.UniqueID, "Error adding a membership level");
   }

   //Gets all membership levels.
   //Returns Some<MembershipLevel[]> if there are memberships, or None if there are no memberships.
   async getMembershipLevels(): Promise<Option<MembershipLevel[]>> {
     return await this.getData(this._membershipLevelsDocument, "Error getting membership levels");
   }

   //Removes a membership level.
   //Returns true if the operation was a success.
   async removeMembershipLevel(membershipLevelID: string): Promise<boolean> {
     return await this.deleteData(this._membershipLevelsDocument, membershipLevelID, "Error removing membership level");
   }
}