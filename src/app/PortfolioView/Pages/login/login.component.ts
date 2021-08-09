import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/Services/login.service';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:any;
   password: any;
   loginForm: FormGroup|any;
  loading = true;
 
  constructor(
  
     private authenticationService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient, ){}

  hide=true;
  hideShowLoginContent:boolean=true;
  showPasswordValidationPage(){
    this.hideShowLoginContent=this.hideShowLoginContent?false:true;
  }

  ngOnInit() {
    // this.myerr = "";
    localStorage.removeItem("Token");
    localStorage.removeItem("isLoggedIn");
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
    });
    console.log("Hello from login")
  }
  checkData() {
    var password:any = this.f.password.hasError("required");
    var user:any = this.f.username.hasError("required");
    
  }

  get f() {
    return this.loginForm.controls;
  }

  navigateTo:any;
  getUrl() {
    this.navigateTo = localStorage.getItem("backUrl");
    if (!this.navigateTo) {
      this.navigateTo = "/dashboard";
      console.log(this.navigateTo)
    }
  }


  login() {
    this.authenticationService
    .validateUser(this.f.username.value, this.f.password.value)
      .subscribe((user:any)=> {
        localStorage.setItem("isLoggedIn", "true");
        var role = user.body.authorities[0].name;
        if (role === "ROLE_SYS_ADMIN" || role ==="ROLE_TECHNICAL_SUPPORT"||role==="ROLE_CUSTOMER_ADMIN"||role==="ROLE_PROJECT_ADMIN") {
          var token = user.headers.get("x-auth-token");
          localStorage.setItem("Token", token);
          localStorage.setItem("device", "app")
          this.getUrl();
          this.router.navigateByUrl(this.navigateTo);
          localStorage.removeItem("backUrl");
        }
      });
  }


}
