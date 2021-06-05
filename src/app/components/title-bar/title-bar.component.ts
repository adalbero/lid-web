import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-title-bar',
  templateUrl: './title-bar.component.html',
  styleUrls: ['./title-bar.component.css'],
})
export class TitleBarComponent implements OnInit {
  constructor(private app: AppService) {}

  ngOnInit(): void {}

  onSummaryView() {
    this.app.view_mode = 'summary-view';
  }

  onListView() {
    this.app.view_mode = 'list-view';
  }

  onCardView() {
    this.app.view_mode = 'card-view';
  }
}
