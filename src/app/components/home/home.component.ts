import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeWelcomeComponent } from '../home-welcome/home-welcome.component';
import { BundeslandSelectorComponent } from '../bundesland-selector/bundesland-selector.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeWelcomeComponent, BundeslandSelectorComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

}
