import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

//Page Imports
import { LoginPage } from './pages/login/login';
import { SignupPage } from "./pages/signup/signup";
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';

//Component Imports
import { TimelineComponent } from './components/timeline/timeline';
import { ProfileSidePanelComponent } from './components/profile-side-panel/profile-side-panel';
import { TimelinePostComponent } from './components/timeline/timeline-post/timeline-post';
import { NavbarComponent } from './components/navbar/navbar';
import { WidgetsComponent } from './components/widgets/widgets';
import { ProfileBannerComponent } from './pages/profile/profile-banner/profile-banner';
import { LoginInfoComponent } from './pages/signup/login-info-component/login-info-component';
import { AccountImagesComponent } from './pages/signup/account-images-component/account-images-component';
import { AccountLinkComponent } from './pages/signup/account-link-component/account-link-component';

//Service Imports
import { HttpClient } from './services/http-interceptor-service';
import { AuthService } from './services/auth-service';
import { AuthGuard } from './services/auth-guard';

//Imports Imports
import { DragulaModule } from 'ng2-dragula';

//Pipe Imports
import { PasswordStrengthPipe } from './pipes/password-strength-pipe';
import { InputValidationPipe } from "./pipes/input-validation-pipe";

//Routing Imports
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
  	AppComponent, LoginPage, SignupPage, HomePage, ProfilePage,
  	ProfileSidePanelComponent, TimelinePostComponent, NavbarComponent, WidgetsComponent, 
    ProfileBannerComponent, TimelineComponent, LoginInfoComponent,
    PasswordStrengthPipe, InputValidationPipe,
    AccountImagesComponent, AccountLinkComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing, DragulaModule
  ],
  providers: [
      appRoutingProviders, HttpClient, AuthService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
