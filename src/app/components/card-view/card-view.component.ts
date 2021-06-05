import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LidQuestion } from 'src/app/model/lid-model';
import { AppService } from 'src/app/services/app.service';
import { ExamService } from 'src/app/services/exam.service';
import SwiperCore, {
  A11y,
  Autoplay,
  Controller,
  EffectCoverflow,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom,
} from 'swiper/core';

// install Swiper components
SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller,
  EffectCoverflow,
]);

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css'],
})
export class CardViewComponent implements OnInit, OnDestroy {
  questions: LidQuestion[] = [];
  subscriptions: Subscription[] = [];

  constructor(private app: AppService, private exam: ExamService) {}

  ngOnInit(): void {
    console.log('init card-view');
    this.update(this.app.examRun?.collection.questions);

    this.subscriptions.push(
      this.exam.questions$.subscribe((questions) => {
        this.update(questions);
      })
    );
  }

  ngOnDestroy(): void {
    console.log('destropy card-view');
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  update(questions?: LidQuestion[]) {
    console.log('card-view update');
    this.questions = questions || [];
  }

  slideChange(ev: any) {
    console.log('event', ev);
  }

  pagination = {
    type: 'fraction',
    /*
    clickable: true,
    renderBullet: (index: number, className: string) => {
      console.log({className, index});
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
    */
  };
}
