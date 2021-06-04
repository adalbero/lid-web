import { Component, Input, OnInit } from '@angular/core';
import { LidQuestion, NO_QUESTION } from 'src/app/model/lid-model';
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

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.q = this.db.getQuestion(this.num);
  }

  onResponse(resp: string) {
    this.response = resp;
  }

  getStatus() {
    if (!this.response) {
      return 'status-undefined';
    } else if (this.response === this.q.solution) {
      return 'status-right';
    } else {
      return 'status-wrong';
    }
  }
}
