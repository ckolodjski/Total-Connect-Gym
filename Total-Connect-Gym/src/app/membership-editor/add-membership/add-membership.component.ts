import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-membership',
  templateUrl: './add-membership.component.html',
  styleUrls: ['./add-membership.component.css']
})
export class AddMembershipComponent implements OnInit {


  @Output() added: EventEmitter<any> = new EventEmitter();
  constructor() { }

  //add class to db
  addMembership(name: string, price: string) {
    //this.cToAdd= Class(name, desc);
    alert("Mem to add: " + "\n{\nName: " + name + "\nPrice: " + price + "\n}\n" );
    this.added.emit();
  }

  ngOnInit(): void {
  }

}
