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

    this.capacity = this._dbService.getNumberMembersCheckedIn();
    

    this.revenue = this._dbService.getTotalRevenue();
  }

}
