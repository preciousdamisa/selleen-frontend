import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  currentLocation?: GeolocationCoordinates;

  getCurrentLocation() {
    return new Observable<GeolocationCoordinates>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (pos) => {
          observer.next(pos.coords);
          observer.complete();
        },
        (err) => observer.error(err)
      );
    }).pipe(
      retry(2),
      tap((coords) => {
        this.currentLocation = coords;
        localStorage.setItem('allowLocation', JSON.stringify(true));
      })
    );
  }

  get allowLocation() {
    const value = localStorage.getItem('allowLocation');
    return value;
  }
}
