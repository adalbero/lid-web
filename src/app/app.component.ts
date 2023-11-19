import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AppFooterComponent } from './components/app-footer/app-footer.component';
import { AppTitleBarComponent } from './components/app-title-bar/app-title-bar.component';
import { AppAdComponent } from './components/app-ad/app-ad.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AppTitleBarComponent, AppFooterComponent, AppAdComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'lid-web';
}
