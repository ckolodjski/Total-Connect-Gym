import { Component, OnInit } from '@angular/core';
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
    
    this.capacity = await this._dbService.getNumberMembersCheckedIn();
    this.capacity = this.capacity / 200;

    this.revenue = await this._dbService.getTotalRevenue();
  }

}
