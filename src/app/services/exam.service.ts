import { EventEmitter, Injectable } from '@angular/core';
import { LidQuestion } from '../model/lid-model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  questions$: EventEmitter<LidQuestion[]> = new EventEmitter();

  constructor() { }
}
