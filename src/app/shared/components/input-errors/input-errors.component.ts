import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { getInputErrors } from '../../utils/custom-validators';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.scss'],
})
export class InputErrorsComponent implements OnInit {
  @Input() control!: any;
  @Input() label!: string;
  @Input() custom?: { key: string; message: string };

  inputErrors = getInputErrors;

  constructor() {}

  ngOnInit(): void {}
}
