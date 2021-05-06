import { Component, OnInit } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
import { createThisTypeNode } from 'typescript';
import { Course } from '../data-types/course';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-list-classes',
  templateUrl: './list-classes.component.html',
  styleUrls: ['./list-classes.component.css']
})
export class ListClassesComponent implements OnInit {

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
