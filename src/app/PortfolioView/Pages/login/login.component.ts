import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Services/login.service';
import { GlobalErrorHandlerService } from 'src/Services/global-error-handler.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: any;
  password: any;
  loginForm: FormGroup | any;
  hide = true;
  hideShowLoginContent: boolean = true;
  myerr:any;

  constructor(
    private authenticationService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private connErr: GlobalErrorHandlerService,
    private http: HttpClient  ,
    // private _snackBar: MatSnackBar,

  ) {}

  showPasswordValidationPage() {
    this.hideShowLoginContent = this.hideShowLoginContent ? false : true;
  }

  ngOnInit() {
    this.myerr = "";
    // localStorage.removeItem("Token");
    // localStorage.removeItem("isLoggedIn");
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.loginForm.value, 'hiiii');
  }
  checkData() {
    var password: any = this.f.password.hasError('required');
    var user: any = this.f.username.hasError('required');
  }
  get f() {
    return this.loginForm.controls;
  }

  navigateTo: any;
  getUrl() {
    this.navigateTo = localStorage.getItem('backUrl');
    console.log(this.navigateTo,"navi")
    if (!this.navigateTo) {
      this.navigateTo = '/dashboard';
      console.log(this.navigateTo,"rrrrrr")
    }
  }

  login() {
    console.log('ddd',this.f.username.value,this.f.password.value);
    
    this.authenticationService
      .validateUser(this.f.username.value, this.f.password.value)
      .subscribe((user: any ) => {
        console.log('ddd');
        console.log(user,"dsdd")
        // console.log(user.body.authorities[0].name,"data")
        localStorage.setItem('isLoggedIn', 'true');
        
        var role=user.body.roles[0];
        // var role = user.body.authorities[0].name;

        if (
          // role === 'ROLE_SYS_ADMIN' ||
          // role === 'ROLE_TECHNICAL_SUPPORT' ||
          // role === 'ROLE_CUSTOMER_ADMIN' ||
          // role === 'ROLE_PROJECT_ADMIN' ||
          role==='ROLE_USER'||
          role==="ROLE_MODERATOR" 
          // role === 'MODRATOR' ||
          // role === 'ADMIN'
        ) {
          console.log('ddd',user.body.accessToken);
          var token = user.body.accessToken;
          console.log("token",token)
          localStorage.setItem('Token', token);
          localStorage.setItem('device', 'app');
          this.getUrl();
          this.router.navigateByUrl(this.navigateTo);
          localStorage.removeItem('backUrl');
        }
          // else {
          //   this.myerr = "You are not Authenticated User.";
          //   this.openSnackBar();
          // }
      });
  }
  // openSnackBar() {
  //   this._snackBar.open("You are not Authenticated User.", "Sorry", {
  //     duration: 2000,
  //     horizontalPosition: "right",
  //     verticalPosition: "bottom",
  //   });
  // }
}
