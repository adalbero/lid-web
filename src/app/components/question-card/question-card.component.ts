import { Component, Input, OnInit } from '@angular/core';
import { LidOption, LidQuestion, NO_QUESTION } from 'src/app/model/lid-model';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css'],
})
export class QuestionCardComponent implements OnInit {
  @Input() num: string = '';
  q: LidQuestion = NO_QUESTION;

  response?: string;
  options: LidOption[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.q = this.db.getQuestion(this.num);
    this.options = [
      { value: 'a', text: this.q.a, selected: false, disabled: false },
      { value: 'b', text: this.q.b, selected: false, disabled: false },
      { value: 'c', text: this.q.c, selected: false, disabled: false },
      { value: 'd', text: this.q.d, selected: false, disabled: false },
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
    } else if (this.response === this.q.solution) {
      return 'bgcolor-right';
    } else {
      return 'bgcolor-wrong';
    }
  }

  titleColor() {
    if (this.q.area_code === 'politik') {
      return 'bgcolor-politik';
    } else if (this.q.area_code === 'geschichte') {
      return 'bgcolor-geschichte';
    } else if (this.q.area_code === 'gesellschaft') {
      return 'bgcolor-gesellschaft';
    } else {
      return 'bgcolor-bundesland';
    }
  }

  optionColor(opt: LidOption) {
    if (this.response && this.q.solution === opt.value) {
      return 'bgcolor-light-right';
    } else if (this.response && opt.selected && this.q.solution !== opt.value) {
      return 'bgcolor-light-wrong';
    } else {
      return 'bgcolor-light-undefined';
    }
  }
}
