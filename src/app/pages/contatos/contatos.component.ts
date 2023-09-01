import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { ModalComponent } from 'src/components/modal/modal.component';
import { ContactService } from 'src/services/test.service';
import { CriarContatoComponent } from './criar-contato/criar-contato.component';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  @ViewChild('dt') dt!: Table; // Referência à tabela

  contacts!: any;
  product: any;
  selectedContacts!: any;

  private contactService = inject(ContactService)
  private dialog = inject(MatDialog)

  constructor(private modal: NgbModal) {}

  public token = ''

  ngOnInit() {
    this.contactService.getContacts().subscribe((res: any) => {
      this.contacts = res
    })
  }

  openNewContact() {
    const dialogRef = this.dialog.open(CriarContatoComponent, {
      height: '100vh',
      width: '100vw',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.refreshTable()
    })
  }


editContact(contact: any) {
  const dialogRef = this.dialog.open(EditarContatoComponent, {
    height: '100vh',
    width: '100vw',
    maxWidth: 'none',
    data: contact
  });

  dialogRef.afterClosed().subscribe(() => {
    this.refreshTable()
  })
}

searchId(event: any) {
  let id = event.target.value;
  if(id.length && !isNaN(parseInt(id))) {
    this.contactService.getContactsById(id).subscribe((res: any) => {
      console.log(res)
      if(res) {
        this.contacts = [];
        this.contacts.push(res);
      } else this.refreshTable();
    })
  }
  if(id.length === 0) {
    this.refreshTable();
  }
}

deleteContact(contact: any) {
  const modalRef = this.modal.open(ModalComponent, { centered: true });
  modalRef.componentInstance.list = ['Deseja realmente excluir o contato?'];
  modalRef.componentInstance.title = 'Excluir';
  modalRef.componentInstance.type = 'alert';
  modalRef.componentInstance.confirmButtonText = 'Sim';
  modalRef.componentInstance.cancelButtonText = 'Não';

  modalRef.closed?.subscribe((res: boolean | any) => {
    if (res === true) {
      this.contactService.deleteContact(contact.id)
      .pipe(finalize(() => this.refreshTable())).subscribe();
    }
  });
}

refreshTable() {
  if (this.dt) {
    this.contactService.getContacts()
    .pipe(finalize(() => this.dt.reset())).subscribe((res: any) => {
      this.contacts = res
    })
  }
}

}
