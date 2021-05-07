import { Component, OnInit } from '@angular/core';
import { isSome, Option, isNone } from 'fp-ts/lib/Option';
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
  showListClasses: boolean = false;
  searchResult: Course[];
  courses: Course[] = [];
  private _dbService: DatabaseService;
  constructor(dbService: DatabaseService) {
    this._dbService = dbService;
   }

  addButtonClick() { 
    if (this.showRemoveCard){ this.showRemoveCard = false; }
    if (this.showListClasses) {this.showListClasses = false; }
    this.showAddCard = !this.showAddCard;
  }
  removeButtonClick() { 
    if (this.showAddCard){ this.showAddCard = false; }
    if (this.showListClasses) {this.showListClasses = false; }
    this.showRemoveCard = !this.showRemoveCard;
  }

  listAllButtonClick() {
    if (this.showAddCard){ this.showAddCard = false; }
    if (this.showRemoveCard){ this.showRemoveCard = false; }
    this.showListClasses = !this.showListClasses;
  }
  
  ngOnInit(): void {
  }

}
