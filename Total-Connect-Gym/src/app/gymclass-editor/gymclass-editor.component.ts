import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gymclass-editor',
  templateUrl: './gymclass-editor.component.html',
  styleUrls: ['./gymclass-editor.component.css']
})
export class GymclassEditorComponent implements OnInit {

  constructor() { }

  showListClasses: boolean = true;

  ngOnInit(): void {
  }

}
