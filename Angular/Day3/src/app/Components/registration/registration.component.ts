import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  name = '';
  age = '';
  student = {};
  @Output() addEvent = new EventEmitter();
  addStudent() {
    if (
      !(
        this.name.length < 3 ||
        +this.age <= 20 ||
        +this.age >= 40 ||
        !+this.age
      )
    ) {
      const student: { name: string; age: string } = {
        name: this.name,
        age: this.age,
      };
      this.addEvent.emit(student);
    }
  }
}
