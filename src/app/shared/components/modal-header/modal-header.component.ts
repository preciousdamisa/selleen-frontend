import { Component, Input } from '@angular/core';

import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal-header',
  templateUrl: './modal-header.component.html',
  styleUrls: ['./modal-header.component.scss'],
})
export class ModalHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() classes = '';

  constructor(private modalService: ModalService) {}

  onClick() {
    this.modalService.close();
  }
}
