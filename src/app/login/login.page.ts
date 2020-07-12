import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';

import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;

  usernameFormControl: FormControl;
  passwordFormControl: FormControl;

  constructor(
    private usersSvc: UsersService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.usernameFormControl = new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    });

    this.passwordFormControl = new FormControl(null, {
      updateOn: 'blur',
      validators: [Validators.required],
    });

    this.form = new FormGroup({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
    });
  }

  login() {
    this.usersSvc
      .login(this.form.value.username, this.form.value.password)
      .subscribe(
        (response: any) => {
          let message = 'Invalid Response From the Server';
          let routeTo = 'login';

          if (response && response.status) {
            message = response.data.token;
            routeTo = 'dashboard';
            this.usersSvc.isLoggedIn = true;
          }

          this.alertCtrl
            .create({
              header: 'Server Response',
              message,
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.router.navigate([routeTo]);
                  },
                },
              ],
            })
            .then((el) => {
              el.present();
            });
        },
        (err) => {
          console.log(err);

          if (err && err.body && err.body.data && err.body.data.message) {
            this.alertCtrl
              .create({
                header: 'Server Response',
                message: err.body.data.message,
                buttons: [
                  {
                    text: 'Ok',
                    handler: () => {
                      this.usernameFormControl.setErrors({
                        incorrect: true,
                      });
                      this.passwordFormControl.setErrors({
                        incorrect: true,
                      });
                    },
                  },
                ],
              })
              .then((el) => {
                el.present();
              });
          }
        }
      );
  }

  clear() {
    this.form.reset();
    this.usernameFormControl.setErrors(null);
    this.passwordFormControl.setErrors(null);
  }
}
