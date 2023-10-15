import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './more-information-dialog.component.html',
})
export class MoreInformationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MoreInformationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string[] }
  ) {}

  close(): void {
    this.dialogRef.close(false);
  }
}
