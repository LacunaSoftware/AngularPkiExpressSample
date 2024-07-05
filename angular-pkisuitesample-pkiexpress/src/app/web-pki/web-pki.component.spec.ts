import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebPkiComponent } from './web-pki.component';

describe('WebPkiComponent', () => {
  let component: WebPkiComponent;
  let fixture: ComponentFixture<WebPkiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebPkiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebPkiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
