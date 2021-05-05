import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-editor',
  templateUrl: './class-editor.component.html',
  styleUrls: ['./class-editor.component.css']
})
export class ClassEditorComponent implements OnInit {

  showAddCard: boolean = false;
  showRemoveCard: boolean = false;
  constructor() { }

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
  //add class to db
  addClass(name: string, desc: string) {
    alert("Class to add: " + "\n{\nName: " + name + "\nDesc: " + desc + "\n}")
  }
  //remove class
  // need to make this input as a class???
  removeClass(c: string) {
    alert("Class to remove is " + c + "\n MAKE SURE YOU ARE SURE")
    this.showRemoveCard = !this.showRemoveCard;
    console.log("class removed: " + c);
  }
  ngOnInit(): void {
  }

}
