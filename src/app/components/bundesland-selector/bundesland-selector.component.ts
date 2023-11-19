import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-bundesland-selector',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatSelectModule],
  templateUrl: './bundesland-selector.component.html',
  styleUrl: './bundesland-selector.component.less'
})
export class BundeslandSelectorComponent {
  bundeslandList: string[] = [
    'Baden - Württemberg',
    'Bayern',
    'Berlin',
    'Brandenburg',
    'Bremen',
    'Hamburg',
    'Hessen',
    'Mecklenburg - Vorpommern',
    'Niedersachsen',
    'Nordrhein - Westfalen',
    'Rheinland - Pfalz',
    'das Saarland',
    'Sachsen',
    'Sachsen - Anhalt',
    'Schleswig - Holstein',
    'Thüringen',
  ];

  panelOpen = true;
}
