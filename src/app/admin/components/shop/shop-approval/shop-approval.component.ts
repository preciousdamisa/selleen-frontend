import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalService } from 'src/app/services/modal.service';
import { NotificationsService } from 'src/app/services/notification.service';
import { AdminShopService } from '../../../services/admin-shop.service';

@Component({
  selector: 'app-shop-approval',
  templateUrl: './shop-approval.component.html',
  styleUrls: ['./shop-approval.component.scss'],
})
export class ShopApprovalComponent implements OnInit {
  @Input() shopId!: string;
  @Output() refetchShops = new EventEmitter();

  subs?: Subscription;
  form!: FormGroup;
  loading = false;

  constructor(
    private shopService: AdminShopService,
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
    this.subs = this.shopService
      .approveShop(this.form.value, this.shopId)
      .subscribe({
        next: () => {
          this.loading = false;
          let clause = 'approved';
          if (this.form.get('action')?.value === 'Disapproved')
            clause = 'disapproved';

          this.notifService.add(`Shop ${clause} successfully!`, 'success');
          this.refetchShops.emit();
          this.modalService.close();
        },
        error: () => {
          this.loading = false;
          this.modalService.close();
        },
      });
  }
}
