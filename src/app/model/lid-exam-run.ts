import { LidCollection, LidExam } from './lid-model';

export class LidExamRun implements LidExam {
  collection: LidCollection;

  constructor(collection: LidCollection) {
    this.collection = collection;
  }
}
