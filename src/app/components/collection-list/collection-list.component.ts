import { Component, OnInit } from '@angular/core';
import { LidCollection, LidGroup } from 'src/app/model/lid-model';
import { DatabaseService } from 'src/app/services/database.service';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css'],
})
export class CollectionListComponent implements OnInit {
  groups: LidGroup[] = [];

  constructor(private db: DatabaseService, private exam: ExamService) {}

  ngOnInit(): void {
    this.groups = this.db.getCollectionGroups();
  }

  onSelected(collection: LidCollection) {
    console.log(collection.title);
    if (collection.onSelect) {
      collection.questions = collection.onSelect(this.db);
    }

    this.exam.questions$.emit(collection.questions);
  }
}
