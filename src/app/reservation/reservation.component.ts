import { Component, OnInit, ChangeDetectorRef,  ViewContainerRef } from '@angular/core';
import { TextField } from 'tns-core-modules/ui/text-field';
import { Switch } from 'tns-core-modules/ui/switch';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ReservationModalComponent } from "../reservationmodal/reservationmodal.component";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Page } from "tns-core-modules/ui/page";
import { Animation, AnimationDefinition } from "tns-core-modules/ui/animation";
import { View } from "tns-core-modules/ui/core/view";
import * as enums from "tns-core-modules/ui/enums";
import { CouchbaseService } from '../services/couchbase.service';
import { Reservation } from '../shared/reservation'

@Component({
    selector: 'app-reservation',
    moduleId: module.id,
    templateUrl: './reservation.component.html',
    styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

    reservation: FormGroup;
    form: View;
    acknowledge: View;
    showSubmission: boolean = false;

    resrvSub: Reservation;

    reservations: Reservation[];

    docId: string = "reservations";

    constructor(private formBuilder: FormBuilder,
                private modalService: ModalDialogService, 
                private vcRef: ViewContainerRef,
                private page: Page,
                private couchbaseService: CouchbaseService) {

                   
            this.reservation = this.formBuilder.group({
                guests: 3,
                smoking: false,
                dateTime: ['', Validators.required]
            });
    }

    createModalView(args) {

        let options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: args,
            fullscreen: false
        };

        this.modalService.showModal(ReservationModalComponent, options)
            .then((result: any) => {
                if (args === "guest") {
                    this.reservation.patchValue({guests: result});
                }
                else if (args === "date-time") {
                    this.reservation.patchValue({ dateTime: result});
                }
            });

    }




    ngOnInit() {

    }

    onSmokingChecked(args) {
        let smokingSwitch = <Switch>args.object;
        if (smokingSwitch.checked) {
            this.reservation.patchValue({ smoking: true });
        }
        else {
            this.reservation.patchValue({ smoking: false });
        }
    }

    onGuestChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ guests: textField.text});
    }

    onDateTimeChange(args) {
        let textField = <TextField>args.object;

        this.reservation.patchValue({ dateTime: textField.text});
    }

    onSubmit() {

            this.form = <View>this.page.getViewById<View>("form");
            this.acknowledge = <View>this.page.getViewById<View>("acknowledge");

        
        console.log(JSON.stringify(this.reservation.value));

        this.resrvSub = this.reservation.value;
    




            let definitions = new Array<AnimationDefinition>();
                let a1: AnimationDefinition = {
                    target: this.form,
                     scale: { x: 0, y: 0 },
                     translate: { x: 0, y: -200 },
                    opacity: 0,
                    duration: 500,
                    curve: enums.AnimationCurve.easeIn
                };
                definitions.push(a1);

                let a2: AnimationDefinition = {
                    target: this.acknowledge,
                     scale: { x: 1, y: 1 },
            translate: { x: 0, y: 0 },
                    opacity: 1,
                    duration: 500,
                    curve: enums.AnimationCurve.easeIn
                };
                definitions.push(a2);

                let animationSet = new Animation(definitions);

                animationSet.play().then(() => {
                     this.showSubmission = true;
                })
                .catch((e) => {
                    console.log(e.message);
                });
    }


     onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}