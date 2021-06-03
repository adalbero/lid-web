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

export interface LidDatabase {
  questions: LidQuestion[];
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
