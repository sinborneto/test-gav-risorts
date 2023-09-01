import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { validationMessageComponent } from './validation-message.component';

@NgModule({
  declarations: [validationMessageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [validationMessageComponent],
})
export class validationMessageModule {}
