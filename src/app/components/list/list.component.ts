import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { LidQuestion } from 'src/app/model/lid-model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  datasource$: ReplaySubject<LidQuestion[]> = new ReplaySubject();

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    const questions = this.db.getAllQuestions();
    this.datasource$.next(questions);
  }
}
