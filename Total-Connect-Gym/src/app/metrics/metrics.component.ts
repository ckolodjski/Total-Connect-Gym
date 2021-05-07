import { Component, OnInit } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  capacity;
  revenue;
  private _dbService: DatabaseService;
  constructor(dbService: DatabaseService) { 
    this._dbService = dbService;
  }

  ngOnInit(): void {
    this.thing();
  }

  async thing()  {
    
    let capObject = await this._dbService.getNumberMembersCheckedIn();
    if(isSome(capObject))
      this.capacity = capObject.value;

    this.capacity = this.capacity / 200;
    this.capacity += "%";

    let revObject = await this._dbService.getTotalRevenue();
    if (isSome(revObject))
      this.revenue = revObject.value;
    this.revenue = "$" + this.revenue;
  }
}