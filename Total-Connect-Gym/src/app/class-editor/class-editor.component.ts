import { Component, OnInit } from '@angular/core';
import { Option } from 'fp-ts/lib/Option';
import { Course } from '../data-types/course';
//import { Class } from '../models/class.model';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-class-editor',
  templateUrl: './class-editor.component.html',
  styleUrls: ['./class-editor.component.css']
})
export class ClassEditorComponent implements OnInit {
  
  showAddCard: boolean = false;
  showRemoveCard: boolean = false;
  searchResult: Course;
  courses: Course[] = [];
  private _dbService: DatabaseService;
  constructor(dbService: DatabaseService) {
    this._dbService = dbService;
   }

  addButtonClick() { 
    if (this.showRemoveCard){ this.showRemoveCard = false; }
    this.showAddCard = !this.showAddCard;
  }
  removeButtonClick() { 
    if (this.showAddCard){ this.showAddCard = false; }
    this.showRemoveCard = !this.showRemoveCard;
  }
  //fetch class list, search
  // string should be fine for searching
  searchClass(c: string) {
    var res = this._dbService.searchCourseNames(c);
    console.log(res); //nothing shown
  }
  
  ngOnInit(): void {
  }

}
