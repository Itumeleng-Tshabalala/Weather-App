import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-town-list',
  templateUrl: './town-list.component.html',
  styleUrls: ['./town-list.component.css'],
})
export class TownListComponent implements OnInit, OnChanges {
  @Input() forecast: any;
  @Input() isCelcius!: boolean;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {}
}
