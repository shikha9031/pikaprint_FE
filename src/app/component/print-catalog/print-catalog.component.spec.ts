import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCatalogComponent } from './print-catalog.component';

describe('PrintCatalogComponent', () => {
  let component: PrintCatalogComponent;
  let fixture: ComponentFixture<PrintCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
