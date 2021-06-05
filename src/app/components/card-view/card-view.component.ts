import { Component, OnInit } from '@angular/core';
import { LidQuestion } from 'src/app/model/lid-model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent implements OnInit {
  questions: LidQuestion[] = [];

  constructor(private app: AppService) { }

  ngOnInit(): void {
    this.questions = this.app.examRun?.collection.questions || [];
  }

}
