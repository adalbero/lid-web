import { Component, Input, OnInit } from '@angular/core';
import { LidExamQuestion, LidOption, LidQuestion, NO_EXAM_QUESTION, NO_QUESTION } from 'src/app/model/lid-model';
import { AppService } from 'src/app/services/app.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
})
export class QuestionCardComponent implements OnInit {
  @Input('question') eq: LidExamQuestion = NO_EXAM_QUESTION;

  constructor(public app: AppService, private exam: ExamService) {}

  ngOnInit(): void {
  }

  onAnswer(answer: string) {
    this.exam.onAnswer(this.eq, answer);
  }

  statusColor() {
    if (!this.eq.answer) {
      return 'bgcolor-undefined';
    } else if (this.eq.answer === this.eq.question.solution) {
      return 'bgcolor-right';
    } else {
      return 'bgcolor-wrong';
    }
  }

  titleColor() {
    if (this.eq.question.area_code === 'politik') {
      return 'bgcolor-politik';
    } else if (this.eq.question.area_code === 'geschichte') {
      return 'bgcolor-geschichte';
    } else if (this.eq.question.area_code === 'gesellschaft') {
      return 'bgcolor-gesellschaft';
    } else {
      return 'bgcolor-bundesland';
    }
  }

  optionColor(opt: LidOption) {
    if (this.eq.answer && this.eq.question.solution === opt.value) {
      return 'bgcolor-light-right';
    } else if (this.eq.answer && opt.selected && this.eq.question.solution !== opt.value) {
      return 'bgcolor-light-wrong';
    } else {
      return 'bgcolor-light-undefined';
    }
  }
}
