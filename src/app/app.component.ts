import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Inventory-webapp';
  constructor(private _authService: AuthenticationService){}

  ngOnInit(): void {
      this._authService.sendAuthStateChangeNotification(this._authService.isLogged());
    }
}
