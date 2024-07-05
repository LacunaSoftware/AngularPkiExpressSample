import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadesSignatureComponent } from './pades-signature-component.component';

describe('PadesSignatureComponentComponent', () => {
  let component: PadesSignatureComponent;
  let fixture: ComponentFixture<PadesSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PadesSignatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PadesSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
