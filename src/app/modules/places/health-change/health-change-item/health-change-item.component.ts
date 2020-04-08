import { Component, OnInit, Input } from '@angular/core';

import { IHealthChange } from '../../../../models/place.model';

@Component({
  selector: 'app-health-change-item',
  templateUrl: './health-change-item.component.html',
  styleUrls: ['./health-change-item.component.scss'],
})
export class HealthChangeItemComponent implements OnInit {
  @Input() healthChange: IHealthChange;

  constructor() {}

  ngOnInit() {
    console.log('ngOnInit healthChange', this.healthChange);
  }
}
