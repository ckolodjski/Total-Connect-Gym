import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Course } from './data-types/course';
import { isNone, isSome, none, Option, some } from 'fp-ts/Option/';
import { GymClass } from './data-types/gym-class';
import { MembershipLevel } from './data-types/membership';
import { GymMember } from './data-types/member';
import { GymEmployee } from './data-types/employee';
import { v4 as uuid } from 'uuid';
import { member } from 'fp-ts/lib/Map';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private readonly _fireDatabaseProvidor: AngularFirestore;
  private readonly _courseRosterDocument: string = "courseRosterDocument";
  private readonly _classScheduleDocument: string = "classScheduleDocument";
  private readonly _membershipLevelsDocument: string = "membershipLevelsDocument";
  private readonly _gymMembersDocument: string = "gymMembersDocument";
  private readonly _employeesDocument: string = "employeesDocument";

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
    try {
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
    } catch (error) {
      console.error(error);
      return none;
    }
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

   //Returns true if the gym member exists, or false if an error occurred or the gym member does not exist.
   private async doesGymMemberExist(memberID: string) : Promise<boolean> {
    let members = await this.getGymMember(memberID);
    return isSome(members);
   }

   //Removes a gym member.
   //Returns true if the operation was a success.
   async removeGymMember(memberID: string): Promise<boolean> {
    let memberExists = await this.doesGymMemberExist(memberID);
    if (memberExists)
      return await this.deleteData(this._gymMembersDocument, memberID, "Error removing a gym member");
    console.log(`Member does not exist: ${memberID}`);
    return false;
   }

   //Updates a gym member.
   //Returns true if the operation was a success.
   async updateGymMember(memberID: string, replacementData: GymMember): Promise<boolean> {
    let memberExists = await this.doesGymMemberExist(memberID);
    if (memberExists)
     return await this.updateDocument(this._gymMembersDocument, memberID, replacementData, "Error updating gym member information");
    console.log(`Member does not exist: ${memberID}`);
    return false;
   }

   //Gets all gym members.
   //Returns Some<GymMember[]> if any results are retrieved, or None if no results are retrieved or an error occurs.
   async getGymMembers(): Promise<Option<GymMember[]>> {
    return await this.getData(this._gymMembersDocument, "Error getting all gym members");
   }

   //Gets a specific gym member.
   //Returns Some<GymMember> if the gym member was retrieved, or None if the gym member was not found or an error occurs.
   async getGymMember(uniqueMemberID: string): Promise<Option<GymMember>> {
    let members = await this.getGymMembers();
    if (isNone(members))
      return none;
    
    let targetMember = members.value.find((member) => member.UniqueID == uniqueMemberID);
    if (targetMember)
      return some(targetMember);
    return none;
   }
  
  //Sets the checkin status of a member.
  //Returns true if the operation was successful.
  private async setMemberCheckInStatus(memberID: string, status: boolean) : Promise<boolean> {
    let targetMember = await this.getGymMember(memberID);
    if (isNone(targetMember)) {
      console.error(`Gym member doesn't exist: ${memberID}`);
      return false;
    }

    targetMember.value.CurrentlyCheckedIn = status;
    return await this.updateGymMember(targetMember.value.UniqueID, targetMember.value);
  }

  //Checks a gym member into the gym.
  //Returns true if the operation was a success.
  async checkInMember(memberID: string): Promise<boolean> {
    return await this.setMemberCheckInStatus(memberID, true);
  }

  //Checks a gym member out of the gym.
  //Returns true if the operation was a success.
  async checkOutMember(memberID: string): Promise<boolean> {
    return await this.setMemberCheckInStatus(memberID, false);
  }

   //Gets all gym employees.
   //Returns Some<GymEmployee[]> if any results are retrieved, or None if no results are retrieved or an error occurs.
   async getGymEmployees(): Promise<Option<GymEmployee[]>> {
    return await this.getData(this._employeesDocument, "Error getting gym employees");
   }

   //Adds a gym employee.
   //Returns true if the operation was successful.
   async addGymEmployee(employee: GymEmployee): Promise<boolean> {
     return await this.addData(employee, this._employeesDocument, employee.UniqueID, "Error adding gym employee");
   }

   //Removes a gym employee.
   //Returns true if the operation was successful.
   async removeGymEmployee(employeeID: string): Promise<boolean> {
     return await this.deleteData(this._employeesDocument, employeeID, "Error removing an employee");
   }

   //Gets a specific employee.
   //Returns Some<GymEmployee> if the operation was successful, or none if the employee was not retrieved.
   private async getEmployee(employeeID: string): Promise<Option<GymEmployee>> {
    let employees = await this.getGymEmployees();
    if (isNone(employees))
      return none;

    let targetEmployee = employees.value.find((employee) => employee.UniqueID == employeeID);
    if (targetEmployee)
      return some(targetEmployee);
    else {
      console.error(`Error getting a specific employee: ${employeeID}`);
      return none;
    }
   }

  //Sets the clock in or clock out status of an employee.
  //Returns true if the operation was successful.
  private async setEmployeeClockStatus(employeeID: string, status: boolean): Promise<boolean> {
    let employee = await this.getEmployee(employeeID);
    if (isNone(employee))
      return false;
    
    employee.value.CurrentlyClockedIn = status;
    return await this.updateDocument(this._employeesDocument, employee.value.UniqueID, employee.value, "Error updating employee clock status");
  }

  //Clock in an employee.
  //Returns true if the operation was a success.
  async clockInEmployee(employeeID: string): Promise<boolean> {
    return await this.setEmployeeClockStatus(employeeID, true);
  }

  //Clock out an employee.
  //Returns true if the operation was a success.
  async clockOutEmployee(employeeID: string): Promise<boolean> {
    return await this.setEmployeeClockStatus(employeeID, false);
  }

  //Get hours worked for an employee.
  //Returns Some<HoursWorked> if the operation was a success, or none if the operation was unsuccessful.
  async getHoursWorked(employeeID: string): Promise<Option<number>> {
    let employee = await this.getEmployee(employeeID);
    if (isNone(employee))
      return none;
    return some(employee.value.HoursWorked);
  }

  //Set hours worked for an employee.
  //Returns true if the operation was a success.
  async setHoursWorked(employeeID: string, hours: number): Promise<boolean> {
    let employee = await this.getEmployee(employeeID);
    if (isNone(employee))
      return false;

    employee.value.HoursWorked = hours;
    return await this.updateDocument(this._employeesDocument, employee.value.UniqueID, employee.value, "Error setting employee's hours worked");
  }

  //Gets the number of members currently checked into the gym.
  //Returns Some<MembersCheckedIn> if the operation is successful.
  async getNumberMembersCheckedIn(): Promise<Option<number>> {
    let members = await this.getGymMembers();
    if (isNone(members))
      return none;

    let checkedInCount: number = 0;
    members.value.forEach((member) => {
      if (member.CurrentlyCheckedIn)
        checkedInCount++;
    });
    return some(checkedInCount);
  }

  //Gets the total monetary value of all the memberships being paid for.
  //Returns Some<TotalRevenue> if the operation is successful.
  async getTotalRevenue(): Promise<Option<number>> {
    let members = await this.getGymMembers();
    if (isNone(members))
      return none;
    
    let revenue: number = 0;
    members.value.forEach((member) => {
      revenue += member.MembershipLevel.Price;
    });
    return some(revenue);
  }
}