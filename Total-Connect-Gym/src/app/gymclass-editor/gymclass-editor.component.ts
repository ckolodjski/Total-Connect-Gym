import { Component, OnInit } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
import { Course } from '../data-types/course';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-gymclass-editor',
  templateUrl: './gymclass-editor.component.html',
  styleUrls: ['./gymclass-editor.component.css']
})
export class GymclassEditorComponent implements OnInit {


  showListClasses: boolean = true;

  courses: Course[];
  constructor(private dbService: DatabaseService) { }


  async fetchClasses() {
    var res = await this.dbService.getAllCourses();
    if (isSome(res)) {
      this.courses = res.value;
    }
  }
  ngOnInit(): void {
    //var res = await this.dbService.getAllCourses()
    this.fetchClasses();
  }

}
