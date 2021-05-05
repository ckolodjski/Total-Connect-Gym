import { Component, OnInit } from '@angular/core';
//import { Class } from '../models/class.model';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-class-editor',
  templateUrl: './class-editor.component.html',
  styleUrls: ['./class-editor.component.css']
})
export class ClassEditorComponent implements OnInit {
  ////cToAdd: Class;
  showAddCard: boolean = false;
  showRemoveCard: boolean = false;
  //constructor() { }
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
      alert("searched for " + c + "\n need to do db stuff here like the Tour of Heroes")
  }
  
  ngOnInit(): void {
  }

}
