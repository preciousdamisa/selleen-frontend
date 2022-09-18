import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { NotificationsService } from 'src/app/services/notification.service';
import { AdminProductsService } from '../../services/admin-products.service';

@Component({
  selector: 'app-product-approval',
  templateUrl: './product-approval.component.html',
  styleUrls: ['./product-approval.component.scss'],
})
export class ProductApprovalComponent implements OnInit, OnDestroy {
  @Input() productId!: string;

  subs?: Subscription;
  form!: FormGroup;
  loading = false;

  constructor(
    private prodService: AdminProductsService,
    private modalService: ModalService,
    private notifService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      comment: new FormControl('', [
        Validators.required,
        Validators.maxLength(500),
      ]),
      action: new FormControl(''),
    });
  }

  onSetApprovalAction(action: string) {
    this.form.get('action')?.setValue(action);
  }

  onSubmit() {
    this.loading = true;
    this.subs = this.prodService
      .approveProduct(this.form.value, this.productId)
      .subscribe({
        next: () => {
          this.loading = false;
          let clause = 'approved';
          if (this.form.get('action')?.value === 'Disapproved')
            clause = 'disapproved';

          this.notifService.add(`Product ${clause} successfully!`, 'success');
          this.modalService.close();
        },
        error: () => {
          this.loading = false;
          this.modalService.close();
        },
      });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
