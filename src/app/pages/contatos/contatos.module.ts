import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatosComponent } from './contatos.component';


@NgModule({
  declarations: [ContatosComponent],
  imports: [CommonModule, ReactiveFormsModule, ContatosRoutingModule, NgbModule],
})
export class ContatosModule {}
