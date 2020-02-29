import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintImgComponent } from './print-img.component';

describe('PrintImgComponent', () => {
  let component: PrintImgComponent;
  let fixture: ComponentFixture<PrintImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
