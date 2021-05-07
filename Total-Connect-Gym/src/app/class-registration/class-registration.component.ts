import { Component, OnInit } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
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
  schedule: GymClass[]; 

  




  async getSchedule() {
    var res = await this.dbService.getScheduledClasses();

    if(isSome(res)) {
      for( var gc  in res) {
        //this.gcAdd = {ClassInformation: gc.}
        //this.schedule.push(gc);
        console.log(gc.toString());
      }
    } else {
      console.log("res got goofed or is empty");
    }
  }

  ngOnInit(): void {
    this.getSchedule();
  }

}
