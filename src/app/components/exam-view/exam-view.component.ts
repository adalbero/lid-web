import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent implements OnInit {
  view_mode: string = '';

  constructor(public app: AppService, private exam: ExamService) { }

  ngOnInit(): void {
    // this.exam.questions$.subscribe(() => {
    //   this.view_mode = this.app.view_mode ? this.app.view_mode : 'hello';
    //   console.log('change exam-view', this.view_mode);
    // })
  }

}
