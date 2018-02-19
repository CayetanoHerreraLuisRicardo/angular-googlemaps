// ANGULAR
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// COMPONENTS
import { AppComponent } from './app.component';
import { MapComponent } from './shared/components/map.component';
// SERVICES
import { CollectionService } from './shared/services/collection.service';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CollectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
