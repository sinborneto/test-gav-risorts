import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: '[app-toastr]',
  styleUrls: [`./toastr.component.scss`],
  templateUrl: `./toastr.component.html`,
  animations: [
    trigger('slideIn', [
      state(
        '*',
        style({
          transform: 'translateY(0) scale(1) rotateY(0)',
          opacity: 1,
          filter: 'blur(0) saturate(100%)',
        }),
      ),
      state(
        'void',
        style({
          transform: 'translateY(20px) scale(1.1) rotateY(5deg)',
          opacity: 0,
          filter: 'blur(2px) saturate(50%)',
        }),
      ),
      transition('void => *', animate('.3s ease-in-out')),
    ]),
    trigger('slideOut', [
      state(
        '*',
        style({
          transform: 'translateX(0)  scale(1)',
          opacity: 1,
        }),
      ),
      state(
        'void',
        style({
          transform: 'translateX(100%) scale(.7)',
          opacity: 0,
        }),
      ),
      transition('* => void', animate('.2s ease')),
    ]),
  ],
  preserveWhitespaces: false,
})
export class ToastrComponent extends Toast {
  // used for demo purposes
  undoString = 'undo';

  // constructor is only necessary when not using AoT
  constructor(protected override toastrService: ToastrService, public override toastPackage: ToastPackage) {
    super(toastrService, toastPackage);
  }

  action(event: Event) {
    event.stopPropagation();
    this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}

export const toastrConfig = {
  positionClass: 'toast-top-right',
  preventDuplicates: true,
  progressBar: true,
  closeButton: true,
  timeOut: 8000,
  extendedTimeOut: 8000,
  maxOpened: 4,
  tapToDismiss: false,
  toastComponent: ToastrComponent,
  iconClasses: {
    error: 'error-toast',
    info: 'info-toast',
    success: 'success-toast',
    warning: 'warning-toast',
  },
};
