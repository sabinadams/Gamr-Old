//Core Imports
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
import { ChatbarComponent } from './components/chatbar/chatbar';
import { ProfileBannerComponent } from './pages/profile/profile-banner/profile-banner';
import { LoginInfoComponent } from './pages/signup/login-info-component/login-info-component';
import { ExpProfilePic } from './components/exp-profile-pic/exp-profile-pic';

//Service Imports
import { HttpClient } from './services/http-interceptor-service';
import { AuthService } from './services/auth-service';
import { AuthGuard } from './services/auth-guard';
import { SocialService } from './services/social-service';
import { MomentModule } from 'angular2-moment';
import { EventService } from './services/event-service';
import { ImageService } from './services/image-service';
import { CountoModule }  from 'angular2-counto';
import { UserService }  from './services/user-service';


//NGX-Bootstrap Imports
import { AlertModule } from 'ngx-bootstrap';
import { SortableModule } from 'ngx-bootstrap/sortable';

//Pipe Imports
import { ExpCalcPipe } from "./pipes/exp-calc-pipe";
import { PasswordStrengthPipe } from './pipes/password-strength-pipe';
import { InputValidationPipe } from "./pipes/input-validation-pipe";

//Routing Imports
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
  	AppComponent, LoginPage, SignupPage, HomePage, 
    ProfilePage, ProfileSidePanelComponent, TimelinePostComponent, NavbarComponent, 
    ChatbarComponent, ProfileBannerComponent, TimelineComponent, LoginInfoComponent,
    PasswordStrengthPipe, InputValidationPipe, ExpCalcPipe, ExpProfilePic
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing, 
    MomentModule, CountoModule, AlertModule.forRoot(), SortableModule.forRoot()
  ],
  providers: [
      appRoutingProviders, HttpClient, AuthService, AuthGuard, 
      SocialService, EventService, ImageService, UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
