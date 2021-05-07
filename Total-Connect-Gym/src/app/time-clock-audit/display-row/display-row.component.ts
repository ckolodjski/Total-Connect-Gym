import { Component, Input, OnInit } from '@angular/core';
import { GymEmployee } from 'src/app/data-types/employee';

@Component({
  selector: 'app-display-row',
  templateUrl: './display-row.component.html',
  styleUrls: ['./display-row.component.css']
})
export class DisplayRowComponent implements OnInit {

  @Input() employee: GymEmployee;
  @Input() id: number;
  first: string;
  last: string;

  constructor() { }

  ngOnInit(): void {
    this.first = this.employee.Name.split(" ")[0];
    this.last = this.employee.Name.split(" ")[1];
  }

}
