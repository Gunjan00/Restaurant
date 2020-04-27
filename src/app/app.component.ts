import { Component, OnInit, OnDestroy } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import * as app from "tns-core-modules/application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { login, LoginResult } from "tns-core-modules/ui/dialogs";
import { getString, setString } from "tns-core-modules/application-settings";
import { filter } from "rxjs/operators";
import { PlatformService } from './services/platform.service'; 


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions,
                private platformService: PlatformService) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
                
                
                this.platformService.printPlatformInfo(); 
                this.platformService.startMonitoringNetwork()
                .subscribe((message: string) => {
                console.log(message); 
                
                });
    


        this._activatedUrl = "/menu";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }    

    ngOnDestroy() { 
    
    this.platformService.stopMonitoringNetwork(); 
    
  } 

}