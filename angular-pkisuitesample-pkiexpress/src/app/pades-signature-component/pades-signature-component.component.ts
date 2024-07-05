import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebPkiComponent } from '../web-pki/web-pki.component';
import LacunaWebPKI from 'web-pki';
import { WebPkiService } from '../web-pki.service';
import { PadesVisualElements } from '../pades-visual-elements.model';
import { SignatureService } from '../signature.service';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-pades-signature-component',
  standalone: true,
  templateUrl: './pades-signature-component.component.html',
  imports: [WebPkiComponent],
  styleUrl: './pades-signature-component.component.css',
})
export class PadesSignatureComponent {
  selectedCertContent: string = '';
  selectedCertThumbprint: string = '';

  constructor(
    private webPkiService: WebPkiService,
    private signatureService: SignatureService
  ) 
  {}

  ngOnInit() {
    this.webPkiService.selectedCertificate$.subscribe((data) => {
      this.selectedCertContent = data.certContent;
      this.selectedCertThumbprint = data.thumbprint;
    });

    this.webPkiService.signedHash$.subscribe((signedHash) => {
      if(signedHash != ""){
        this.finishSignature(signedHash);
      }
    })
  }

  signWithSelectedCert() {
    alert(
      `Selected Certificate:\nCertificateContent: ${this.selectedCertContent}\nThumbprint: ${this.selectedCertThumbprint}`
    );
    this.performSignature();
  }

  async performSignature() {
    // start the signature 
    this.startSignature();
  }

  async startSignature() {
    this.signatureService.startSignature(this.selectedCertContent)
      .pipe(
        tap((response => {
            // Send toSignHash, digestAlgorithm, and thumbprint to WebPKI component for signing
          this.webPkiService.sendToSignInfo(response.toSignHash, response.digestAlgorithm, this.selectedCertThumbprint);
        }),
        catchError(error => {
          console.error('Error starting signature:', error);
          return of(null);
        })
      ))
      .subscribe();
  }
  
  finishSignature(signedHash: any) { 
    const signature = { signedHash };
    this.signatureService.finishSignature(signature)
      .pipe(
        tap(response => {
          console.log('Finish Signature Response:', response);
        }),
        catchError(error => {
          console.error('Error finishing signature:', error);
          return of(null);
        })
      )
      .subscribe();
  }
}
