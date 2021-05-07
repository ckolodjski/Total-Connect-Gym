import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { async } from 'rxjs';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-remove-membership',
  templateUrl: './remove-membership.component.html',
  styleUrls: ['./remove-membership.component.css']
})
export class RemoveMembershipComponent implements OnInit {
  
  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor(private dbService: DatabaseService) { }
  remMessage: string = "";

  
  async removeMembership(id: string) {
    var res = await this.dbService.removeMembershipLevel(id);
    if (res) {
      this.remMessage = "Membership level removed successfully!";
    } else {
      this.remMessage = "Membership level not remove. Seek bomb.";
    }
    alert(this.remMessage);
    this.remove.emit();
  }



  // async addMembership(name: string, price: number) {
  //   this.addMem = {Name: name, Price: price, UniqueID: uuidv4().toString()}
  //   var res = await this.dbService.addMembershipLevel(this.addMem);
  //   if (res) {
  //     this.addMessage = "Membership level added successfully!";
  //   } else {
  //     this.addMessage = "Membership level not added. Seek shelter.";
  //   }
  //   this.added.emit();
  //   alert(this.addMessage);
  // }
  ngOnInit(): void {
  }

}
