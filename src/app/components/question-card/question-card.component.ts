import { Component, Input, OnInit } from '@angular/core';
import { LidOption, LidQuestion, NO_QUESTION } from 'src/app/model/lid-model';
import { AppService } from 'src/app/services/app.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
})
export class QuestionCardComponent implements OnInit {
  @Input() question: LidQuestion = NO_QUESTION;

  response?: string;
  options: LidOption[] = [];

  constructor(private db: DatabaseService, public app: AppService) {}

  ngOnInit(): void {
    this.options = [
      { value: 'a', text: this.question.a, selected: false, disabled: false },
      { value: 'b', text: this.question.b, selected: false, disabled: false },
      { value: 'c', text: this.question.c, selected: false, disabled: false },
      { value: 'd', text: this.question.d, selected: false, disabled: false },
    ];
  }

  onResponse(resp: string) {
    if (!this.response) {
      this.response = resp;
      this.options.forEach((x) => {
        x.disabled = true;
        x.selected = x.value == resp;
      });
    }
  }

  statusColor() {
    if (!this.response) {
      return 'bgcolor-undefined';
    } else if (this.response === this.question.solution) {
      return 'bgcolor-right';
    } else {
      return 'bgcolor-wrong';
    }
  }

  titleColor() {
    if (this.question.area_code === 'politik') {
      return 'bgcolor-politik';
    } else if (this.question.area_code === 'geschichte') {
      return 'bgcolor-geschichte';
    } else if (this.question.area_code === 'gesellschaft') {
      return 'bgcolor-gesellschaft';
    } else {
      return 'bgcolor-bundesland';
    }
  }

  optionColor(opt: LidOption) {
    if (this.response && this.question.solution === opt.value) {
      return 'bgcolor-light-right';
    } else if (this.response && opt.selected && this.question.solution !== opt.value) {
      return 'bgcolor-light-wrong';
    } else {
      return 'bgcolor-light-undefined';
    }
  }
}
