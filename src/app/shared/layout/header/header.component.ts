import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() city!: string;
  isCelcius: boolean = true;
  @Output() eventEmit!: EventEmitter<boolean>;

  constructor() {
    this.eventEmit = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}

  setCelcius() {
    this.isCelcius = !this.isCelcius;
    this.eventEmit.emit(this.isCelcius);
  }
}
