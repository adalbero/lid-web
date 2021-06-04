import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LidCollection, NO_COLLECTION } from 'src/app/model/lid-model';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent implements OnInit {
  @Input() collection: LidCollection = NO_COLLECTION;
  @Output() selected: EventEmitter<LidCollection> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    this.selected.emit(this.collection);
  }

  getColor() {
    return `bgcolor-${this.collection.color}`;
  }
}
