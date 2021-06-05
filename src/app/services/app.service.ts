import { Injectable } from '@angular/core';
import { LidExamRun } from '../model/lid-exam-run';
import { LidCollection, NO_COLLECTION } from '../model/lid-model';
import { DatabaseService } from './database.service';
import { ExamService } from './exam.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  view_mode: 'summary-view' | 'list-view' | 'card-view' = 'list-view';
  examRun?: LidExamRun;

  constructor(private exam: ExamService, private db: DatabaseService) {
  }

  startExam(collection: LidCollection) {
    if (collection.onSelect) {
      collection.questions = collection.onSelect(this.db);
    }

    this.examRun = new LidExamRun(collection);

    console.log(collection.questions.length);

    this.exam.questions$.emit(collection.questions);
  }
}
