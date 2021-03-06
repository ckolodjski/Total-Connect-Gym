import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { isSome } from 'fp-ts/lib/Option';
import { DatabaseService } from 'src/app/database.service';
import { Course } from '../../data-types/course';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {

  @Output() added: EventEmitter<any> = new EventEmitter();
  course:Course;
  
  constructor(private dbService: DatabaseService) { }

  //add class to db
  async addClass(name: string, desc: string) {
    var id = uuidv4();//Math.floor(Math.random() *(1000 - 1) + 1);
    this.course = {Name: name, Description: desc, CourseID: id.toString()};
    var is_added = await this.dbService.registerCourse(this.course);
    
    
    if (is_added) { 
      alert("Class was added: " + "\n{\nName: " + name + "\nDesc: " + desc + "\nID: " + this.course.CourseID + "}\n" );
    } else {
      alert("class was not added!");
    }
    
    this.added.emit();
  }

  ngOnInit(): void {
  }

}
