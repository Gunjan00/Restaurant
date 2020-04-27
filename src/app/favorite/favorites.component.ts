import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { FavoriteService } from '../services/favorite.service';
import { ListViewEventData, RadListView } from 'nativescript-ui-listview';
import { RadListViewComponent } from 'nativescript-ui-listview/angular';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { View } from 'tns-core-modules/ui/core/view';
import { confirm } from "tns-core-modules/ui/dialogs";
import { Toasty, ToastDuration, ToastPosition } from 'nativescript-toasty';
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";



@Component({
  selector: 'app-favorites',
  moduleId: module.id,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoriteComponent implements OnInit {

    favorites:ObservableArray<Dish>;
    errMess: string;
    
  
    @ViewChild('myListView',{static: true}) listViewComponent: RadListViewComponent;

    constructor(private favoriteService: FavoriteService,
     
      @Inject('baseURL') private baseURL) {
       }
  
    ngOnInit() {
      this.favoriteService.getFavorites()
            .subscribe(favorites => this.favorites = new ObservableArray(favorites),
                errmess => this.errMess = errmess);
    }


    deleteFavorite(id: string) {
      console.log('delete', id);
  
      let options = {
          title: "Confirm Delete",
          message: 'Do you want to delete Dish '+ id,
          okButtonText: "Yes",
          cancelButtonText: "No",
          neutralButtonText: "Cancel"
      };
  
      confirm(options).then((result: boolean) => {
          if(result) {
  
            this.favorites = null;
  
            this.favoriteService.deleteFavorite(id)
                .subscribe(favorites => { 
                  const toast = new Toasty({ text : "Deleted Dish "+ id});
                  toast.setToastDuration( ToastDuration.SHORT);
                  toast.setToastPosition(ToastPosition.BOTTOM);
                  toast.show();
                  this.favorites = new ObservableArray(favorites);
                },
                errmess => this.errMess = errmess);
          }
          else {
            console.log('Delete cancelled');
          }
      });
  
    }
    

  public onCellSwiping(args: ListViewEventData) {
      var swipeLimits = args.data.swipeLimits;
      var currentItemView = args.object;
      var currentView;

      if(args.data.x > 200) {

      }
      else if (args.data.x < -200) {

      }
  }

  public onSwipeCellStarted(args: ListViewEventData) {
      var swipeLimits = args.data.swipeLimits;
      var swipeView = args['object'];

      var leftItem = swipeView.getViewById<View>('mark-view');
      var rightItem = swipeView.getViewById<View>('delete-view');
      swipeLimits.left = leftItem.getMeasuredWidth();
      swipeLimits.right = rightItem.getMeasuredWidth();
      swipeLimits.threshold = leftItem.getMeasuredWidth()/2;
  }

  public onSwipeCellFinished(args: ListViewEventData) {

  }

  public onLeftSwipeClick(args: ListViewEventData) {
      console.log('Left swipe click');
      this.listViewComponent.listView.notifySwipeToExecuteFinished();
  }

  public onRightSwipeClick(args: ListViewEventData) {
      this.deleteFavorite(args.object.bindingContext.id);
      this.listViewComponent.listView.notifySwipeToExecuteFinished();
  }



   onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
  
}