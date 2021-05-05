import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-class-editor',
  templateUrl: './class-editor.component.html',
  styleUrls: ['./class-editor.component.css']
})
export class ClassEditorComponent implements OnInit {
  private _dbService: DatabaseService;
  constructor(dbService: DatabaseService) {
    this._dbService = dbService;
   }

  ngOnInit(): void {
  }

}
