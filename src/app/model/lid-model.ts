import { DatabaseService } from '../services/database.service';
import { QUESTIONS } from './lid-questions';

export interface LidQuestion {
  num: string;
  question: string;
  a: string;
  b: string;
  c: string;
  d: string;
  solution: string;
  area_code: string;
  area: string;
  theme: string;
  image: string;
}

export interface LidOption {
  value: string;
  text: string;
  selected: boolean;
  disabled: boolean;
}

export interface LidCollection {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  questions: LidQuestion[];
  onSelect?: (me: DatabaseService) => LidQuestion[],
}

export interface LidGroup {
  title: string;
  collections: LidCollection[];
}

export interface LidDatabase {
  groups: LidGroup[];
  questions: LidQuestion[];
}

export interface LidExam {
  collection: LidCollection;
}

// Constants

export const NO_QUESTION: LidQuestion = {
  num: '<num>',
  question: '<question>',
  a: '<option a>',
  b: '<option a>',
  c: '<option a>',
  d: '<option a>',
  solution: '<option a>',
  area_code: '<option a>',
  area: '<option a>',
  theme: '<option a>',
  image: '<option a>',
};

export const NO_COLLECTION: LidCollection = {
  title: '<title>',
  subtitle: '<subtitle>',
  icon: 'help',
  color: 'unknown',
  questions: [],
};

export const DB: LidDatabase = {
  groups: [],
  questions: QUESTIONS,
};
