// Core Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// Component Imports
import { TimelineComponent } from './timeline';
import { FeedItemComponent } from './feed-item/feed-item';
import { FeedModalComponent } from './feed-modal/feed-modal';
import { PostFormComponent } from './post-form/post-form';

// Module Imports
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

// Service Imports
import { HttpClient } from '../../services/http-interceptor-service';
import { TimelineService } from './shared/timeline-service';
import { MomentModule } from 'angular2-moment';
import { BaseService } from '../../services/base-service';

@NgModule({
  declarations: [ TimelineComponent, FeedItemComponent, FeedModalComponent, PostFormComponent ],
  imports: [ BrowserModule, FormsModule, HttpModule, MomentModule, BsDropdownModule.forRoot(), ModalModule.forRoot(), RouterModule ],
  providers: [ HttpClient, TimelineService, BaseService ],
  exports: [ TimelineComponent ],
  bootstrap: [TimelineComponent]
})
export class TimelineModule { }
