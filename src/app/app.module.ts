import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
//Page Imports
import { Pages } from './bundles/page.exports';
let pagesBundle = new Pages();
let pages = pagesBundle.getPages();

//Component Imports
import { Components } from './bundles/component.exports'
let componentsBundle = new Components();
let components = componentsBundle.getComponents();

//Service Imports
import { Services } from './bundles/service.exports';
let servicesBundle = new Services();
let services = servicesBundle.getServices();

//Imports Imports
import { Imports } from './bundles/imports.exports';
let importsBundle = new Imports();
let imports = importsBundle.getImports();

//Routing Imports
import { routing, appRoutingProviders } from './app.routing';

@NgModule({
  declarations: [...pages, ...components],
  imports: [
    BrowserModule, FormsModule, HttpModule, routing, ...imports
  ],
  providers: [appRoutingProviders, ...services],
  bootstrap: [AppComponent]
})
export class AppModule { }
