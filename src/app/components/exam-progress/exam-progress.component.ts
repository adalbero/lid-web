import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-progress',
  templateUrl: './exam-progress.component.html',
  styleUrls: ['./exam-progress.component.css']
})
export class ExamProgressComponent implements OnInit {

  constructor(public exam: ExamService) { }

  ngOnInit(): void {
  }

  getPercentage(x: number): string {
    const total = this.exam.total;
    const percentage = Math.floor((x / total) * 100);

    return `${x} of ${total} (${percentage}%)`;
  }
}
