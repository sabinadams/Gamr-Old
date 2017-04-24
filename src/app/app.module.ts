import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

//Page Imports
import { LoginPage } from './pages/login/login';
import { HomePage } from './pages/home/home';
import { ProfilePage } from './pages/profile/profile';

//Component Imports
import { TimelineComponent } from './components/timeline/timeline';
import { ProfileSidePanelComponent } from './components/profile-side-panel/profile-side-panel';
import { TimelinePostComponent } from './components/timeline/timeline-post/timeline-post';
import { NavbarComponent } from './components/navbar/navbar';
import { TimelineCommentComponent } from './components/timeline/timeline-comment/timeline-comment';
import { TimelineReplyComponent } from './components/timeline/timeline-reply/timeline-reply';
import { WidgetsComponent } from './components/widgets/widgets';

//Service Imports

//Imports Imports
import { DragulaModule } from 'ng2-dragula';



//Routing Imports
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [
  	AppComponent,LoginPage, HomePage, ProfilePage, TimelineComponent, 
  	ProfileSidePanelComponent, TimelinePostComponent, TimelineCommentComponent, NavbarComponent,
  	TimelineReplyComponent, WidgetsComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing, DragulaModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
