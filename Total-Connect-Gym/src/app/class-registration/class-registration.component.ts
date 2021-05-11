import { Component, OnInit } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
import { Day } from '../data-types/day-of-week';
import { GymClass } from '../data-types/gym-class';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-class-registration',
  templateUrl: './class-registration.component.html',
  styleUrls: ['./class-registration.component.css']
})
export class ClassRegistrationComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }
  gcAdd: GymClass;
  schedule: GymClass[] = []; 
  classesOnDay: GymClass[] = [];
  sd: Day;
  headers = [ "Name: ", "Description: ", "Start Time: ", "End Time:", "ID: "]

  updateTable(day: string) {
    //this.getSchedule();
    this.classesOnDay = [];
    this.sd = parseInt(day) as Day;
    //alert("slected day is " + this.sd);
    //get classes on the one day 
    //alert("size of schedule is " + this.schedule.length);
    this.schedule.forEach( (element) => {
      if(element.Day == this.sd) {
        this.classesOnDay.push(element);
        //alert("int lambda");
      }
    });
    
    
  }
  
  signUp(mID: string, gcID: string) {
    //this is where logic would go if we had it to sign up a member
    // you would add mem id to rost of gymclasses
    //for now we will alert that they were added 
    alert("Member would be added!");
  }
  async getSchedule() {
    var res = await this.dbService.getScheduledClasses();
    //alert("get schedule called");
    if(isSome(res)) {
      //alert("res is some true");
      res.value.forEach( (gc) => {
        //alert("this is gc to string: " + gc.ClassInformation);
        this.gcAdd = {ClassInformation: gc.ClassInformation, Day: gc.Day, StartTime: gc.StartTime, EndTime: gc.EndTime, ClassInstanceId: gc.ClassInstanceId};
        this.schedule.push(this.gcAdd);
      });
      
    } else {
      console.log("res got goofed or is empty");
    }
  }

  ngOnInit(): void {
    this.getSchedule();
  }

}
