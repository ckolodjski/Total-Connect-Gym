import { Component, OnInit } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
import { GymMember } from 'src/app/data-types/member';
import { MembershipLevel } from 'src/app/data-types/membership';
import { DatabaseService } from 'src/app/database.service';
import { v4 as uuidv4} from 'uuid';
@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  gmAdd: GymMember;
  gmLev: MembershipLevel = {Name: "Default", Price: 99.99, UniqueID: "10dec15f-8056-4bc1-ac1e-4e7e33e43a3b"};
  async addMember(name: string, db: string, lev: string) {
    this.gmAdd = {Name: name, DateOfBirth: new Date(), MembershipLevel: 
      this.gmLev, CurrentlyCheckedIn: false, UniqueID: uuidv4().toString()};
    var res = await this.dbService.addGymMember(this.gmAdd);
    if (res) {
      alert("added member")
    } else {
      alert("failed to add member")
    }
  }


  // async getLevel(id: string): Promise<MembershipLevel> {
  //   var res = await this.dbService.getMembershipLevels();
  //   if (isSome(res)) {
  //     //find my membership in res
      
  //   }
  // }
  ngOnInit(): void {
  }

}
