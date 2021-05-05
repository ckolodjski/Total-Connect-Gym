import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-remove-class',
  templateUrl: './remove-class.component.html',
  styleUrls: ['./remove-class.component.css']
})
export class RemoveClassComponent implements OnInit {

  @Output() remove: EventEmitter<any> = new EventEmitter();

  constructor() { }

  removeClass(c: string) {
    alert("Class to remove is " + c + "\n MAKE SURE YOU ARE SURE")
    //this.showRemoveCard = !this.showRemoveCard;
    console.log("class removed: " + c);
    this.remove.emit();
  }

  ngOnInit(): void {
  }

}
