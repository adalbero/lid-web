import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LidQuestion } from 'src/app/model/lid-model';
import { AppService } from 'src/app/services/app.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit, OnDestroy {
  questions: LidQuestion[] = [];
  subscriptions: Subscription[] = [];

  constructor(private app: AppService, private exam: ExamService) {}

  ngOnInit(): void {
    console.log('init list-view');
    this.update(this.app.examRun?.collection.questions);

    this.subscriptions.push(this.exam.questions$.subscribe((questions) => {
      this.update(questions);
    }));
  }

  ngOnDestroy(): void {
    console.log('destroy list-view');
    this.subscriptions.forEach(x => x.unsubscribe());
  }


  update(questions?: LidQuestion[]) {
    console.log('list-view update');
    this.questions = questions || [];
  }
}
