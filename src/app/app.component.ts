import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { AuthenticationService, JWTToken } from 'projects/core/src/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  profileForm = new FormGroup({
    text: new FormControl('')
  });

  constructor(private authService: AuthenticationService) {
  }

  actualJWT:JWTToken;

  onSubmit() {
    this.authService.login('hadmin', 'admin').subscribe(
      res => {
        console.log(res)
        this.actualJWT = <JWTToken>res;
        console.log("parsed")
        console.log(this.actualJWT)
      },
      err => {
        console.log(err.status)
      }
    )
  }

  click() {
    this.authService.checkModuleWorking().subscribe(
      res => { console.log(res) }
    )
  }

}
