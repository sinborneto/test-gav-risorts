import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { UntypedFormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() form: UntypedFormGroup = this.fb.group({
    textArea: ['', Validators.required],
  });
  @Input() title!: string;
  @Input() type!: string;
  @Input() modalWidth = '100%';
  @Input() list: any[] = [];
  @Input() titleList: any[] = [];
  @Input() cancelButtonText = 'Fechar';
  @Input() confirmButtonText = '';
  @Input() firstLineAsTitle!: boolean;
  @Input() payWithCredit: any;
  @Input() textArea = false;
  @Input() set textAreaValue(value: string) {
    value && this.form.patchValue({ textArea: value });
  }
  @Input() labelTextArea = '';
  @Input() textInput = false;
  @Input() iconModal = false;
  @Input() customTextArea = '';
  @Input() customTitleTextArea = '';

  listArray: any = [
    {
      description: '',
      title: '',
    },
  ];

  constructor(public modal: NgbActiveModal, private fb: UntypedFormBuilder) {}

  ngOnInit() {
    this.listArray = [
      {
        description: this.list,
        title: this.titleList,
      },
    ];
  }

  onCancel() {
    this.modal.close();
  }

  onConfirm() {
    if (this.textArea || this.textInput) {
      this.form.markAllAsTouched();
      this.form.controls['textArea'].markAsDirty();
      if (this.form.valid) {
        this.modal.close({ textArea: this.form.controls['textArea'].value });
        return;
      } else return;
    }
    this.modal.close(true);
  }
}
