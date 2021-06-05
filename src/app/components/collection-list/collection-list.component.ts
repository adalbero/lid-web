import { Component, OnInit } from '@angular/core';
import { LidGroup } from 'src/app/model/lid-model';
import { AppService } from 'src/app/services/app.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css'],
})
export class CollectionListComponent implements OnInit {
  groups: LidGroup[] = [];

  constructor(private db: DatabaseService, private app: AppService) {}

  ngOnInit(): void {
    this.groups = this.db.getCollectionGroups();
  }
}
