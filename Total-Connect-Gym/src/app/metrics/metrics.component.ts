import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})
export class MetricsComponent implements OnInit {
  capacity = "100";
  revenue = "$10";
  constructor() { }

  ngOnInit(): void {
  }

}
