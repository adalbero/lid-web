import { EventEmitter, Injectable } from '@angular/core';
import { LidCountdonw } from '../model/lid-countdown';
import { LidCollection, LidExamQuestion } from '../model/lid-model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  start$: EventEmitter<void> = new EventEmitter();
  answered$: EventEmitter<LidExamQuestion> = new EventEmitter();

  examQuestions: LidExamQuestion[] = [];
  collection?: LidCollection;

  total = 0;
  totalAnswered = 0;
  totalRight = 0;
  get totalWrong() {
    return this.totalAnswered - this.totalRight;
  }

  timer$: EventEmitter<string> = new EventEmitter();
  timeout: boolean = false;

  countdown: LidCountdonw = new LidCountdonw(10 * 60, this, this.onTick, this.onTimeout);

  constructor(private db: DatabaseService) {}

  onTick(me: ExamService, timer: string) {
    me.timer$.emit(timer);
  }

  onTimeout(me: ExamService) {
    me.timeout = true;
    me.examQuestions.forEach(eq => eq.options.forEach(op => op.disabled = true));
  }

  hasExam(): boolean {
    return !!this.collection;
  }

  onAnswer(eq: LidExamQuestion, answer: string) {
    if (eq.answer || this.timeout) {
      return;
    }

    eq.answer = answer;
    eq.options.forEach((x) => {
      x.disabled = true;
      x.selected = x.value == answer;
    });

    this.totalAnswered++;
    if (eq.question.solution === answer) {
      this.totalRight++;
    }

    this.answered$.emit(eq);

    if (this.totalAnswered === this.total) {
      this.countdown.stop();
    }
  }

  start(collection: LidCollection) {
    if (collection.onSelect) {
      collection.questions = collection.onSelect(this.db);
    }

    this.timeout = false;


    this.total = collection.questions.length;
    this.totalAnswered = 0;
    this.totalRight = 0;

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

    this.countdown.start();

    this.start$.emit();
  }
}
