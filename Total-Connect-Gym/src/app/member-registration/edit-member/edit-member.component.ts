import { Component, OnInit } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
import { GymMember } from 'src/app/data-types/member';
import { DatabaseService } from 'src/app/database.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  mem: GymMember;

  async updateMem(mem_id, mem_Name, mem_DOB, mem_Level) {
    //fetch member with id
    var memres = await this.dbService.getGymMember(mem_id);
    //create gymmember, with id
    var newName = "";
    var newDOB = new Date();
    var mem_l = {Name: "this", Price: 99, UniqueID: uuidv4()};
    var checkin = false;
    if (isSome(memres)) {
      if((mem_Name != memres.value.Name) && (mem_Name != "")) {
        newName = mem_Name;
      } else {
        newName = memres.value.Name;
      }
      if((mem_DOB != memres.value.DateOfBirth) && (mem_DOB != "")) {
        newDOB = mem_DOB;
      } else {
        newDOB = memres.value.DateOfBirth;
      }
      if((mem_Level != memres.value.MembershipLevel.UniqueID) && (mem_Level != "")) {
        mem_l = await this.dbService.getMembershipLevel(mem_Level);
      } else {
        mem_l = memres.value.MembershipLevel;
      }
      checkin= memres.value.CurrentlyCheckedIn;
      //cast mem level to mem level
      this.mem = {Name: newName, DateOfBirth: newDOB, 
        MembershipLevel: mem_l, CurrentlyCheckedIn: checkin,  UniqueID: mem_id};
      var res = await this.dbService.updateGymMember(mem_id, this.mem );
    }
  }

  

  ngOnInit(): void {
  }

}
