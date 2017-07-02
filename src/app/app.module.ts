// Core Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

// Page Imports
import { LoginPage } from './pages/login/login';
import { SignupPage } from './pages/signup/signup';
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';
import { SettingsPage } from './pages/settings/settings';

// Component Imports
import { ProfileSidePanelComponent } from './components/profile-side-panel/profile-side-panel';
import { NavbarComponent } from './components/navbar/navbar';
import { ChatbarComponent } from './components/chatbar/chatbar';
import { ProfileBannerComponent } from './pages/profile/profile-banner/profile-banner';
import { LoginInfoComponent } from './pages/signup/login-info-component/login-info-component';
import { ExpProfilePic } from './components/exp-profile-pic/exp-profile-pic';

// Service Imports
import { HttpClient } from './services/http-interceptor-service';
import { AuthService } from './services/auth-service';
import { AuthGuard } from './services/auth-guard';
import { EventService } from './services/event-service';
import { ImageService } from './services/image-service';
import { CountoModule } from 'angular2-counto';
import { UserService } from './services/user-service';
import { LightboxModule } from 'angular2-lightbox';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { BaseService } from './services/base-service';
// NGX-Bootstrap Imports
import { SortableModule } from 'ngx-bootstrap/sortable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Pipe Imports
import { ExpCalcPipe } from './pipes/exp-calc-pipe';
import { PasswordStrengthPipe } from './pipes/password-strength-pipe';
import { InputValidationPipe } from './pipes/input-validation-pipe';

// Routing Imports
import { routing, appRoutingProviders } from './app.routing';

// Module Imports
import { TimelineModule } from './components/timeline/timeline.module';

@NgModule({
  declarations: [
   AppComponent, LoginPage, SignupPage, HomePage,
   ProfilePage, ProfileSidePanelComponent, NavbarComponent,
   ChatbarComponent, ProfileBannerComponent,LoginInfoComponent,
   PasswordStrengthPipe, InputValidationPipe, ExpCalcPipe, ExpProfilePic,
   SettingsPage
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing, TimelineModule,
    CountoModule, SortableModule.forRoot(),
    LightboxModule, RoundProgressModule, Ng2PageScrollModule.forRoot(), BsDropdownModule.forRoot()
  ],
  providers: [
      appRoutingProviders, HttpClient, AuthService, AuthGuard,
      EventService, ImageService, UserService, ExpCalcPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

