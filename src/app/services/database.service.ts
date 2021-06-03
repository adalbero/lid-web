import { Injectable } from '@angular/core';
import { DB } from '../model/lid-database';
import { LidQuestion, NO_QUESTION } from '../model/lid-model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  
  constructor() { }

  getQuestion(num: string): LidQuestion {
    return DB.questions.find(x => x.num === num) || NO_QUESTION;
  }

  getAllQuestions(): LidQuestion[] {
    return DB.questions;
  }
}
