import { Component, OnInit } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
import { Course } from '../data-types/course';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-gym-class-editor',
  templateUrl: './gym-class-editor.component.html',
  styleUrls: ['./gym-class-editor.component.css']
})
export class GymClassEditorComponent implements OnInit {
  showListClasses: boolean = true;

  courses: Course[];
  constructor(private dbService: DatabaseService) { }


  async fetchClasses() {
    var res = await this.dbService.getAllCourses();
    if (isSome(res)) {
      this.courses = res.value;
    } else {
      
    }
  }
  ngOnInit(): void {
    //var res = await this.dbService.getAllCourses()
    this.fetchClasses();
  }
}
