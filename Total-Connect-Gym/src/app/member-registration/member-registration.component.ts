import { Component, OnInit } from '@angular/core';
import { MembershipLevel } from '../data-types/membership';
import { DatabaseService } from '../database.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-member-registration',
  templateUrl: './member-registration.component.html',
  styleUrls: ['./member-registration.component.css']
})
export class MemberRegistrationComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }
  addMem: MembershipLevel;

  addMembershipLevel(name: string, price: number) {
    this.addMem = {Name: name, Price: price, UniqueID: uuidv4()}
  }
  ngOnInit(): void {
  }

}
