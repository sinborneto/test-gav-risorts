import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, RouterModule],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
