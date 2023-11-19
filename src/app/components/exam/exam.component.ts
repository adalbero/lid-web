import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.less'
})
export class ExamComponent {
  num?: number;

  constructor(private route: ActivatedRoute, private router: Router) {
    const num = this.route.snapshot.paramMap.get('num');
    if (num) {
      this.num = parseInt(num);
      if (Number.isNaN(this.num)) {
        this.router.navigate(['/404']);
      }
    } else {
      this.num = undefined;
    }
  }
}
