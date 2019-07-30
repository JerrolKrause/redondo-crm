import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmationModalComponent } from './confirmation/confirmation-modal.component';
import { LogoutModalComponent } from './logout/logout-modal.component';
import { FeedbackComponent } from './feedback/feedback.component';

/** Sample Usage:
this.ui.modals.open('ConfirmationModalComponent', false, 'lg', 'Are you sure you want to delete this user?', 'Delete User').result.then(
	() => console.log('Modal Closed'),
	() => console.log('Modal Dismissed'));
*/

// List modals here by component name
type modals = 'LogoutModalComponent' | 'ConfirmationModalComponent' | 'FeedbackComponent';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  /** Reference to the STATIC currently open modal. This reference is used for static non persistant modals */
  public modalRef: MatDialogRef<any> | undefined;
  /** Reference to the STORE OBSERVABLE currently open modal. This reference is used for modals persisted in the UI store */
  public modalRef$: BehaviorSubject<any> = new BehaviorSubject(null);
  /** List of component references of available modals */
  public modalList: { [key: string]: any } = {
    ConfirmationModalComponent: ConfirmationModalComponent,
    LogoutModalComponent: LogoutModalComponent,
    FeedbackComponent: FeedbackComponent,
  };

  constructor(public dialog: MatDialog) {}

  /**
   * Open a modal window
   * @param modalId The class name of the modal window
   * @param persist Should the modal persist on reload or otherwise have its state managed by the UI store
   * @param size Modal size
   * @param data Primary set of data to pass to the modal
   * @param dataAlt Secondary set of data to pass to the modal
   */
  public open(modalId: modals, persist: boolean = false, size: 'sm' | 'lg' | 'xl' | 'full' = 'lg', data?: any, dataAlt?: any) {
    let width = '720px';

    switch (size) {
      case 'sm':
        width = '480px';
        break;
      case 'xl':
        width = '1024px';
        break;
      case 'full':
        width = '90%';
        break;
    }

    if (persist) {
    }

    // If persist is not set
    // this.modalRef = this.modalService.open(this.modalList[modalId], { size: <any>size, windowClass: windowClass });
    this.modalRef = this.dialog.open(this.modalList[modalId], {
      width: width,
      data: data,
    });
    this.modalRef.componentInstance.dataAlt = dataAlt;
    return this.modalRef;
  }
}
