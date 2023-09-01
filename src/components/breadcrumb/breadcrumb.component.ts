import { Location } from '@angular/common';
import { Component, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

interface BreadCrumbItem {
  text: string;
  link?: string;
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  @Input() public items = new Array<BreadCrumbItem>();
  @Input() public isModal = false;
  @Output() public closeModal = new Subject<void>();

  constructor(private location: Location) {}

  isTheLastItem(item: BreadCrumbItem): boolean {
    const index = this.items.indexOf(item);
    return index + 1 === this.items.length;
  }

  back = (): void => (this.isModal ? this.closeModal.next() : this.location.back());
}
