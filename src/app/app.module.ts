import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavBarComponent } from "./shared/components/nav-bar/nav-bar.component";
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { GraphQLModule } from "./graphql/graphql.module";

@NgModule({
  declarations: [AppComponent, NavBarComponent],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    GraphQLModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
