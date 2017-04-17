import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

//Page Imports
import { Pages } from './bundles/page.exports';
let pages = new Pages();

//Component Imports
import { Components } from './bundles/component.exports'
let components = new Components();

//Service Imports
import { Services } from './bundles/service.exports';
let services = new Services();

//Routing Imports
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [...pages.getPages(), ...components.getComponents()],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing
  ],
  providers: [appRoutingProviders, ...services.getServices()],
  bootstrap: [AppComponent]
})
export class AppModule { }
