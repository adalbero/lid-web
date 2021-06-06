import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LidExamQuestion, LidQuestion } from 'src/app/model/lid-model';
import { AppService } from 'src/app/services/app.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit, OnDestroy {
  constructor(public exam: ExamService) {}

  ngOnInit(): void {
    console.log('init list-view');
  }

  ngOnDestroy(): void {
    console.log('destroy list-view');
  }

}
