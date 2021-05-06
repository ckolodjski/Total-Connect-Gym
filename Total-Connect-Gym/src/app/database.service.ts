import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Course } from './data-types/course';
import { isNone, none, Option, some } from 'fp-ts/Option/';
import { GymClass } from './data-types/gym-class';
import { MembershipLevel } from './data-types/membership';
import { GymMember } from './data-types/member';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly _fireDatabaseProvidor: AngularFirestore;
  private readonly _courseRosterDocument: string = "courseRosterDocument";
  private readonly _classScheduleDocument: string = "classScheduleDocument";
  private readonly _membershipLevelsDocument: string = "membershipLevelsDocument";
  private readonly _gymMembersDocument: string = "gymMembersDocument";

  constructor(fireDBModule: AngularFirestore) {
    this._fireDatabaseProvidor = fireDBModule;
   }

  //Adds a document to a collection.
  private async addData<T>(data: T, collection: string, docID: string, errorMessage: string): Promise<boolean> {
    let success = await this._fireDatabaseProvidor.collection(collection).doc(docID).set(data)
      .then((docRef) => true)
      .catch((error) => {
        console.error(`${errorMessage}: ${error}`);
        return false;
      })
    return success;
  }

  //Deletes a document from a collection
  private async deleteData(collection: string, documentID: string, errorMessage: string): Promise<boolean> {
    let success = await this._fireDatabaseProvidor.collection(collection).doc(documentID).delete()
      .then(() => true)
      .catch((error) => {
        console.error(`${errorMessage}: ${error}`);
        return false;
      });
      return success;
  }

  //Gets all documents in a collection as a specific data type.
  private async getData<T>(collection: string, errorMessage: string): Promise<Option<T[]>> {
    let ret = await this._fireDatabaseProvidor.collection(collection).get().toPromise()
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

  //Updates a document in the specified collection.
  private async updateDocument<T>(collection: string, documentID: string, newData: T, errorMessage: string): Promise<boolean> {
    let success = await this._fireDatabaseProvidor.collection(collection).doc(documentID).update(newData)
      .then(() => true)
      .catch((error) => {
        console.error(`${errorMessage}: ${error}`);
        return false;
      });
    return success;
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

   //Adds a new gym member.
   //Returns true if the operation was a success.
   async addGymMember(member: GymMember): Promise<boolean> {
     return await this.addData(member, this._gymMembersDocument, member.UniqueID, "Error adding a new gym member");
   }

   //Removes a gym member.
   //Returns true if the operation was a success.
   async removeGymMember(memberID: string): Promise<boolean> {
    return await this.deleteData(this._gymMembersDocument, memberID, "Error removing a gym member");
   }

   //Updates a gym member.
   //Returns true if the operation was a success.
   async updateGymMember(memberID: string, replacementData: GymMember): Promise<boolean> {
     return await this.updateDocument(this._gymMembersDocument, memberID, replacementData, "Error updating gym member information");
   }

  //! TODO member check-in & time clock functionality
  //! TODO verify the memberID entered by the client is a valid member UUID
  //! TODO figure out how to identify employees? unsure of how we're doing this
  //Checks a gym member into the gym.
  //Returns true if the operation was a success.
  async checkInMember(memberID: string): Promise<boolean> {
    return;
  }

  //Checks a gym member out of the gym.
  //Returns true if the operation was a success.
  async checkOutMember(memberID: string): Promise<boolean> {
    return;
  }

  //Clock in an employee.
  //Returns true if the operation was a success.
  async clockInEmployee(employeeID: string): Promise<boolean> {
    return;
  }

  //Clock out an employee.
  //Returns true if the operation was a success.
  async clockOutEmployee(employeeID: string): Promise<boolean> {
    return;
  }

  //Get hours worked for an employee.
  //Returns true if the operation was a success.
  async getHoursWorked(employeeID: string): Promise<boolean> {
    return;
  }

  //Set hours worked for an employee.
  //Returns true if the operation was a success.
  async setHoursWorked(employeeID: string, hours: number): Promise<boolean> {
    return;
  }
  //! end unfinished block
}