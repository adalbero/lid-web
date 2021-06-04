import { Injectable } from '@angular/core';
import {
  DB,
  LidCollection,
  LidGroup,
  LidQuestion,
  NO_QUESTION,
} from '../model/lid-model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  bundesland: string = 'Berlin';

  generalQuestions: LidQuestion[] = [];
  landQuestions: LidQuestion[] = [];

  constructor() {
    this.initCollections();
  }

  getQuestion(num: string): LidQuestion {
    return DB.questions.find((x) => x.num === num) || NO_QUESTION;
  }

  getAllQuestions(): LidQuestion[] {
    return DB.questions;
  }

  getCollectionGroups(): LidGroup[] {
    return DB.groups;
  }

  initCollections() {
    this.generalQuestions = DB.questions.filter((q) => q.area_code !== 'land');
    this.setBundesland('Berlin');

    DB.groups = [this.initGeneralGroup(), ...this.initThemeGroups()];
  }

  setBundesland(land: string) {
    this.bundesland = land;
    this.landQuestions = DB.questions.filter(
      (q) => q.area_code === 'land' && q.theme === land
    );
  }

  private initGeneralGroup(): LidGroup {
    const group: LidGroup = {
      title: 'Questions',
      collections: [
        {
          title: 'Alle',
          subtitle: 'All general questions',
          icon: 'help',
          color: 'alle',
          questions: this.generalQuestions,
        },
        {
          title: 'Bundesland',
          subtitle: 'Questions specific to your bundesland',
          icon: 'help',
          color: 'bundesland',
          questions: this.landQuestions,
        },
        {
          title: 'Exercise',
          subtitle: 'Random questions not answered yet',
          icon: 'directions_run',
          color: 'exercise',
          questions: this.getExerciseQuestions(this),
          onSelect: this.getExerciseQuestions,
        },
        {
          title: 'Test',
          subtitle: 'Exam simulator. 33 Random questions',
          icon: 'mode',
          color: 'test',
          questions: this.getTestQuestions(this),
          onSelect: this.getTestQuestions,
        },
      ],
    };

    return group;
  }

  private initThemeGroups(): LidGroup[] {
    const byTheme: LidGroup = {
      title: 'By Theme',
      collections: [],
    };

    const byTopic: LidGroup = {
      title: 'By Topic',
      collections: [],
    };

    DB.questions.forEach((q) => {
      const theme = q.theme;
      const area = q.area;

      if (q.area_code !== 'land') {
        if (!byTheme.collections.find((x) => x.title === area)) {
          const collection: LidCollection = {
            title: q.area,
            subtitle: 'by Theme',
            icon: this.getAreaIcon(q.area_code),
            color: q.area_code,
            questions: DB.questions.filter((q) => q.area === area),
          };

          byTheme.collections.push(collection);
        }
        this.sortCollection(byTheme.collections);

        if (!byTopic.collections.find((x) => x.title === theme)) {
          const collection: LidCollection = {
            title: q.theme,
            subtitle: q.area,
            icon: this.getAreaIcon(q.area_code),
            color: q.area_code,
            questions: DB.questions.filter(
              (q) => q.area === area && q.theme === theme
            ),
          };

          byTopic.collections.push(collection);
        }
        this.sortCollection(byTopic.collections);
      }
    });

    return [byTheme, byTopic];
  }

  sortCollection(collections: LidCollection[]) {
    collections.sort(
      (a, b) =>
        -1 *
        `${a.subtitle}:${a.title}`.localeCompare(`${b.subtitle}:${b.title}`)
    );
  }

  getAreaIcon(areaCode: string): string {
    return areaCode === 'politik'
      ? 'account_balance'
      : areaCode === 'geschichte'
      ? 'public'
      : 'people';
  }

  getExerciseQuestions(me: DatabaseService): LidQuestion[] {
    return me.random([...me.generalQuestions, ...me.landQuestions], 20);
  }

  getTestQuestions(me: DatabaseService): LidQuestion[] {
    return [
      ...me.random(me.generalQuestions, 30),
      ...me.random(me.landQuestions, 3),
    ];
  }

  random(list: LidQuestion[], size: number): LidQuestion[] {
    const indexes = new Set<number>();

    while (indexes.size < size) {
      const n = Math.floor(Math.random() * list.length);
      indexes.add(n);
    }

    return [...indexes].map((idx) => list[idx]);
  }

  shuffle(array: any[]) {
    let currentIndex: number = array.length;
    let randomIndex: number;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
