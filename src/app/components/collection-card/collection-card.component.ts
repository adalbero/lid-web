import { Component, Input, OnInit } from '@angular/core';
import { LidCollection, NO_COLLECTION } from 'src/app/model/lid-model';
import { AppService } from 'src/app/services/app.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css'],
})
export class CollectionCardComponent implements OnInit {
  @Input() collection: LidCollection = NO_COLLECTION;

  constructor(private exam: ExamService) {}

  ngOnInit(): void {}

  onSelected() {
    this.exam.start(this.collection);
  }

  getColor() {
    return `bgcolor-${this.collection.color}`;
  }
}
