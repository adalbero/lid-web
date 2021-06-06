import { Observable, of, Subscription, timer } from 'rxjs';
import { ExamService } from '../services/exam.service';

export class LidCountdonw {
  source: Observable<number> = of(0);
  subscription?: Subscription;

  constructor(
    private value: number,
    private exam: ExamService,
    private onTick: (exam: ExamService, value: string) => void,
    private onTimeout: (exam: ExamService) => void
  ) {
    this.source = timer(1000, 1000);
  }

  start() {
    console.log('start');
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.source.subscribe((elapsed) => {
      const seconds = this.value - elapsed;

      if (seconds >= 0) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;

        const text = `${String(min).padStart(2, '0')}:${String(sec).padStart(
          2,
          '0'
        )}`;
        this.onTick(this.exam, text);
      } else {
        this.onTimeout(this.exam);
        this.stop();
      }
    });
  }

  stop() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
