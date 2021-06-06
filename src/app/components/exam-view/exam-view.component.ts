import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css'],
})
export class ExamViewComponent implements OnInit {
  constructor(public app: AppService, public exam: ExamService) {}

  ngOnInit(): void {}
}
