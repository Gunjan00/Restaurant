import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HomeComponent } from "./home/home.component";
import { MenuComponent } from "./menu/menu.component";
import { DishdetailComponent } from "./dishdetail/dishdetail.component";
import { ContactComponent } from "./contact/contact.component";
import { AboutComponent } from "./about/about.component";
import { FavoriteComponent } from "./favorite/favorites.component";
import { ReservationComponent } from "./reservation/reservation.component";
import { ReservationModalComponent } from "./reservationmodal/reservationmodal.component";
import { CommentComponent } from "./comment/comment.component";
import { UserAuthComponent } from "./userauth/userauth.component";

import { DishService } from './services/dish.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { FavoriteService } from './services/favorite.service';
import { CouchbaseService } from './services/couchbase.service';
import { PlatformService } from './services/platform.service';
import { baseURL } from './shared/baseurl';



// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NativeScriptFormsModule,
        ReactiveFormsModule
        
       

    ],
    declarations: [
        AppComponent,
        MenuComponent,
        DishdetailComponent,
        HomeComponent,
        ContactComponent,
        AboutComponent,
        FavoriteComponent,
        ReservationComponent,
        ReservationModalComponent,
        CommentComponent,
        UserAuthComponent
    ],

    entryComponents: [ReservationModalComponent,CommentComponent],
    
    providers: [
        DishService,
        ProcessHTTPMsgService,
        {provide: 'baseURL', useValue: baseURL},
        LeaderService,
        PromotionService,
        FavoriteService,
        CouchbaseService,
        PlatformService
        
    ],

schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
