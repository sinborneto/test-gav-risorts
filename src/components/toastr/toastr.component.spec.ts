import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IndividualConfig, ToastPackage, ToastRef, ToastrModule, ToastrService } from 'ngx-toastr';

import { ToastrComponent } from './toastr.component';

const event = new Event('submit');

describe(ToastrComponent.name, () => {
  let component: ToastrComponent;
  let fixture: ComponentFixture<ToastrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrModule.forRoot(), BrowserAnimationsModule],
      declarations: [ToastrComponent],
      providers: [{ provide: ToastPackage, useClass: MockToastPackage }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#stopPragation should have been called ${ToastrComponent.prototype.action} is called`, () => {
    const eventSpy = jest.spyOn(event, 'stopPropagation').mockImplementation(() => {});
    component.action(event);
    expect(eventSpy).toHaveBeenCalledTimes(1);
  });

  it(`#triggerAction should have been callled ${ToastrComponent.prototype.action} is called`, () => {
    const toastSpy = jest.spyOn(component.toastPackage, 'triggerAction');
    component.action(event);
    expect(toastSpy).toHaveBeenCalledTimes(1);
  });

  it(`#${ToastrComponent.prototype.undoString} should be equal to 'undid' when ${ToastrComponent.prototype.action} is called`, () => {
    component.action(event);
    expect(component.undoString).toEqual('undid');
  });

  it(`#${ToastrComponent.prototype.action} should return false when is called`, () => {
    const result = component.action(event);
    expect(result).not.toBeTruthy();
  });
});

@Injectable()
class MockToastPackage extends ToastPackage {
  constructor() {
    const toastConfig = { toastClass: 'customToast' };
    super(1, <IndividualConfig>toastConfig, 'test message', 'test title', 'show', new ToastRef(null!));
  }
}
