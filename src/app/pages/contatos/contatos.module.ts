import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { BreadcrumbModule } from 'src/components/breadcrumb/breadcrumb.module';
import { validationMessageModule } from 'src/components/validation-message/validation-message.module';
import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatosComponent } from './contatos.component';
import { CriarContatoComponent } from './criar-contato/criar-contato.component';
import { EditarContatoComponent } from './editar-contato/editar-contato.component';





@NgModule({
  declarations: [ContatosComponent, EditarContatoComponent, CriarContatoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContatosRoutingModule,
    NgbModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    MatDialogModule,
    BreadcrumbModule,
    validationMessageModule,
    NgxMaskDirective, 
    NgxMaskPipe
 ],
 providers: [
    provideEnvironmentNgxMask()
 ]
})
export class ContatosModule {}
