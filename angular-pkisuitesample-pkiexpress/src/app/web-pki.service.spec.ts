import { TestBed } from '@angular/core/testing';

import { WebPkiService } from './web-pki.service';

describe('SelectedCertificateService', () => {
  let service: WebPkiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebPkiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
