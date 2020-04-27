import { Component, OnInit, Inject } from '@angular/core';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as Email from 'nativescript-email';
import * as TNSPhone from 'nativescript-phone';


@Component({
  selector: 'app-contact',
  moduleId: module.id,
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {

    constructor(){}

    ngOnInit() {}



     onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    sendEmail() {

    Email.available()
      .then((avail: boolean) => {
        if (avail) {
          Email.compose({
            to: ['confusion@food.net'],
            subject: '[ConFusion]: Query',
            body: 'Dear Sir/Madam:'
          });
        }
        else
          console.log('No Email Configured');
      })

  }

   callRestaurant() {
        TNSPhone.dial('85212345678', true);
    }
    

}