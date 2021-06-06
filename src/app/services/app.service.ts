import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { ExamService } from './exam.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  view_mode: 'summary-view' | 'list-view' | 'card-view' = 'list-view';

  constructor(private exam: ExamService, private db: DatabaseService) {}
}
