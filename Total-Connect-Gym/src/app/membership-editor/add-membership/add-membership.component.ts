import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MembershipLevel } from 'src/app/data-types/membership';
import { DatabaseService } from 'src/app/database.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-membership',
  templateUrl: './add-membership.component.html',
  styleUrls: ['./add-membership.component.css']
})
export class AddMembershipComponent implements OnInit {


  @Output() added: EventEmitter<any> = new EventEmitter();
  constructor(private dbService: DatabaseService) { }
  addMem: MembershipLevel;
  addMessage: string = "";

  //add class to db
  async addMembership(name: string, price: number) {
    this.addMem = {Name: name, Price: price, UniqueID: uuidv4().toString()}
    var res = await this.dbService.addMembershipLevel(this.addMem);
    if (res) {
      this.addMessage = "Membership level added successfully!";
    } else {
      this.addMessage = "Membership level not added. Seek shelter.";
    }
    this.added.emit();
    alert(this.addMessage);
  }

  ngOnInit(): void {
  }

}
