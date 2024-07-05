import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PadesSignatureComponent } from './pades-signature-component/pades-signature-component.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PadesSignatureComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-pkisuitesample-pkiexpress';
}
