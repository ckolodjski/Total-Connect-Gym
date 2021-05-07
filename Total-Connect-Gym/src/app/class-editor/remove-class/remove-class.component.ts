import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import { type } from 'node:os';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-remove-class',
  templateUrl: './remove-class.component.html',
  styleUrls: ['./remove-class.component.css']
})
export class RemoveClassComponent implements OnInit {

  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor(private dbService: DatabaseService) { }

  removeClass(c: string) {
    
    alert("Class to remove is " + c + "\n MAKE SURE YOU ARE SURE");
    var res = this.dbService.dropCourse(c);
    // if(res) {
    //   console.log("removed");
    // } 
    // else {
    //   console.log("fauiled");
    // }
    //this.showRemoveCard = !this.showRemoveCard;
    console.log("class removed: " + res);
    this.remove.emit();
  }

  ngOnInit(): void {
  }

}
