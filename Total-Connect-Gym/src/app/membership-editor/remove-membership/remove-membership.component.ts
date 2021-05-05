import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-remove-membership',
  templateUrl: './remove-membership.component.html',
  styleUrls: ['./remove-membership.component.css']
})
export class RemoveMembershipComponent implements OnInit {
  
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() { }
  
  //remove class
  // need to make this input as a class???
  removeMembership(c: string) {
    alert("Class to remove is " + c + "\n MAKE SURE YOU ARE SURE")
    //this.showRemoveCard = !this.showRemoveCard;
    console.log("class removed: " + c);
    this.remove.emit();
  }
  ngOnInit(): void {
  }

}
