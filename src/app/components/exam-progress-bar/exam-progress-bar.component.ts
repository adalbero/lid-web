import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-progress-bar',
  templateUrl: './exam-progress-bar.component.html',
  styleUrls: ['./exam-progress-bar.component.css'],
})
export class ExamProgressBarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas?: ElementRef;
  @ViewChild('canvas_container') container?: ElementRef;
  @Input() height = 20;

  subscriptions: Subscription[] = [];

  constructor(private exam: ExamService) {}

  ngAfterViewInit(): void {
    this.draw();

    this.subscriptions.push(
      this.exam.answered$.subscribe((eq) => {
        this.draw();
      })
    );

    this.subscriptions.push(
      this.exam.start$.subscribe((eq) => {
        this.draw();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }

  draw() {
    if (this.canvas) {
      const containerEl: HTMLCanvasElement = this.container?.nativeElement;
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      canvasEl.width = containerEl.offsetWidth;
      canvasEl.height = this.height;

      const canvasWidth = canvasEl.width;
      const canvasHeight = canvasEl.height;

      console.log({canvasWidth});
      console.log(containerEl.offsetWidth);

      const colorRight = 'hsl(120, 50%, 80%)';
      const colorWrong = 'hsl(0, 50%, 80%)';
      const colorUndefined = 'hsl(0, 0%, 80%)';
      const colorThreshold = 'hsl(0, 100%, 80%)';

      const ctx = canvasEl.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        const total = this.exam.total;

        const step = canvasWidth / total;
        const offset = 5;
        const bulletWidth = step - (step > 5 ? 1 : 0);
        const bulletHeight = canvasHeight - 2 * offset;

        for (let i = 0; i < total; i++) {
          const color =
            i >= this.exam.totalAnswered
              ? colorUndefined
              : i >= this.exam.totalRight
              ? colorWrong
              : colorRight;

          this.drawBullet(
            ctx,
            i * step,
            offset,
            bulletWidth,
            bulletHeight,
            color
          );
        }

        ctx.strokeStyle = colorThreshold;
        ctx.beginPath();
        ctx.moveTo(canvasWidth / 2, 0);
        ctx.lineTo(canvasWidth / 2, canvasHeight);
        ctx.closePath();

        ctx.stroke();
      }
    }
  }

  drawBullet(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string
  ) {
    const r = w > h ? h / 2 : w / 2;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();

    ctx.fill();
  }
}
