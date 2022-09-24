import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
  @Input() size = '12rem';
  @Input() color: 'black' | 'white' = 'black';

  constructor() {}

  ngOnInit(): void {}
}
