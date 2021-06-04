import { Component, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LidQuestion } from 'src/app/model/lid-model';
import { DatabaseService } from 'src/app/services/database.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css'],
})
export class ListViewComponent implements OnInit {
  datasource$: ReplaySubject<LidQuestion[]> = new ReplaySubject();

  constructor(private db: DatabaseService, private exam: ExamService) {}

  ngOnInit(): void {
    const questions = this.db.getAllQuestions();
    this.datasource$.next(questions);

    this.exam.questions$.subscribe((questions) => {
      this.datasource$.next(questions);
    });
  }
}
