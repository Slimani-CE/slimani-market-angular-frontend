import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Slimani Market';
  public profile? : KeycloakProfile;
  public roles : string[] = [];

  constructor(private keycloakService : KeycloakService) {

  }

  ngOnInit(): void {
    if (this.keycloakService.isLoggedIn()) {
      this.roles = this.keycloakService.getUserRoles().filter(role => role === "ADMIN" || role === "USER");

      this.keycloakService.loadUserProfile().then(profile => {
        this.profile = profile;
        console.log(profile)
      });
    }
  }

  async login() {
    await this.keycloakService.login({
      redirectUri: window.location.origin
    });
  }

  logout() {
    this.keycloakService.logout(window.location.origin)
  }
}
