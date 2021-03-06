import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import * as LocalNotifications from 'nativescript-local-notifications';


@Injectable()
export class FavoriteService {

    favorites: Array<string>;
    

    constructor(private dishservice: DishService) {
        
            this.favorites = [];
           
    }

    isFavorite(id: string): boolean {
        return this.favorites.some(el => el === id);
    }

    addFavorite(id: string): boolean {
        if(!this.isFavorite(id)) {
            this.favorites.push(id);

        }
        return true;
    }

    getFavorites(): Observable<Dish[]> {

        return this.dishservice.getDishes()
            .pipe(map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish.id.toString()))));
    }


    deleteFavorite(id: string): Observable<Dish[]> {
        let index = this.favorites.indexOf(id);
        if (index >= 0) {
            this.favorites.splice(index,1);
           
            return this.getFavorites();
        }
        else {
            return throwError('Deleting non-existant favorite');
        }
    }


schedule():void {
     LocalNotifications.schedule([{
        id: +id,
        title: "ConFusion Favorites",
        body: 'Dish ' + id + ' added successfully'
      }])
      .then(() => console.log('Notification scheduled'),
        (error) => console.log('Error showing nofication ' + error));

    }
}