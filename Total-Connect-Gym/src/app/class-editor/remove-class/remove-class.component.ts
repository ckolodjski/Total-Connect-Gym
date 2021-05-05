import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove-class',
  templateUrl: './remove-class.component.html',
  styleUrls: ['./remove-class.component.css']
})
export class RemoveClassComponent implements OnInit {

  constructor() { }

  removeClass(c: string) {
    alert("Class to remove is " + c + "\n MAKE SURE YOU ARE SURE")
    //this.showRemoveCard = !this.showRemoveCard;
    console.log("class removed: " + c);
  }

  ngOnInit(): void {
  }

}
