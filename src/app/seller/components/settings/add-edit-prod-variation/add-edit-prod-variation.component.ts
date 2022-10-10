import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SelectOption } from 'src/app/shared/types/shared';

@Component({
  selector: 'app-add-edit-prod-variation',
  templateUrl: './add-edit-prod-variation.component.html',
  styleUrls: ['./add-edit-prod-variation.component.scss'],
})
export class AddEditProdVariationComponent implements OnInit {
  prodVariationForm!: FormGroup;
  variationOpts: SelectOption[] = [
    { label: '~~~ Select Variation ~~~', value: '' },
    { label: 'Color', value: 'Color' },
    { label: 'Size', value: 'Size' },
    { label: 'Weight', value: 'Weight' },
  ];
  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.prodVariationForm = new FormGroup({
      type: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
    });
  }

  onSubmit() {}
}
