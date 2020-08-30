import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { ToastController, Platform } from "@ionic/angular";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

const jwt = new JwtHelperService();

@Injectable()
export class AuthenticationService {
  authState = new BehaviorSubject(false);
  private decodedToken: any;

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController,
    private http: HttpClient
  ) {
    this.platform.ready().then(() => {
      this.isLoggedIn();
    });
  }

  isLoggedIn() {
    this.storage.get("USER_INFO").then((response) => {
      if (response) {
        this.authState.next(true);
      }
    });
  }

  public signup(userData: any): Observable<any> {
    let formatedData = {
      username: userData.email,
      password: userData.password,
      email: userData.email,
      first_name: userData.name,
    };
    return this.http.post(
      "https://dnappserver.herokuapp.com/api/v1/user/",
      formatedData
    );
  }

  public login(userData: any): Observable<any> {
    let formatedData = {
      username: userData.email,
      password: userData.password,
    };

    return this.http
      .post("https://dnappserver.herokuapp.com/api/v1/login/", formatedData)
      .pipe(
        map((res: any) => {
          let token = res.token
          console.log(token);
          return this.saveToken(token);
        })
      );
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_meta", JSON.stringify(this.decodedToken));
    return token;
  }

  logout() {
    this.storage.remove("USER_INFO").then(() => {
      this.router.navigate(["login"]);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
