import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Day3';
  students: { name: string; age: string }[] = [];

  getStudentData(data: any) {
    const studentData: { name: string; age: string } = data;
    if (studentData.name && studentData.age) {
      this.students.push(data);
    }
  }
}
