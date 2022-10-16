import { Component, Input } from '@angular/core';

import { NotificationsService } from 'src/app/services/notification.service';
import { BankTransferAuthorizationData } from '../../types/payment.types';

@Component({
  selector: 'app-bank-account-details',
  templateUrl: './bank-account-details.component.html',
  styleUrls: ['./bank-account-details.component.scss'],
})
export class BankAccountDetailsComponent {
  @Input('transferAuthorizationData') data!: BankTransferAuthorizationData;

  constructor(private notifService: NotificationsService) {}

  onCopyAccNo(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.notifService.add('Account number copied!', 'success', {
      duration: 2000,
    });
  }
}
