import { Component } from '@angular/core';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { DecisionFilterComponent } from './components/decision-filter/decision-filter.component';
import { MoveItemsTableComponent } from './components/move-items-table/move-items-table.component';

@Component({
  selector: 'app-root',
  imports: [
    MoveItemsTableComponent,
    CategoryFilterComponent,
    DecisionFilterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
