import { NgModule, Optional, SkipSelf } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ApolloModule } from "apollo-angular";
import { HttpLinkModule } from "apollo-angular-link-http";

@NgModule({
  declarations: [],
  imports: [HttpClientModule, ApolloModule, HttpLinkModule],
  providers: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "Core is already loaded. Import it in the AppModule only"
      );
    }
  }
}
