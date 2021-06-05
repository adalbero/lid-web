import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LidQuestion } from 'src/app/model/lid-model';
import { AppService } from 'src/app/services/app.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  datasource$: ReplaySubject<LidQuestion[]> = new ReplaySubject();

  constructor(private app: AppService, private exam: ExamService) {}

  ngOnInit(): void {
    const questions = this.app.examRun?.collection.questions || [];
    this.update(questions);

    this.exam.questions$.subscribe((questions) => {
      this.update(questions);
    });
  }

  update(questions: LidQuestion[]) {
    console.log('update questions');
    this.datasource$.next(questions);
  }
}
