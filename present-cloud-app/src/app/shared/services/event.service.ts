import { Injectable } from '@angular/core';
import { EventEmitter } from 'eventemitter3';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  event: any;
  constructor() {
    this.event = new EventEmitter();
   }
}
