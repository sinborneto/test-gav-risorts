import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { displayNameValidator, emailValidator, numberValidator, phoneValidator } from 'src/components/validators/validators';
import { ContactService } from 'src/services/test.service';

@Component({
  selector: 'app-criar-contato',
  templateUrl: './criar-contato.component.html',
  styleUrls: ['./criar-contato.component.scss']
})
export class CriarContatoComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef;
  
  fotoUrl: string | null = null;

  formNewContact = this.formBuilder.group({
    dataCadastro: [ this.dataAtual()],
    email: ['', [Validators.required, emailValidator()]],
    foto: ['', [Validators.required]],
    id: ['', [Validators.required, numberValidator()]],
    nome: ['', [Validators.required, displayNameValidator() ]],
    telefone: ['', [Validators.required, phoneValidator()]],
    base64Image: [''],
  });

  data: any = {
    dataCadastro:'' ,
    email:'' ,
    foto: '',
    id:'' ,
    nome:'' ,
    telefone:'' ,
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CriarContatoComponent>,
    private contactService: ContactService
  ) {}

  ngOnInit() {}

  postNewContact() {
    const {
      email,
      dataCadastro,
      id,
      nome,
      telefone,
      base64Image
    } = this.formNewContact.controls;
    
    this.data = {
      id: id?.value,
      nome: nome?.value,
      email: email?.value,
      telefone: telefone?.value,
      foto: base64Image?.value,
      dataCadastro: dataCadastro?.value
    };
    
    this.contactService.createContact(this.data).pipe(finalize(() => this.dialogRef.close())).subscribe()
  }

  dataAtual() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1;
    let ajusteMes = mes.toString().length === 1 ? `0${mes.toString()}` : mes
    const dia = dataAtual.getDate();
    let ajusteDia = dia.toString().length === 1 ? `0${dia.toString()}` : dia
    const hora = dataAtual.getHours();
    let ajusteHora = hora.toString().length === 1 ? `0${hora.toString()}` : hora
    const minutos = dataAtual.getMinutes();
    let ajusteMinutos = minutos.toString().length === 1 ? `0${minutos.toString()}` : minutos
    const segundos = dataAtual.getSeconds();
    let ajusteSegundos = segundos.toString().length === 1 ? `0${segundos.toString()}` : segundos
    const dataFormatada = `${ano}-${ajusteMes}-${ajusteDia}T${ajusteHora}:${ajusteMinutos}:${ajusteSegundos}`
    return dataFormatada
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    const fileExtension = file.name.split('.').pop();
  
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const base64Image = btoa(new Uint8Array(reader.result).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        const base64ImageFinal = `data:image/${fileExtension};base64,${base64Image}`
        this.formNewContact.get('base64Image')?.setValue(base64ImageFinal);
        this.data.foto = base64ImageFinal;
        this.fotoUrl = base64ImageFinal;
      }
    };
  
    reader.readAsArrayBuffer(file);
  }


  chooseFile() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }


}
