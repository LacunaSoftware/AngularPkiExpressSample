import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import LacunaWebPKI from 'web-pki';
import { WebPkiService } from '../web-pki.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-web-pki',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web-pki.component.html',
  styleUrl: './web-pki.component.css',
})
export class WebPkiComponent {
  certificates: any[] = [];
  selectedCertificate: any = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private webPkiService: WebPkiService
  ) {}

  ngOnInit() {
    this.initializeWebPki();
  }

  initializeWebPki() {
    const pki = new LacunaWebPKI();

    pki.init({
      ready: () => this.loadCertificates(pki),
    });

    // Pass pkiExpress to sign hashes
    this.webPkiService.toSignInfo$
      .pipe(
        tap(({ toSignHash, digestAlgorithm, thumbprint }) => {
          // Perform signing using WebPKI and handle the promise
          this.signHash(pki, thumbprint, toSignHash, digestAlgorithm)
            .then((response) => {
              this.webPkiService.setSignedHash(response);
            })
            .catch((error) => {
              console.error('Error signing hash:', error);
            });
        })
      )
      .subscribe();
  }

  private async signHash(
    pki: LacunaWebPKI,
    thumbprint: string,
    toSignHash: string,
    digestAlgorithm: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      pki
        .signHash({
          thumbprint: thumbprint,
          hash: toSignHash,
          digestAlgorithm: digestAlgorithm,
        })
        .success(function (signature: string) {
          resolve(signature);
        })
        .fail(function (error: any) {
          reject(error);
        });
    });
  }

  loadCertificates(pki: any) {
    pki
      .listCertificates()
      .success((certs: any[]) => {
        this.certificates = certs;
        this.cdr.detectChanges();
      })
      .error((error: any) => {
        console.error('Failed to list certificates:', error);
      });
  }

  onCertificateChange(event: any) {
    const selectedIndex = event.target.value;
    if (selectedIndex !== '') {
      this.selectedCertificate = this.certificates[selectedIndex];
      const pki = new LacunaWebPKI();
      pki
        .readCertificate(this.selectedCertificate.thumbprint)
        .success((certEncoded) => {
          this.webPkiService.updateSelectedCertificate(
            certEncoded,
            this.selectedCertificate.thumbprint
          );
        });
      this.cdr.detectChanges();
    } else {
      this.selectedCertificate = null;
      this.webPkiService.updateSelectedCertificate('', '');
      this.cdr.detectChanges();
    }
  }
}
