import { Component, OnInit, Input } from '@angular/core';
import { Org } from 'src/app/models/org.model';

@Component({
  selector: 'app-org-item',
  templateUrl: './org-item.component.html',
  styleUrls: ['./org-item.component.scss'],
})
export class OrgItemComponent implements OnInit {
  @Input() org: Org;
  constructor() {}

  ngOnInit() {}
}
