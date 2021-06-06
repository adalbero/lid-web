import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.css'],
})
export class SummaryViewComponent implements OnInit, OnDestroy {

  constructor(public exam: ExamService) {}

  ngOnInit(): void {
    console.log('init summary-view');
  }

  ngOnDestroy(): void {
    console.log('destroy summary-view');
  }

}
