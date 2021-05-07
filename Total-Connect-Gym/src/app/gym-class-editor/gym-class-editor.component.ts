import { Component, OnInit } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
import { Course } from '../data-types/course';
import { Day } from '../data-types/day-of-week';
import { DatabaseService } from '../database.service';
import * as moment from 'moment';
import { GymClass } from '../data-types/gym-class';

@Component({
  selector: 'app-gym-class-editor',
  templateUrl: './gym-class-editor.component.html',
  styleUrls: ['./gym-class-editor.component.css']
})
export class GymClassEditorComponent implements OnInit {
  showListClasses: boolean = true;
  courseID: string;
  chosenDay: Day = Day.MONDAY;
  startTime: Date;
  endTime: Date;

  courses: Course[];
  constructor(private dbService: DatabaseService) { }


  async fetchClasses() {
    var res = await this.dbService.getAllCourses();
    if (isSome(res)) {
      this.courses = res.value;
    }
  }
  ngOnInit(): void {
    this.fetchClasses();
  }

  changeDay(day: Day): void {
    this.chosenDay = day;
    console.log(`Changed day to ${day}`);
  }

  startTimeChange(event) {
    if (event.currentTarget.value) {
      this.startTime = new Date(moment(event.currentTarget.value, "HH:mm").toString());
    }
  }

  endTimeChange(event) {
    if (event.currentTarget.value) {
      this.endTime = new Date(moment(event.currentTarget.value, "HH:mm").toString());
    }
  }

  courseIDChange(event) {
    this.courseID = event.currentTarget.value;
  }

  async attemptCreationOfClass() {
    if (this.startTime && this.endTime && this.courseID) {
      let success = await this.dbService.scheduleClassByID(this.courseID, this.chosenDay, this.startTime, this.endTime);
      alert("You successfully created a class");
    }
    else {
      alert("You failed to create a class due to your input values");
    }
  }
}
