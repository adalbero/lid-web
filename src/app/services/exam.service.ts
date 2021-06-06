import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LidCollection, LidExamQuestion } from '../model/lid-model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  start$: EventEmitter<void> = new EventEmitter();

  examQuestions: LidExamQuestion[] = [];
  collection?: LidCollection;

  constructor(private db: DatabaseService) {}


  hasExam(): boolean {
    return !!this.collection;
  }
  
  start(collection: LidCollection) {
    if (collection.onSelect) {
      collection.questions = collection.onSelect(this.db);
    }

    this.collection = collection;
    this.examQuestions = collection.questions.map((q) => {
      const eq: LidExamQuestion = {
        question: q,
        options: [
          {
            value: 'a',
            text: q.a,
            selected: false,
            disabled: false,
          },
          {
            value: 'b',
            text: q.b,
            selected: false,
            disabled: false,
          },
          {
            value: 'c',
            text: q.c,
            selected: false,
            disabled: false,
          },
          {
            value: 'd',
            text: q.d,
            selected: false,
            disabled: false,
          },
        ],
        answer: undefined,
      };

      return eq;
    });

    this.start$.emit();
  }
}
