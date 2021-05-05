import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  @Output() added: EventEmitter<any> = new EventEmitter();

  constructor() { }

  //add class to db
  addClass(name: string, desc: string) {
    //this.cToAdd= Class(name, desc);
    alert("Class to add: " + "\n{\nName: " + name + "\nDesc: " + desc + "\n}\n" );
    this.added.emit();
  }

  ngOnInit(): void {
  }

}
