import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebPkiService {
  private selectedCertificateSource = new BehaviorSubject<{certContent: string, thumbprint: string}>({certContent: '', thumbprint: ''});
  private toSignInfoSubject = new Subject<{ toSignHash: string, digestAlgorithm: string, thumbprint: string }>();
  private signedHashSubject = new Subject<string>();
  
  // Observable to selectedCertificate
  selectedCertificate$ = this.selectedCertificateSource.asObservable();

  // Observable to listen to toSignHash
  toSignInfo$ = this.toSignInfoSubject.asObservable();
  
  // Observable to listen to signedHash
  signedHash$ = this.signedHashSubject.asObservable();


  updateSelectedCertificate(certContent: string, thumbprint: string) {
    this.selectedCertificateSource.next({certContent, thumbprint});
  }

  sendToSignInfo(toSignHash: string, digestAlgorithm: string, thumbprint: string) {
    this.toSignInfoSubject.next({ toSignHash, digestAlgorithm, thumbprint });
  }

  setSignedHash(signedHash: string) {
    this.signedHashSubject.next(signedHash);
  }
  
}
