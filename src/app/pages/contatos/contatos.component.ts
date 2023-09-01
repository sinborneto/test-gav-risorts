import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { ContactService } from 'src/services/test.service';
import { CriarContatoComponent } from './criar-contato/criar-contato.component';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  @ViewChild('dt') dt!: Table; // Referência à tabela


  productDialog!: boolean;

  products!: any;

  product: any;

  selectedProducts!: any;

  submitted!: boolean;

  statuses!: any[];


  private contactService = inject(ContactService)
  private dialog = inject(MatDialog)

  constructor() {}

  public token = ''

  ngOnInit() {
    this.contactService.getContacts().subscribe((res: any) => {
      this.products = res
    })
  }

  openNewContact() {
    this.dialog.open(CriarContatoComponent, {
      height: '100vh',
      width: '100vw',
      maxWidth: 'none',
    });
}

editContact(product: any) {
    // this.product = {...product};
    // this.productDialog = true;
}

deleteContact(product: any) {
  this.contactService.deleteContact(product.id)
  .pipe(finalize(() => this.refreshTable())).subscribe();
}

refreshTable() {
  if (this.dt) {
    this.contactService.getContacts()
    .pipe(finalize(() => this.dt.reset())).subscribe((res: any) => {
      this.products = res
    })
  }
}

hideDialog() {
    // this.productDialog = false;
    // this.submitted = false;
}

saveProduct() {
}

}
