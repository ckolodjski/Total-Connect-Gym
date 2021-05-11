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
    
    this.sd = parseInt(day) as Day;
    alert("slected day is " + this.sd);
    //get classes on the one day 
    this.schedule.forEach( (element) => {
      if(element.Day == this.sd) {
        this.classesOnDay.push(element);
        alert("int lambda");
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

    if(isSome(res)) {

      res.value.forEach( (gc) => {
        this.gcAdd = {ClassInformation: gc.ClassInformation, Day: gc.Day, StartTime: gc.StartTime, EndTime: gc.EndTime, ClassInstanceId: gc.ClassInstanceId};
      });
      //for( var gc  in res) {
        //this.gcAdd = {ClassInformation: gc.}
        //this.schedule.push(gc);
        //console.log(gc.toString());
      //}
    } else {
      console.log("res got goofed or is empty");
    }
  }

  ngOnInit(): void {
    this.getSchedule();
  }

}
