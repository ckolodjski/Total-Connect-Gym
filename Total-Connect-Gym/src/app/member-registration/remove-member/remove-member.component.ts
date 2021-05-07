import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-remove-member',
  templateUrl: './remove-member.component.html',
  styleUrls: ['./remove-member.component.css']
})
export class RemoveMemberComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }


  async removeMember(id: string) {
    var res = await this.dbService.removeGymMember(id);

    if (res) {
      alert("member is removed")
    } else {
      alert("member not removed. error.")
    }
  }

  ngOnInit(): void {
  }

}
